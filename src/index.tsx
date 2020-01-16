import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import MainPanel from "./components/MainPanel";
import { Provider } from "react-redux";
import * as Sentry from '@sentry/browser';
import store from "./store";
import "./index.css";

import "./i18n";
Sentry.init({dsn: "https://1148b4958e904c7d8dffab29adac0067@sentry.blaize.tech/8"});
ReactDOM.render(
  
    <Provider store={store}>
    
   
    
     
      <MainPanel></MainPanel>
  
   </Provider>
    ,
    document.getElementById("root"),
);

serviceWorker.unregister();
