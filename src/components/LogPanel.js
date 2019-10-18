 
import React, { Component } from 'react';

import ReactTerminal from 'react-terminal-component';
import {ReactTerminalStateless} from 'react-terminal-component';


import { createStore, combineReducers } from 'redux';
import { connect } from 'react-redux';

import {
    EmulatorState, OutputFactory, CommandMapping,
    EnvironmentVariables, FileSystem, History,
    Outputs, defaultCommandMapping
  } from 'javascript-terminal';

const theme={
  textAlign: 'left',
  background: '#272822',
  promptSymbolColor: '#6effe6',
  commandColor: '#fcfcfc',
  outputColor: '#fcfcfc',
  errorOutputColor: '#ff89bd',
  fontSize: '1.1rem',
  spacing: '1%',
  fontFamily: 'monospace',
  width: '100%',
  height: '100%',
//   height: '100%'
}

const defaultState = EmulatorState.createEmpty();
const defaultOutputs = defaultState.getOutputs();

function getTime() {
    const timestamp = Date.now();

    return new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit', dayPeriod: ''}).format(timestamp) + ' '
}

let newOutputs = Outputs.addRecord(
    defaultOutputs, OutputFactory.makeTextOutput(
        getTime() + `This is an example of using output to display a message to the user before any commands are run.`
    )
);

newOutputs = Outputs.addRecord(
    newOutputs, OutputFactory.makeTextOutput(
        getTime() + 'Ha, ha lo lo'
    )
);

const emulatorState = defaultState.setOutputs(newOutputs);


// The User Reducer
const userReducer = function(state = {}, action) {
  return state;
}

// The Widget Reducer
const widgetReducer = function(state = {}, action) {
  return state;
}

// Combine Reducers
const reducers = combineReducers({
  userState: userReducer,
  widgetState: widgetReducer
});

const store = createStore(reducers);

class LogPanel extends React.Component
{

constructor(props){

    super(props);

    // this.state = {
    //     emulatorState: EmulatorState.createEmpty(),
    //     inputStr: 'initial value'
    // };
}

componentDidMount() {
    store.dispatch({
      type: 'USER_LIST_SUCCESS',
      users: [{user: "1"}, {user: "2"}]
    });
}

render (){
    return (           
        <ReactTerminal theme={{
            background: '#272822',
            promptSymbolColor: '#6effe6',
            commandColor: '#fcfcfc',
            outputColor: '#fcfcfc',
            errorOutputColor: '#ff89bd',
            fontSize: '1.1rem',
            spacing: '1%',
            fontFamily: 'monospace',
            width: '100%',
            height: '50vh'
          }} inputStr={this.userState.users}
        emulatorState={emulatorState} style={{background: '#272822'}}/>
    );
    }

}

const mapStateToPtops = function(store) {
    return {
        users: store.userState.users
    }
}

export default connect(mapStateToPtops)(LogPanel);