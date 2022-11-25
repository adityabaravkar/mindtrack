from flask import Flask, request, jsonify, session
from flask_session import Session
from flask_pymongo import PyMongo
from flask_cors import CORS
import os
import csv

app = Flask(__name__)
app.config.from_pyfile('config.py')
pymongo = PyMongo(app)
CORS(app)
Session(app)


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
            #print('b: '+str(b))
            for j in range(J):
                #print('Value: '+str(b[j]))
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


@app.route('/assess', methods=['POST', 'GET'])
def assessment():
    if request.method == 'GET':
        item_db = read_item_db('questions.csv')
        r = []
        session['r'] = r
        bs = [item_db["b1"][0], item_db["b2"][0], item_db["b3"][0]]
        session['bs'] = bs

        c = item_db["code"][0]
        q = item_db["item"][0]

        item_db['code'].remove(item_db['code'][0])
        item_db['bmean'].remove(item_db['bmean'][0])
        item_db['b1'].remove(item_db['b1'][0])
        item_db['b2'].remove(item_db['b2'][0])
        item_db['b3'].remove(item_db['b3'][0])
        item_db['item'].remove(item_db['item'][0])
        session['item_db'] = item_db
        session['theta'] = [3]

        return jsonify({
            'status': 'started',
            'code': c,
            'question': q
        })

    if request.method == 'POST':
        sem_theta = .70
        max_items = 27
        item_db = session.get('item_db')
        r = session.get('r')
        bs = session.get('bs')
        theta = session.get('theta')

        body = request.json
        code = body['code']
        response = body['response']

        r = r + score(int(response))
        #print('Score: '+str(score(response)))
        theta = estimate_theta(r, bs, theta)
        #print('SE: '+str(theta[1]))
        #print('len(r): '+str(r))
        if theta[1] < sem_theta or len(r) == max_items:
            return jsonify({
                'status': 'complete',
                'score': str(round(((theta[0] - 1.40)/1.50)*15) + 100)
            })

        next_i = next_item(theta[0], item_db)
        bs = bs + [next_i["b1"], next_i["b2"], next_i["b3"]]
        session['item_db'] = item_db
        session['r'] = r
        session['bs'] = bs
        session['theta'] = theta

        return jsonify({
            'status': 'in progress',
            'code': next_i['code'],
            'question': next_i['item']
        })


if __name__ == '__main__':
    app.run(port=app.config.get("PORT"), debug=True)
