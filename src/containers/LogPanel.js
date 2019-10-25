 
import React, { Component } from 'react';

import ReactTerminal from 'react-terminal-component';
import {ReactTerminalStateless} from 'react-terminal-component';

import * as actions from '../actions/index'
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



function fetchLogs(logsArray) {
    let newOutputs;
    const defaultState = EmulatorState.createEmpty();
    const defaultOutputs = defaultState.getOutputs();

    newOutputs = Outputs.addRecord(
        defaultOutputs, OutputFactory.makeTextOutput(
            ''
        )
    )

    logsArray.forEach(function(element) {
        console.log(element)
        newOutputs = Outputs.addRecord(
            defaultOutputs, OutputFactory.makeTextOutput(
                element.date + ' ' + element.text
            )
        )
    });

    return defaultState.setOutputs(newOutputs);
}

class LogPanel extends React.Component
{

constructor(props){
    super(props);

    // this.state = {
    //     emulatorState: EmulatorState.createEmpty(),
    //     inputStr: 'initial value'
    // };
    this.state = {

    }
}

componentDidMount() {
    this.props.addLog('hallo', 'logger panel')
}

render (){
    console.log("Log panel sees the changes")
    let logs = fetchLogs(this.props.logs);

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
          }} inputStr={""}
        emulatorState={logs} style={{background: '#272822'}}/>
    );
    }

}

const mapStateToProps = state => ({
    logs: state.logs
});

const mapDispatchToProps = dispatch =>({
    addLog: (a, b)=>dispatch(actions.addLog(a, b))
});

export default connect(mapStateToProps, mapDispatchToProps)(LogPanel);