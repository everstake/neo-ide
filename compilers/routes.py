import os
from flask import Flask, flash, request, redirect, url_for, send_file, jsonify, make_response
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
from flask import send_from_directory
import json
from func_for_python_file import create_base_file, create_avm_file
from func_for_cs_file import code64_generator


app = Flask(__name__)
cors = CORS(app)


@app.route('/', methods=['GET'])
def hello():
    return 'hello'


@app.route('/build_avm/py', methods=['POST'])
@cross_origin()
def build_avm_file_from_py():
    try:
        data = request.get_json(force=True)
        text = data['text']
        filename = data['filename']
        path_to_py_file, method = create_base_file(text, filename)
        try:
            path = create_avm_file(path_to_py_file)
        except Exception as e:
            return make_response(jsonify(str(e)), 400)
        method = json.dumps(method)
        os.remove(path_to_py_file)
        return jsonify({'avm':path, 'method':method}, 200)
    except Exception as e:
        return make_response(jsonify({'error': e}), 500)


@app.route('/build_avm/cs', methods=['POST'])
def build_avm_file_from_cs():
    try:
        data = request.get_json(force=True)
        text = data['text']
    except Exception as e:
        return make_response(jsonify({'error': e}), 500)
    abi, avm, output = code64_generator(text, False)

    return make_response(jsonify({'avm':avm, 'abi':abi, 'output': output}, 200))


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
