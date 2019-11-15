import React, { memo, useState, useEffects } from "react";
import { Paper, Grid, Button } from "@material-ui/core";
import { connect } from 'react-redux';
import * as actions from '../actions/index'

import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme
} from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import {
  List,
  ListItem,
  TextField,
  IconButton,
  ListItemSecondaryAction
} from "@material-ui/core";

const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(0)
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 14,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main
    }
  }
}))(InputBase);

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing(1)
  }
}));

const Layout = memo(props => (
  <Paper
    elevation={0}
    style={{ padding: 0, margin: 0, backgroundColor: "#fafafa" }}
  >
    {props.children}
  </Paper>
));

function TodoListItem(props) {
  const classes = useStyles();
 

  function OnC(e , type) {

    console.log(e.target.value)
    console.log(type)
    console.log(props.contract)
    console.log(props.deployfield)
  }


  return (
    <Paper>
    <ListItem >
      <InputLabel  shrink htmlFor="bootstrap-input">
      {props.name}
      </InputLabel>
      <BootstrapInput onChange={t => OnC(t, props.name)}  id="bootstrap-input"  />
    </ListItem>
    </Paper>
  );
}
 function DeployParameters(props) {

  
  function OnC(e , type) {

    console.log(e.target.value)
    console.log(type)
    console.log(props.contract)
    console.log(props.deployfield)
  }


  
  return (
    <Layout>
       <Paper>
    <ListItem >
      <InputLabel  shrink htmlFor="bootstrap-input">
      {"name"}
      </InputLabel>
      <BootstrapInput onChange={t => OnC(t, props.name)}  id="bootstrap-input"  />
    </ListItem>
    </Paper>
    <Paper>
    <ListItem >
      <InputLabel  shrink htmlFor="bootstrap-input">
      {"version"}
      </InputLabel>
      <BootstrapInput onChange={t => OnC(t, props.name)}  id="bootstrap-input"  />
    </ListItem>
    </Paper>
    <Paper>
    <ListItem >
      <InputLabel  shrink htmlFor="bootstrap-input">
      {"email"}
      </InputLabel>
      <BootstrapInput onChange={t => OnC(t, props.name)}  id="bootstrap-input"  />
    </ListItem>
    </Paper>
    <Paper>
    <ListItem >
      <InputLabel  shrink htmlFor="bootstrap-input">
      {"par"}
      </InputLabel>
      <BootstrapInput onChange={t => OnC(t, props.name)}  id="bootstrap-input"  />
    </ListItem>
    </Paper>
    <Paper>
    <ListItem >
      <InputLabel  shrink htmlFor="bootstrap-input">
      {"par"}
      </InputLabel>
      <BootstrapInput onChange={t => OnC(t, "par")}  id="bootstrap-input"  />
    </ListItem>
    </Paper>
    <Paper>
    <ListItem >
      <InputLabel  shrink htmlFor="bootstrap-input">
      {"par"}
      </InputLabel>
      <BootstrapInput onChange={t => OnC(t, props.name)}  id="bootstrap-input"  />
    </ListItem>
    </Paper>
    </Layout>
  );
}

const mapStateToProps = state => ({
  contract: state.contract,
  deployfield: state.deployfield,
});


const mapDispatchToProps = dispatch =>({
  
  addeployField: (contract, name, version, email) => dispatch(actions.addeployField(contract, name, version, email))

  // changeParameterType: (a,b) =>dispatch(actions.changeParameterType(a,b)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeployParameters)