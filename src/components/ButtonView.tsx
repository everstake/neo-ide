import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import { withTranslation } from "react-i18next";

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
}));

function CustomButtonView(props) {
    const classes = useStyles(props);
    return (<Button
        disabled={props.disabled}
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<props.icon />}
        onClick={props.onClick}
    > {props.t(props.content)} </Button>);
}

export default withTranslation()(CustomButtonView);
