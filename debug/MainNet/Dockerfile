FROM mongo:latest

RUN apt-get update
RUN apt-get install wget -y
RUN apt-get install -y gnupg2 gnupg gnupg1


RUN wget -q https://packages.microsoft.com/config/ubuntu/19.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
RUN dpkg -i packages-microsoft-prod.deb

RUN apt-get update
RUN apt-get install apt-transport-https
RUN apt-get update
RUN apt-get install dotnet-sdk-2.1 -y

RUN apt-get update
RUN apt-get install dotnet-runtime-2.1 -y


RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 3FA7E0328081BFF6A14DA29AA6A19B38D3D831EF
RUN echo "deb https://download.mono-project.com/repo/ubuntu stable-bionic main" | tee /etc/apt/sources.list.d/mono-official-stable.list
RUN wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.asc.gpg
RUN mv microsoft.asc.gpg /etc/apt/trusted.gpg.d/microsoft.gpg
RUN wget -q https://packages.microsoft.com/config/ubuntu/18.04/prod.list
RUN mv prod.list /etc/apt/sources.list.d/microsoft-prod.list


    
RUN apt-get update
RUN apt-get install git -y
RUN apt-get install libleveldb-dev sqlite3 libsqlite3-dev libunwind8-dev -y
RUN apt-get install tmux -y
RUN apt-get install python3.7 -y
RUN apt-get -y install python3-pip -y
RUN pip3 install --upgrade setuptools

RUN pip3 install flask
RUN pip3 install flask_cors
RUN pip3 install pymongo

COPY node/ .
EXPOSE 27017
EXPOSE 6000

CMD ["mongod"]


