import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from './serviceWorker';
import MainPanel from './components/MainPanel'
import {Provider} from 'react-redux';

import store from './store'
import "./index.css";


ReactDOM.render(
    <Provider store={store}>
        <MainPanel/>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
