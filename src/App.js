import React from 'react';
import CodeMirror from 'react-codemirror';
// import './codemirror1.css';
import AceEditor from 'react-ace';
import brace from 'brace';
import './test.css'
import 'brace/mode/java';
import 'brace/theme/github';
import { throwStatement } from '@babel/types';

class Afpp extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      width:window.innerWidth, height: window.innerHeight, 
     value: localStorage.getItem('code'),
    };

    this.onChange = this.onChange.bind(this);
  }


   onChange(newValue) {
   // console.log('change',newValue);
   localStorage.setItem ('code', newValue);
   this.setState({
     value: localStorage.getItem('code'),
   })
  
  }
updateDimensions  = () => {
  this.setState({ width: window.innerWidth,  });
}
componentDidMount() {
  window.addEventListener('resize', this.updateDimensions.bind(this));
}
// componentWillUnmount() {
//   window.removeEventListener('resize', this.updateDimensions.bind(this));
// }

  render() {
    var options = {
      lineNumbers: true,
      foldGutter: false,
      viewportMargin:200,
        flattenSpans:true,
        
  
    };
    return (

   <div className="dddd">
   <AceEditor value={this.state.value} mode="java" theme="github" height = '100%' width = {this.state.width+'px'} onChange={this.onChange} editorProps={{$blockScrolling: true}}/>
   </div>
    );
  }
}

export default Afpp;
