import subprocess
import os
import re
import json
from boa.compiler import Compiler
#from .server import app

'''
def create_base_file(text, filename, file_format):
    filename = filename + file_format
    f = open(filename, "w+")
    for elem in text:
        f.write(elem)
    f.close()
    path = os.getcwd()
    full_path = str(path+'/'+f.name)
    print(full_path)
    return full_path
'''


def create_base_file(text, filename, file_format):
    filename = filename + file_format
    f = open(filename, "w+")
    operation = None
    method = []
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
    print(full_path)
    return full_path, method


def create_avm_file(path_to_py_file):
    comp = Compiler.load(path_to_py_file)
    data = comp.write()
    print('DATA', data)
    #path_to_avm_file = path_to_py_file.replace('.py', '.avm')
    return data.hex()


def delete_file(path):
    os.remove(path)


#create_avm_file('/home/oleg/workspace/and/neo-online-ide-react/compilers/sdasdvf1.py')
#create_test('/home/oleg/workspace/and/neo-online-ide-react/compilers/ex.py')
#create_py_file("def Main(): print('Hello World') return True", 'ssss')
#with open ("/home/oleg/workspace/and/neo-online-ide-react/compilers/ss.py", "r") as myfile:
#    data=myfile.readlines()
#print(data)

#create_base_file(data,  "sss", '.py')
