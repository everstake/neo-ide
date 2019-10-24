import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import React from "react";

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
  }));



function CustomButton() {
    const classes = useStyles();
    return (<Button 
      variant="contained"
      color="primary"
      size="small"
      className={classes.button}
      startIcon={<SaveIcon />}
    > Save </Button>);
  }