import subprocess
import os
import re
import json
from boa.compiler import Compiler


def create_base_file(text, filename):
    f = open(filename, "w+")
    operation = None
    method = []
    text = text.split('\n')
    for i in range(0, len(text)):
        text[i] = text[i] + '\n'
    for elem in text:
        f.write(elem)
        if elem.partition("def")[2][elem.partition("def")[2].find("Main"): elem.partition("def")[2].find("(")] == 'Main':
            print(elem.partition("def")[2])
            print(elem.partition("def")[2].find("("))
            operation = elem.partition("def")[2][elem.partition("def")[2].find("(")+1: elem.partition("def")[2].find(",")]

        if operation:
            print('here')
            print(elem.partition(str(operation))[2])
            if re.findall(r'\'(.+?)\'',elem.partition(str(operation))[2]) != []:
                method.append(re.findall(r'\'(.+?)\'',elem.partition(str(operation))[2])[0])

    f.close()
    path = os.getcwd()
    full_path = str(path+'/'+f.name)
    return full_path, method


def create_avm_file(path_to_py_file):
    comp = Compiler.load(path_to_py_file)
    data = comp.write()
    return data.hex()
