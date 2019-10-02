import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from './serviceWorker';
import PanelsBlock from './components/PanelsBlock'

import "./index.css";


ReactDOM.render(<PanelsBlock />, document.getElementById('root'));
serviceWorker.unregister();
