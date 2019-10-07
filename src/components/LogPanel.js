 
import React from "react";
// import '../stylesheets/d.css';
import ReactTerminal from 'react-terminal-component';

const theme={
  textAlign: 'left',
  background: '#141313',
  promptSymbolColor: '#6effe6',
  commandColor: '#fcfcfc',
  outputColor: '#fcfcfc',
  errorOutputColor: '#ff89bd',
  fontSize: '1.1rem',
  spacing: '1%',
  fontFamily: 'monospace',
  width: '100%',
  height: '50vh',
  // height: '100%'
}
class LogPanel extends React.Component
{

constructor(props){

    super(props)
}

render (){
    return (           
        <ReactTerminal theme={theme}/>
    );
    }

}

export default LogPanel;