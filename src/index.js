import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from './serviceWorker';
import PanelsBlock from './components/PanelsBlock'

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';

import "./index.css";

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <PanelsBlock />
    </Provider>, 
    document.getElementById('root')
);

serviceWorker.unregister();
