import os
import binascii
import re
from boa.compiler import Compiler
from script_hash_func import ToScriptHash


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
            operation = elem.partition("def")[2][elem.partition("def")[2].find("(")+1: elem.partition("def")[2].find(",")]

        if operation:
            if re.findall(r'\'(.+?)\'',elem.partition(str(operation))[2]) != []:
                method.append(re.findall(r'\'(.+?)\'',elem.partition(str(operation))[2])[0])

    f.close()
    path = os.getcwd()
    full_path = str(path+'/'+f.name)
    return full_path, method


def compile(path_to_py_file):
    comp = Compiler.load(path_to_py_file)
    script = binascii.hexlify(comp.write())
    scriptHash = ToScriptHash(script, True).ToString()
    return {"avm": script.decode("utf-8"), "scriptHash": scriptHash} 
