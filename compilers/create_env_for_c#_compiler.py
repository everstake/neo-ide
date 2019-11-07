import os

os.system('git clone https://github.com/neo-project/neo-compiler.git')
os.system('cd./neo-compiler/neon')
os.system('dotnet')
os.system('publish-o../../testlib')
os.system('cd../..')
