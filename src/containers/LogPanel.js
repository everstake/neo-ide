import React from 'react';

import ReactTerminal from 'react-terminal-component';

import * as actions from '../actions/index'
import { connect } from 'react-redux';

import AlertsBox from "../components/alertsBox";
import { SnackbarProvider } from 'notistack';

import {EmulatorState, OutputFactory, Outputs} from 'javascript-terminal';


import HeaderOutput from 'react-terminal-component';

import {
    CommandMapping,
    defaultCommandMapping
  } from 'javascript-terminal';
  
  const PAPER_TYPE = 'paper';
  const HEADER_TYPE = 'header'
  
  const paperStyles = {
    backgroundColor: 'white',
    color: 'black',
    fontFamily: 'sans-serif',
    padding: '1em',
    margin: '1em 0',
    borderRadius: '0.2em'
  };
  
  const PaperOutput = ({ content }) => (
    <div style={paperStyles}>
      <h1>{content.title}</h1>
  
      {content.body}
    </div>
  );
  
  const createPaperRecord = (title, body) => {
    return new OutputFactory.OutputRecord({
      type: PAPER_TYPE,
      content: {
        title,
        body
      }
    });
  };
  const customState = EmulatorState.create({
    'commandMapping': CommandMapping.create({
      ...defaultCommandMapping,
      'print': {
        'function': (state, opts) => {
          const userInput = opts.join(' ');

          return {
            output: createPaperRecord('A custom renderer', userInput)
          };
        },
        'optDef': {}
      }
    })
  });
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
    }

componentDidMount() {
}

render (){
    // let logs = fetchLogs(this.props.logs, this.props.tab);
    return (
        <div>
            <SnackbarProvider   
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}>
                <AlertsBox />
            </SnackbarProvider>
            <ReactTerminal 
                // theme={{
                //     background: '#272822',
                //     promptSymbolColor: '#6effe6',
                //     commandColor: '#fcfcfc',
                //     outputColor: '#fcfcfc',
                //     errorOutputColor: '#ff89bd',
                //     fontSize: '1.1rem',
                //     spacing: '1%',
                //     fontFamily: 'monospace',
                //     width: '100%',
                //     height: '50vh'
                // }} 
                // inputStr={""}
                outputRenderers={{
                    [HEADER_TYPE]: HeaderOutput,
                    [PAPER_TYPE]: PaperOutput
                }}
                emulatorState={customState}
                // style={{background: '#272822'}}
            />
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