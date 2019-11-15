import Settings from '@material-ui/icons/Settings';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import React from "react";
import * as actions from '../actions/index'
import { connect } from 'react-redux';
import notify from '../utils/notificator.js';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
  }));



function CustomButtonView(props) {
    const classes = useStyles();
    return (<Button 
      disabled={ props.disabled }
      variant="contained"
      color="secondary"
      size="small"
      className={classes.button}
      startIcon={<Settings />}
      onClick={ props.compile }
      args={ props.args }
    > { props.content } </Button>);
}

function toHex(str) {
  var result = '';
  for (var i=0; i<str.length; i++) {
    result += str.charCodeAt(i).toString(16);
  }
  return result;
}

class CustomButton extends React.Component {
  constructor(props) {
    super(props);
    
    this.compile = this.compile.bind(this);
  }
  
  compile() {
    let filePath = this.props.file.key.split('/');
    this.props.addLog("Request to compiler...", "Compiler")
    axios.post('http://0.0.0.0:5000/build_avm/py', {
        text: this.props.file.savedContent,
        filename: filePath[filePath.length - 1]
    }, {timeout: 1000}).then(res => {
      console.log("Result: ", toHex(res.data))
      this.props.changeFileCompiled(this.props.file.key, toHex(res.data),{methods:["name", "surname"]})
      this.props.addLog("Compiled: " + toHex(res.data), "Compiler")
      this.props.enqueueSnackbar(notify('Compiled!', 'success', 'Compiler', this.props.closeSnackbar));
    }).catch(err => {
      let messageError = (err.response && err.response.data) || "Server is not responding, try again"
      console.log(messageError);
      this.props.addLog(messageError, "Compiler")
      this.props.enqueueSnackbar(notify(messageError, 'error', 'Compiler', this.props.closeSnackbar));
    })
  }

  render() {
    let content;
    if (this.props.saved) {
      content = "compiled"
    } else {
      content = "compile"
    }
   
    return (
      <CustomButtonView disabled={ !(this.props.file.saved && !this.props.file.compiled) } content={ content } compile= {this.compile} args={{lala: 15}}/>
    );
  }
}

const mapStateToProps =  (store) => {
  let file = {};
  store.files.forEach(elem => {
    if (elem.file === true && elem.key.slice(-store.currentFile.length) === store.currentFile) {
      file = elem;
    }  
  });
  return {file: file};
};

const mapDispatchToProps = dispatch =>({
  changeFileCompiled: (name, binary, methods)=>dispatch(actions.changeFileCompiled(name, binary, methods)),
  addLog: (a, b)=>dispatch(actions.addLog(a, b)),
  enqueueSnackbar: (message, options)=>dispatch(actions.enqueueSnackbar(message, options)),
  closeSnackbar: (key)=>dispatch(actions.closeSnackbar(key))
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomButton)