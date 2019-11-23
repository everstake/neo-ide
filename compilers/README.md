# Install
Go to compilers/docker-compiler-csharp
do command
```bash
./docker_build.sh
```
go to compilers
do command to build
```bash
docker build -t neo-online-ide .
```
and command to run in 5000 port
```bash
sudo docker run -it --rm -p 5000:5000 neo-online-ide
```

route `/build_avm/py` with parameters `text` (string or list of lines) and `filename` (string)

route `/build_avm/cs` with text `parameter` (string)

