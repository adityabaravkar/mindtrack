import csv
import os


def read_item_db(filepath):
    filename = open(os.getcwd()+filepath)
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


def remove_item_by_idx(item_db, idx):
    next_item_db = {
        'code': item_db['code'].pop(idx),
        'bmean': item_db['bmean'].pop(idx),
        'b1': item_db['b1'].pop(idx),
        'b2': item_db['b2'].pop(idx),
        'b3': item_db['b3'].pop(idx),
        'item': item_db['item'].pop(idx)
    }

    return next_item_db


def next_item(theta, item_db):
    idx = index_of_closest(item_db['bmean'], theta)
    return remove_item_by_idx(item_db, idx)


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

    # maximum likelihood functions undefined for perfect patterns; all 0s or all 1s
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
                # phat = ratio of the number of successes in a sample to the size of that sample
                # estimated probability of getting a correct response
                phat = 1 / (1.0 + math.exp(-1 * (th - b[j])))

                sumnum = sumnum + 1.0 * (r[j] - phat)
                # Summing all item information functions
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
