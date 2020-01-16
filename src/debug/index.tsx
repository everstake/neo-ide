// declare var module: any

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import './reset.less';
import { unregister } from './registerServiceWorker';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import en_US from 'antd/lib/locale-provider/en_US';
import { LocaleProvider } from 'antd';
import storeCommon from './store/common';
import Intl from 'intl';
import common from './store/common';
import { observer } from 'mobx-react';

// global.Intl = Intl;
// window[ 'Intl' ] = Intl;

common.isSetedAddress = true;
// Neo.Cryptography.RandomNumberGenerator.startCollectors();

const ObserverRender = observer(() => {
    
    return (
        <App />
       
    )
})


export default function deb()
{
    return ( <AppContainer>
        <>
        {/* <LocaleProvider locale={ storeCommon.language === 'en' ? en_US : en_US }> */}
            <ObserverRender />
        {/* </LocaleProvider> */}</>
    </AppContainer>) 
}
    // common.initLoginInfo(document.getElementById("test")as HTMLElement);
    // ReactDOM.render(
    //     deb(),
    //     document.getElementById('root') as HTMLElement
    // );
   


unregister();
