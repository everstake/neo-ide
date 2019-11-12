import React from 'react';

import ReactTerminal from 'react-terminal-component';

import * as actions from '../actions/index'
import { connect } from 'react-redux';

import AlertsBox from "../components/alertsBox";
import { SnackbarProvider } from 'notistack';

import {EmulatorState, OutputFactory, Outputs} from 'javascript-terminal';

const theme = {
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
};

function fetchLogs(logsArray, tab) {
    let newOutputs;
    const defaultState = EmulatorState.createEmpty();
    const defaultOutputs = defaultState.getOutputs();

    newOutputs = Outputs.addRecord(
        defaultOutputs, OutputFactory.makeTextOutput(
            ''
        )
    );

    logsArray.forEach(function (element) {
        if (element.group === tab.tab) {
            newOutputs = Outputs.addRecord(
                newOutputs, OutputFactory.makeTextOutput(
                    element.date + ' ' + element.text
                )
            )
        }
    });

    return defaultState.setOutputs(newOutputs);
}

class LogPanel extends React.Component {

    constructor(props) {
        super(props);

        // this.state = {
        //     classes: {}
        // };
    }

componentDidMount() {
    // this.props.addLog('logger compile', 'Compile')
    // this.props.addLog('logger deploy', 'Deploy')
    // this.props.addLog('logger debug', 'Debug')
    // const classes = useStyles();
    // this.setState({ classes: classes });

}

render (){
    let logs = fetchLogs(this.props.logs, this.props.tab);
    return (
        <div>
            <SnackbarProvider   
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}>
                <AlertsBox />
            </SnackbarProvider>
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
        </div>           
    );
    }

}

const mapStateToProps = state => ({
    logs: state.logs,
    tab: state.tab,
});

const mapDispatchToProps = dispatch => ({
    addLog: (a, b) => dispatch(actions.addLog(a, b))
});

export default connect(mapStateToProps, mapDispatchToProps)(LogPanel);