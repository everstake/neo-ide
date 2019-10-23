import React from 'react';
import AceEditor from 'react-ace';
import './test.css'
import 'brace/mode/python';
import 'brace/theme/monokai';
import { connect } from 'react-redux';

const mapStateToProps =  (store) => {
  let fileContent = "";
  store.files.forEach(elem => {
    if (elem.file === true && elem.key.slice(-store.currentFile.length) === store.currentFile) {
      fileContent = elem.content;
    }  
  });
  console.log(typeof fileContent);
  return {value: fileContent};
};

class Afpp extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      width:window.innerWidth, height: window.innerHeight, 
    //  value: localStorage.getItem('code'),
    };

    this.onChange = this.onChange.bind(this);
  }

   onChange(newValue) {
   // console.log('change',newValue);
  //  localStorage.setItem ('code', newValue);
  //  this.setState({
  //    value: localStorage.getItem('code'),
  //  })
  
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
      <AceEditor value={this.props.value} fontSize={'15px'} mode="python" theme="monokai" height = '100%' width = {this.state.width+'px'} onChange={this.onChange} />
    );
  }
}

export default connect(mapStateToProps)(Afpp);
