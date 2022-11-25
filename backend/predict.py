import requests
import io
from flask import Flask, request, redirect, url_for, flash, jsonify
import json
import os
import pandas as pd
import tensorflow as tf
import tensorflow_hub as hub
import numpy as np

def preprocess(file):
    path = os.getcwd()+'/'+file+'.txt'
    data = pd.read_csv(path, sep = ';')
    hos = []
    for i in range(len(data.emotion)):
        if data['emotion'][i] in ['joy', 'love', 'surprise']:
            hos.append(1) # happy is 1
        else:
            hos.append(0) # sad is 0
    data['hos'] = hos
    return data

train_data = preprocess('train')
train = train_data.copy()

model = "https://tfhub.dev/google/tf2-preview/gnews-swivel-20dim/1"
hub_layer = hub.KerasLayer(model, output_shape=[20], input_shape=[], dtype=tf.string, trainable=True)

model = tf.keras.Sequential()
model.add(hub_layer)
model.add(tf.keras.layers.Dense(16, activation='relu'))
model.add(tf.keras.layers.Dense(1))

model.compile(optimizer='adam',
              loss=tf.losses.BinaryCrossentropy(from_logits=True),
              metrics=[tf.metrics.BinaryAccuracy(threshold=0.0, name='accuracy')])

val = preprocess('val')

history = model.fit(train.text,
                    train.hos,
                    epochs=40,
                    batch_size=512,
                    validation_data=(val.text, val.hos),
                    verbose = 0)

predstr = model.predict(train.text)

def postprocessor(preds):
  range = predstr.max()-predstr.min()
  norm_preds = []
  probab = []
  for i in preds:
    norm_preds.append((i - predstr.min()) / range)
    probab.append((i - predstr.min()) * 100 / range)
  return np.mean(probab)


app = Flask(__name__)

@app.route('/ping', methods=['GET'])
def ping():
     return "pong"

@app.route('/predict', methods=['POST'])
def makecalc():
    req_data = request.get_json()
    answers = req_data["data"]
    print("********* Stating Predict for patient ************")
    print("********* " + answers[0] + " ************")
    print("********* " + answers[4] + " ************")
    results = model.predict(answers)
    score = postprocessor(results)
    print('Patients mental health score is:', score)
    response = "No data yet"
    if score < 25:
        sentiment = "You are going through a bad phase in life. But don't worry, bad times are not permanent. Try to seek help from a trained professional to improve your mental health."
        response = str(score) + sentiment
        print(sentiment)
    else:
        sentiment = "Your mental health looks great! Continue enjoying life and try to help others who are struggling with their mental health."
        response = str(score) + sentiment
        print(sentiment)
    print("********* Ending Predict ************")
    return response

if __name__ == '__main__':
    print("Starting flask application...")
    app.run(debug=True, host='0.0.0.0',port=8080)