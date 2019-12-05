import Telegram from "@material-ui/icons/Telegram";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const mouseClickEvents = ["mousedown", "click", "mouseup"];
function simulateMouseClick(element) {
    mouseClickEvents.forEach(mouseEventType =>
        element.dispatchEvent(
            new MouseEvent(mouseEventType, {
                view: window,
                bubbles: true,
                cancelable: true,
                buttons: 1,
            }),
        ),
    );
}

function CustomButtonView(props) {
    const classes = useStyles(props);
    return (<Button
        disabled={props.disabled}
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<Telegram />}
        onClick={props.deploy}
    > {props.content} </Button>);
}

class CustomButton extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.deploy = this.deploy.bind(this);
    }

    deploy() {
        const element = document.querySelector("i[class=\"fa fa-fw fa-play-circle\"]");
        simulateMouseClick(element);
    }

    render() {
        let content;
        if (this.props.file.deployed) {
            content = "deployed";
        } else {
            content = "deploy";
        }
        return (
            <CustomButtonView
                disabled={(!this.props.file.compiled && !this.props.file.deployed) || (this.props.file.deployed)}
                content={content} deploy={this.deploy} args={{ lala: 15 }} />
        );
    }
}

const mapStateToProps = (store) => {
    let file = {};
    store.files.forEach(elem => {
        if (elem.file === true && elem.key.slice(-store.currentFile.length) === store.currentFile) {
            file = elem;
        }
    });
    return {
        file: file,
    };
};

export default connect(mapStateToProps)(CustomButton);
