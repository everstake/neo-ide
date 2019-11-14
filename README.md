<p align="right">
  <a href="https://neo.org/">
    <img alt="GitPoint" title="GitPoint" src="https://i.imgur.com/UYZ3MCh.png" width="200">
  </a>
</p>

<p align="center">
  The best online IDE for Neo.
</p>

## Table of Contents

- [Introduction](#introduction)
- [Requirements](#Requirements)
- [Usage](#usage)
- [Feedback](#feedback)
- [Build Process](#build-process)
- [Backers](#backers-)
- [Sponsors](#sponsors-)
- [How to Contribute](#how-to-contribute)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

![Downloads](https://img.shields.io/github/downloads/everstake/neo-ide/total)
[![GitHub Issues](https://img.shields.io/github/issues/everstake/neo-ide)](https://github.com/everstake/neo-ide/issues)
![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg)
<!-- [![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT) -->


Create contracts for the Neo platform without setting up the environment and downloading packages for developers, just open [Neo IDE](http://neo-ide.com/) in your browser and start creating the future.

**Available for Google chrome.**

## Requirements

First you need to install NEOLine wallet chrome extension, it provides dapis for developers who want to interact easily with NEO blockchain. You can install the wallet by downloading the [source code](https://github.com/NeoNextClub/neoline/blob/master/install/en_US.md). Or install it from the store as described in [this manual](https://medium.com/@NE0NEXT/neoline-the-first-neo-wallet-plugin-218fac8558b2)

## Usage

A few of the things you can do with Neo IDE:

* [`Create a project directly in the browser, develop smart contracts`](#create-a-project)
* [`Compile and deploy created contracts`](#compile-and-deploy)
* [`Interact with your contract using the invoke bar`](#invoke-your-contract)
* [`Open contracts from the hard drive of your device, save contracts to the hard drive. Move and delete contracts`](#upload-and-save-contracts)
* [`Configure the editor (autosave, autocompletion)`](#configure-the-editor)

#### Create a project
When you enter the IDE page, two default contracts will be created for you. One contract is written in python `examples_python/domain.py`, and the second in C# `examples_csharp/domain.cs`

+ You can modify current contracts, or create new ones

<p align="center">
    <img alt="GitPoint" title="GitPoint" src="https://i.imgur.com/xcBhpuJ.png">
</p>

+ Click the `Add Folder` button and enter a name to create a new folder

<p align="center">
    <img alt="GitPoint" title="GitPoint" src="https://i.imgur.com/tqBRNsT.png">
</p>

<p align="center">
    <img alt="GitPoint" title="GitPoint" src="https://i.imgur.com/KPuzWY9.png">
</p>

+ Click the `Add File` button to create a new contract

<p align="center">
    <img alt="GitPoint" title="GitPoint" src="https://i.imgur.com/eafdEFn.png">
</p>

+ Select created contract and click `Rename` to set contract name (change file extension for correct syntax highlighting)

<p align="center">
    <img alt="GitPoint" title="GitPoint" src="https://i.imgur.com/4ugaIwh.png">
</p>

+ Write some code in code editor field

<p align="center">
    <img alt="GitPoint" title="GitPoint" src="https://i.imgur.com/fyfiBG4.png">
</p>


#### Compile and deploy

+ Click the `SAVE` button to save the contract

<p align="center">
    <img alt="GitPoint" title="GitPoint" src="https://i.imgur.com/Fh6YQpr.png">
</p>

+ Click the `COMPILE` button to compile the contract

<p align="center">
    <img alt="GitPoint" title="GitPoint" src="https://i.imgur.com/LwA9cRf.png">
</p>

<p align="center">
    <img alt="GitPoint" title="GitPoint" src="https://i.imgur.com/kYHWs0D.png">
</p>

+ Select testnet in NEOLine wallet

<p align="center">
    <img alt="GitPoint" title="GitPoint" src="https://i.imgur.com/rOIZAJY.png">
</p>

+ Click the `DEPLOY` button to deploy the contract

<p align="center">
    <img alt="GitPoint" title="GitPoint" src="https://i.imgur.com/ofU85CM.png">
</p>

+ Enter your password to unlock your wallet

<p align="center">
    <img alt="GitPoint" title="GitPoint" src="https://i.imgur.com/73PlFho.png">
</p>

+ Enter your password to confirm transaction

<p align="center">
    <img alt="GitPoint" title="GitPoint" src="https://i.imgur.com/PigkSkq.png">
</p>

+ Click on link in logger panel to explore deployment transaction

<p align="center">
    <img alt="GitPoint" title="GitPoint" src="https://i.imgur.com/JMXpckf.png">
</p>

#### Invoke your contract

+ Compile and deploy domain example

<p align="center">
    <img alt="GitPoint" title="GitPoint" src="https://i.imgur.com/JMXpckf.png" width="50px">
</p>

+ Invoke contract

<p align="center">
    <img alt="GitPoint" title="GitPoint" src="https://i.imgur.com/JMXpckf.png" width="50px">
</p>

+ Explore transaction

<p align="center">
    <img alt="GitPoint" title="GitPoint" src="https://i.imgur.com/JMXpckf.png" width="50px">
</p>

#### Upload and save contracts

> Upload contract from hard drive

+ Click the `Upload File` button to upload contract from hard drive

<p align="center">
    <img alt="GitPoint" title="GitPoint" src="https://i.imgur.com/at4ecCU.png">
</p>

+ Choose your contract and confirm operation

<p align="center">
    <img alt="GitPoint" title="GitPoint" src="https://i.imgur.com/1i5gXvf.png">
</p>

+ Click on uploaded contract to open it

<p align="center">
    <img alt="GitPoint" title="GitPoint" src="https://i.imgur.com/iSAkGGe.png">
</p>

> Save contract to hard drive

+ Choose your contract

+ Click the `Download` button to save selected contract on your hard drive

<p align="center">
    <img alt="GitPoint" title="GitPoint" src="https://i.imgur.com/JMXpckf.png" width="300px">
</p>

> Drag and drop files and folders to move them.

> Select a file / folder and click the `Delete` button to delete.

#### Configure the editor

+ Use setting to configure the editor

<p align="center">
    <img alt="GitPoint" title="GitPoint" src="https://i.imgur.com/RzSod2V.png">
</p>

# Local Installation

1. Download [Neo IDE](https://github.com/everstake/neo-ide/releases) from Releases tab
2. Install dependencies with `npm`:
    + `$ cd neo-ide`
    + `$ npm install`
3. Run React application with compiler server:
   + `$ npm run start`

**How to Contribute**
---

1. Clone repo and create a new branch: `$ git checkout https://https://github.com/everstake/neo-ide -b name_for_new_branch`.
2. Make changes and test
3. Submit Pull Request with comprehensive description of changes

# License
