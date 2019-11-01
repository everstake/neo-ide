import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import React from "react";
import * as actions from '../actions/index'
import { connect } from 'react-redux';
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
      startIcon={<SaveIcon />}
      onClick={ props.compile }
      args={ props.args }
    > { props.content } </Button>);
}

class CustomButton extends React.Component {
  constructor(props) {
    super(props);
    
    this.compile = this.compile.bind(this);
  }

  compile() {
    axios.post('http://0.0.0.0:5000/build_avm/py', {
        text: ["def Main():\n", "  print(\"Hello World\")\n", "  return True"],
        filename:"sdasdvf"
    }).then(res => {
      console.log(res)
      this.props.changeFileCompiled(this.props.file.key, res)
      this.props.addLog("Compiled\n", "compiler")
    }).catch(err => {
      console.log(err)
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
  changeFileCompiled: (name)=>dispatch(actions.changeFileCompiled(name)),
  addLog: (a, b)=>dispatch(actions.addLog(a, b))
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomButton)