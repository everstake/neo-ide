import React from 'react';
// import CodeMirror from 'react-codemirror';
// import './codemirror1.css';
import AceEditor from 'react-ace';
import brace from 'brace';
import './test.css'
import 'brace/mode/javascript';
import 'brace/theme/monokai';
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

   
   <AceEditor value={this.state.value} fontSize={'15px'} mode="javascript" theme="monokai" height = '100%' width = {this.state.width+'px'} onChange={this.onChange} />
  
    );
  }
}

export default Afpp;
