import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from './serviceWorker';
import MainPanel from './components/MainPanel'
import { Provider } from 'react-redux';

import store from './store'
import "./index.css";

// prevent reload page
window.onbeforeunload = () => "";

ReactDOM.render(
    <Provider store={store}>
        <MainPanel />
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
