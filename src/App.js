import React from 'react';
import AceEditor from 'react-ace';
import './test.css'
import 'brace/mode/python';
import 'brace/theme/monokai';
import { connect } from 'react-redux';
import * as actions from './actions/index'

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
    // console.log("Before onChange:", newValue, this.props.currentFile)
    this.props.changeFileSaved(this.props.currentFile, newValue);
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
    return (
      <AceEditor  value={this.props.value} 
                  fontSize={'15px'} 
                  mode={ this.props.fileLang } 
                  theme="monokai" 
                  height = '100%' 
                  width = {this.state.width+'px'} 
                  onChange={this.onChange} 
                  options={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: 2,
                  }}
      />
    );
  }
}

const mapStateToProps =  (store) => {
  let fileContent = "";
  let fileLang;
  store.files.forEach(elem => {
    if (elem.file === true && elem.key.slice(-store.currentFile.length) === store.currentFile) {
      fileContent = elem.currentContent;
      fileLang = elem.lang;
    }  
  });
  return {value: fileContent, currentFile: store.currentFile, fileLang: fileLang};
};

const mapDispatchToProps = dispatch =>({
  changeFileSaved: (fileName, newContent)=>dispatch(actions.changeFileSaved(fileName, newContent))
});

export default connect(mapStateToProps, mapDispatchToProps)(Afpp);
