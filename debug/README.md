
# How to configure debug api


**Prerequisite**

- [Docker](https://www.docker.com/get-started)



***Building docker containers***



- Go to dir with config of Main or Test net respectivly (next step should be applyed in both dirictories)
```bash

cd TestNet/ or cd MainNet/
```
- Build docker container with choosen name (test_net_neo for example)

```bash
sudo docker build -t test_net_neo .
```
- Next start container, port 600*:600* should be different for different container ( it need for differentiating endpoint in frontend )
TestNet: 
```bash
 sudo docker run -d -p 27017:27017 -p 6001:6001 --name test_net_neo test_net_neo:latest
```

MainNet: 
```bash
 sudo docker run -d -p 27018:27017 -p 6002:6002 --name test_net_neo test_net_neo:latest
```
PrivateNet: 
```bash
 sudo docker run -d -p 27019:27017 -p 6003:6003 --name test_net_neo test_net_neo:latest
```
And then change last command is needed to start api and cli inside container

```bash
sudo docker exec -it test_net_neo /bin/sh -c "dotnet build && cp protocol.json neo-cli-nel/bin/Debug/netcoreapp2.1 && cp config.json neo-cli-nel/bin/Debug/netcoreapp2.1 && cp -r NEL_Plugins neo-cli-nel/bin/Debug/netcoreapp2.1 && cd neo-cli-nel/bin/Debug/netcoreapp2.1 && tmux new-session -d bash -c 'dotnet neo-cli.dll' "
```

```bash
sudo docker exec -it test_net_neo /bin/sh -c "tmux new-session -d bash -c 'python3 rot.py'"
```
Do the same to folder that remains.

**Notice**
- You can use MongoCompass to verify that cli is writing debug data.
- If debug cannot find contract pay attention that **sync is long proccess that can continues to several days**


**PrivateNet**

**Prerequisite**

- [O3 private network](https://neodapidocs.o3.network/#setting-up-a-private-net)

After setting up private network, reproduce following steps:
- Copy one of the folders ( it doesn't matter which)
```bash
cp -R TestNet PrivateNet
```
- Next will be chanching config, you can use any text editor (in example nano)

```bash
cd PrivateNet/neo-cli-nel/neo-cli-nel/bin/Debug/netcoreapp2.1
nano config.json
```

- **Pay attention** to ports on which you published o3 private net, for me it is 30333:30333, so will be changing following field to 30333, 30334, 30331 respectivly

<img alt="NeoIDE" title="NeoIDE" src="https://i.imgur.com/c9ltPAx.png">


And protocol config 

```bash
nano protocol.json 
```


- Field of seeds where seed10.ngd.network is IP where container is published. For me it is localhost, so my seed is 127.0.0.1:30333


<img alt="NeoIDE" title="NeoIDE" src="https://i.imgur.com/9Dea7mQ.png">


- And after changin config, reproduce first steps to publish container.
