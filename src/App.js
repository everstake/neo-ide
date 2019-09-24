import React from 'react';
import './App.css';
var CodeMirror = require('react-codemirror');


var App = React.createClass({
  getInitialState: function() {
    return {
      code: "// Code",
    };
  },
  updateCode: function(newCode) {
    this.setState({
      code: newCode,
    });
  },
  render: function() {
    var options = {
      lineNumbers: true,
    };
    return <CodeMirror value={this.state.code} onChange={this.updateCode} options={options} />
  }
});
export default App;
