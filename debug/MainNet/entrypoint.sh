#!/bin/bash
cd neo-cli-nel/bin/Debug/netcoreapp2.1 && screen -d -m -S bb bash -c 'dotnet neo-cli.dll'
screen -d -m -S bq bash -c 'mongod'

