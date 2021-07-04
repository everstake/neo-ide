<p align="center">
  <a href="https://neo.org/">
    <img alt="NeoIDE" title="NeoIDE" src="https://i.imgur.com/UYZ3MCh.png" width="200">
  </a>
</p>

<p align="center">
  The best online IDE for Neo.
</p>

## Table of Contents

- [Introduction](#Introduction)
- [Requirements](#Requirements)
- [Usage of IDE](#Usage-of-ide)
- [Usage of debugger](#Usage-of-debugger)
- [Local Installation](#local-installation)
- [How to Contribute](#how-to-contribute)
- [License](#license)

## Introduction

![Downloads](https://img.shields.io/github/downloads/everstake/neo-ide/total)
[![GitHub Issues](https://img.shields.io/github/issues/everstake/neo-ide)](https://github.com/everstake/neo-ide/issues)
![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg)
<!-- [![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT) -->


Create contracts for the Neo platform without setting up the environment and downloading packages for developers, just open [Neo IDE](http://neo-ide.com/) in your browser and start creating the future.

**Available for:**
- **Mac OSX**
- **Windows**
- **Linux**
- **Android (.APK)**
## Requirements

First you need to install O3 wallet, it provides dAPI for developers who want to interact easily with NEO blockchain. You can download O3 wallet from [this page](https://o3.network/).

# Usage-of-ide
### [Usage of NEO IDE](USAGE.md)

# Usage-of-debugger
### [Usage of debugger](debug/USAGE.md)

# Local Installation
- For different OS steps for building compiler and debugger are same.
#[MacOS]
**Prerequisite**
(All comands can be run with terminal)
- [Docker](https://docs.docker.com/docker-for-mac/)
- Choose macOS installer [Node.js](https://nodejs.org/en/download/)

1. Download [Neo IDE](https://github.com/everstake/neo-ide/releases) from Releases tab
2. Install dependencies with `npm`:
    + `$ cd neo-ide`
    + `$ npm install`
3. Run React application:
   + `$ npm run start`
   
#[Windows]
**Prerequisite**
(All comands can be run with cmd or powershell)
- [Docker](https://docs.docker.com/docker-for-windows/)
- Choose windows installer [Node.js](https://nodejs.org/en/download/)

1. Download [Neo IDE](https://github.com/everstake/neo-ide/releases) from Releases tab
2. Install dependencies with `npm`:
    + `$ cd neo-ide`
    + `$ npm install`
3. Run React application:
   + `$ npm run start`
#[Linux]
**Prerequisite**

- [Docker](https://www.docker.com/get-started)

1. Download [Neo IDE](https://github.com/everstake/neo-ide/releases) from Releases tab
2. Install dependencies with `npm`:
    + `$ cd neo-ide`
    + `$ npm install`
3. Run React application:
   + `$ npm run start`

# Install compilers 
Go to compilers folder 
```bash
cd compilers/docker-compiler-csharp
```
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
docker run -it --rm -p 5000:5000 neo-online-ide
```

route `/build_avm/py` with parameters `text` (string or list of lines) and `filename` (string)

route `/build_avm/cs` with text `parameter` (string)

# Install debugger

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

**How to Contribute**
---

1. Clone repo and create a new branch: `$ git checkout https://https://github.com/everstake/neo-ide -b name_for_new_branch`.
2. Make changes and test
3. Submit Pull Request with comprehensive description of changes

# License

The Neo IDE project is licensed under the [Apache License Version 2.0](LICENSE)
