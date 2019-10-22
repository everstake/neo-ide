import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from './serviceWorker';
import PanelsBlock from './components/PanelsBlock'

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

import "./index.css";

const store = createStore(rootReducer,
    {},
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

ReactDOM.render(
    <Provider store={store}>
        <PanelsBlock />
    </Provider>, 
    document.getElementById('root')
);

serviceWorker.unregister();
