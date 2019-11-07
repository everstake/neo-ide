import subprocess
import os
import config
from boa.compiler import Compiler
#from .server import app


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


def create_avm_file(path_to_py_file):
    Compiler.load_and_save(path_to_py_file)
    path_to_avm_file = path_to_py_file.replace('.py', '.avm')
    return path_to_avm_file


def delete_file(path):
    os.remove(path)


def get_file_c(path_to_py_file):
    os.system('cd {}'.format(config.UPLOAD_FOLDER_C))
    compile = subprocess.Popen('dotnet ./neon.dll ./{}'.format(path_to_py_file), shell=True, stdout=subprocess.PIPE)
    path_to_avm_file = compile.find('Saved', '.avm')

    return path_to_avm_file


create_avm_file('/home/unit-2/neo-online-ide-theia/compilers/ex.py')
#create_test('/home/oleg/workspace/and/neo-online-ide-react/compilers/ex.py')
#create_py_file("def Main(): print('Hello World') return True", 'ssss')
#with open ("/home/oleg/workspace/and/neo-online-ide-react/compilers/smart.py", "r") as myfile:
#    data=myfile.readlines()
#print(data)