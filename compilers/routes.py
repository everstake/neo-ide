import os
from flask import Flask, flash, request, redirect, url_for, send_file, jsonify, make_response
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
from flask import send_from_directory
#from server import app
from func_for_python_file import create_base_file, create_avm_file, delete_file


app = Flask(__name__)
cors = CORS(app)


@app.route('/', methods=['GET'])
def hello():
    return 'hello'


@app.route('/build_avm/py', methods=['POST'])
@cross_origin()
def build_avm_file():
    try:
        data = request.get_json(force=True)
        text = data['text']
        print(text)
        filename = data['filename']
        print(text, filename)
        path_to_py_file = create_base_file(text, filename, '.py')
        path = create_avm_file(path_to_py_file)
        print(path)

        return send_file(path)
    except:
        return make_response(jsonify({'error': 'Server error'}), 500)


@app.route('/build_avm/c', methods=['POST'])
def upload_file():
    data = request.get_json(force=True)
    text = data['text']
    print(text)
    filename = data['filename']
    print(text, filename)
    path_to_c_sharp_file = create_base_file(text, filename, '.cs')
    return send_file(path)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
