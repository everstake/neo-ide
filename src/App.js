import React from 'react';
import './App.css';
import './codemirror.css'
import CodeMirror from 'react-codemirror';
import PanelsBlock from "./components/PanelsBlock";

class App extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      code: "// Code",
    };
  }

  updateCode(newCode) {
    this.setState({
      code: newCode,
    });
  }

  render() {

    var options = {
      lineNumbers: true,
    };
    return (

        <PanelsBlock/>
        // <CodeMirror value={this.state.code} onChange={this.updateCode.bind(this)} options={options}/>

    );
  }
}

export default App;
