import os
from flask import Flask, flash, request, redirect, url_for, send_file, jsonify, make_response
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
from flask import send_from_directory
import json
from func_for_python_file import create_base_file, create_avm_file, delete_file
from func_for_cs_file import code64_generator


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
        filename = data['filename']
        path_to_py_file, method = create_base_file(text, filename)
        # print(path_to_py_file)
        # path_to_py_file = '/'
        try:
            path = create_avm_file(path_to_py_file)
        except Exception as e:
            return make_response(jsonify(str(e)), 400)
        method = json.dumps(method)
        return jsonify({'avm':path, 'method':method})
    except Exception as e:
        return make_response(jsonify({'error': e}), 500)


@app.route('/build_avm/cs', methods=['POST'])
def upload_file():
    try:
        data = request.get_json(force=True)
        text = data['text']
    except Exception as e:
        return make_response(jsonify({'error': e}), 500)
    answer = code64_generator(text, False)

    return make_response(jsonify(answer))


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
