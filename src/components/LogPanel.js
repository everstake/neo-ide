 
import React, { Component } from 'react';

import ReactTerminal from 'react-terminal-component';
import {ReactTerminalStateless} from 'react-terminal-component';

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
        getTime() + 'Available commands: ls, cd, head, cat, echo, rm'
    )
);

const emulatorState = defaultState.setOutputs(newOutputs);

class LogPanel extends React.Component
{

constructor(props){

    super(props);

    // this.state = {
    //     emulatorState: EmulatorState.createEmpty(),
    //     inputStr: 'initial value'
    // };
}

render (){
    return (           
        <ReactTerminal theme={{
            background: '#323232',
            promptSymbolColor: '#6effe6',
            commandColor: '#fcfcfc',
            outputColor: '#fcfcfc',
            errorOutputColor: '#ff89bd',
            fontSize: '1.1rem',
            spacing: '1%',
            fontFamily: 'monospace',
            width: '100%',
            height: '50vh'
          }} inputStr=''
        emulatorState={emulatorState} style={{background: '#272822'}}/>
    );
    }

}

export default LogPanel;