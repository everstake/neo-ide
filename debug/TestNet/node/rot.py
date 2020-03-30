from flask import Flask, flash, request, redirect, url_for, send_file, jsonify, make_response, Response
from flask_cors import CORS, cross_origin
import json
from pymongo import MongoClient

app = Flask(__name__)
cors = CORS(app)

client = MongoClient('mongodb://localhost:27017/')

db = client['DataBase']
collection = db['dimpInfo']


@app.route('/', methods=['POST'])
def hello():
    id = json.loads(request.data.decode('utf-8'))["params"][0]
    idox = "0x"+id
    find_dimpinfo = collection.find_one({"txid": idox})
    if find_dimpinfo == None:
        return Response(str(None))
    dimp  = find_dimpinfo['dimpInfo']
    data = {"txid": idox, "dimpInfo" :  dimp}
    return Response(str(json.dumps({"result" : [data]})), mimetype = 'application/json')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6001)

