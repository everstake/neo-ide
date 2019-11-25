FROM docker-mono-neo-compiler:latest

RUN apt-get update && apt-get -y install xxd python3-dev python3-pip

RUN pip3 install neo-boa # 0.5.6 <- just change number and docker image will be rebuilt

RUN pip3 install logzero

WORKDIR /opt/app
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY . .

CMD [ "python3", "./routes.py" ]
ENTRYPOINT []
