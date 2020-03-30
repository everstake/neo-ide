import Axios from 'axios';
import { connect } from 'react-redux';
import store from "../../store"
import { ComponentType } from 'react';
import React from "react";
import * as Config from "Config";
interface IOpts {
  method: string, // 接口名
  params: any[], // 参数
  isGET?: boolean, // 是否是get 请求（默认请求是post）
  baseUrl?: string, // 如果是common 则 取 baseCommonUrl（默认 baseUrl）
  getAll?: boolean, // 是否获取所有返回结果
}

// const network: string = process.env.REACT_APP_SERVER_ENV === 'DEV' ? 'testnet' : 'mainnet';
const network = 'testnet'
// const baseUrl: string =  "https://apidebug.nel.group/api/" + network;
const baseUrl: string =  "http://127.0.0.1:6002/";


const makeRpcPostBody = (method: string, params: any): {} => {


  const body = {};
  body["jsonrpc"] = "2.0";
  body["id"] = 1;
  body["method"] = method;
  body["params"] = params;
  console.log(body)
  return body;
}
const defaultConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
}
export default function request(opts: IOpts): Promise<any> {
  let url = baseUrl;

  // if(store.getState().neo.network === "MainNet"){
  //   url = Config.debug.MainNet
  // }
  // if(store.getState().neo.network === "TestNet"){
  //   url = Config.debug.TestNet
  // }
  // if(store.getState().neo.network === "PrivateNet"){
  //   url = Config.debug.PrivateNet
  // }


  const params = makeRpcPostBody(opts.method, opts.params);
  const args = {
    url,
    method: opts.isGET ? 'GET' : 'POST',
    [opts.isGET ? 'params' : 'data']: opts.method ? params : JSON.stringify(params),
    ...defaultConfig,
  }
  return new Promise((resolve, reject) => {
    Axios(args)
      .then((data: any) => {
        if(Array.isArray(data.data))
        {
          console.log(data)
          resolve(data.data)
        }
        else if (data.data.result) {
          if (opts.getAll) {
            console.log(data)
            resolve(data.data);
            return;
          }
          console.log(data)
          resolve(data.data.result);
          return;
        }
        console.log(data)
        else if (data.data.error["code"] === -1) {
          console.log(data)
          reject(data.data.error);
        }
        reject(data.data.error);
      })
      .catch((err: any) => { reject(err) });
  });
}
const mapStateToProps = state => ({
  neo: state.neo,
  contract: state.contract,
  deployfield: state.deployfield.filter(f => f.contract === state.contract.map(f => f.contract)[0]),
  files: state.files,

});

connect<IOpts>(mapStateToProps)(request);
