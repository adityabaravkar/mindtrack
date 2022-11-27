from flask import Flask, request, jsonify
from flask_pymongo import pymongo
from bson.objectid import ObjectId
from flask_cors import CORS
import os
import csv
import datetime

app = Flask(__name__)
app.config.from_pyfile('config.py')
client = pymongo.MongoClient(app.config.get("MONGO_URI"))
db = client.get_database('test')
sessions = pymongo.collection.Collection(db, 'sessions')
results = pymongo.collection.Collection(db, 'results')
CORS(app)


def read_item_db(file):
    filename = open(file)
    file = csv.DictReader(filename)
    code = []
    b1 = []
    b2 = []
    b3 = []
    bmean = []
    item = []
    for col in file:
        code.append(col['code'])
        b1.append(float(col['b1']))
        b2.append(float(col['b2']))
        b3.append(float(col['b3']))
        bmean.append(float(col['bmean']))
        item.append(col['item'])
    item_db = {
        'code': code,
        'b1': b1,
        'b2': b2,
        'b3': b3,
        'bmean': bmean,
        'item': item
    }
    return (item_db)


def next_item(theta, item_db):

    i_nxt_itm = index_of_closest(item_db['bmean'], theta)

    next_item_db = {
        'code': item_db['code'].pop(i_nxt_itm),
        'bmean': item_db['bmean'].pop(i_nxt_itm),
        'b1': item_db['b1'].pop(i_nxt_itm),
        'b2': item_db['b2'].pop(i_nxt_itm),
        'b3': item_db['b3'].pop(i_nxt_itm),
        'item': item_db['item'].pop(i_nxt_itm)
    }

    return next_item_db


def index_of_closest(list, number):
    aux = []
    for value in list:
        aux.append(abs(number-value))
    return aux.index(min(aux))


def estimate_theta(r, b, th):

    import math
    conv = 0.001
    J = len(r)
    se = 10.0
    delta = conv + 1
    th = float(th[0])

    th_max = max(b) + .5
    th_min = min(b) - .5

    if sum(r) == J:
        th = th_max
    elif sum(r) == 0:
        th = th_min
    else:
        while abs(delta) > conv:
            sumnum = 0.0
            sumdem = 0.0
            for j in range(J):
                phat = 1 / (1.0 + math.exp(-1 * (th - b[j])))
                sumnum = sumnum + 1.0 * (r[j] - phat)
                sumdem = sumdem - 1.0 * phat * (1.0 - phat)
            delta = sumnum / sumdem
            th = th - delta
            se = 1 / math.sqrt(-sumdem)

    return [th, se]


def score(response):
    s = []
    if response == 3:
        s = [1, 1, 1]
    if response == 2:
        s = [1, 1, 0]
    if response == 1:
        s = [1, 0, 0]
    if response == 0:
        s = [0, 0, 0]
    return s


@app.errorhandler(404)
def resource_not_found(e):
    return jsonify(error=str(e)), 404


@app.route('/start/<string:user_id>', methods=['GET'])
def start(user_id):
    item_db = read_item_db('questions.csv')
    r = []
    bs = [item_db["b1"][0], item_db["b2"][0], item_db["b3"][0]]

    c = item_db["code"][0]
    q = item_db["item"][0]

    item_db['code'].remove(item_db['code'][0])
    item_db['bmean'].remove(item_db['bmean'][0])
    item_db['b1'].remove(item_db['b1'][0])
    item_db['b2'].remove(item_db['b2'][0])
    item_db['b3'].remove(item_db['b3'][0])
    item_db['item'].remove(item_db['item'][0])

    _id = sessions.insert_one({
        "r": r,
        "bs": bs,
        "theta": [3],
        "item_db": item_db,
        "user_id": user_id
    })

    return jsonify({
        'status': 'started',
        'code': c,
        'question': q,
        'session': str(_id.inserted_id)
    })


@app.route('/assess', methods=['POST'])
def assessment():
    sem_theta = .50
    max_items = 27
    body = request.json

    session_id = body['session']
    session_data = sessions.find_one({'_id': ObjectId(session_id)})
    r = session_data['r']
    bs = session_data['bs']
    theta = session_data['theta']
    item_db = session_data['item_db']
    user_id = session_data['user_id']

    code = body['code']
    response = body['response']

    r = r + score(int(response))
    theta = estimate_theta(r, bs, theta)
    if theta[1] < sem_theta or len(r) == max_items:

        std_score = str(round(((theta[0] - 1.40)/1.50)*15) + 100)

        results.insert_one({
            "userId": user_id,
            "score": std_score,
            "session": session_id,
            "dt": datetime.datetime.utcnow()
        })

        sessions.delete_one({'_id': ObjectId(session_id)})

        return jsonify({
            'status': 'complete',
            'score': std_score
        })

    next_i = next_item(theta[0], item_db)
    bs = bs + [next_i["b1"], next_i["b2"], next_i["b3"]]

    sessions.update_one(
        {'_id': ObjectId(session_id)},
        {
            "$set": {
                "r": r,
                "bs": bs,
                "theta": theta,
                "item_db": item_db
            }
        }
    )

    return jsonify({
        'status': 'in progress',
        'code': next_i['code'],
        'question': next_i['item'],
        'session': session_id
    })


if __name__ == '__main__':
    app.run(port=app.config.get("PORT"), debug=True)
