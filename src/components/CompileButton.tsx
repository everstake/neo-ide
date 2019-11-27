import Settings from "@material-ui/icons/Settings";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import * as actions from "../actions/index";
import { connect } from "react-redux";
import notify from "../utils/notificator";
import axios from "axios";
import * as Config from "Config";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const v = 0;

function CustomButtonView(props) {
    const classes = useStyles(props);
    return (<Button
        disabled={props.disabled}
        variant="contained"
        color="secondary"
        size="small"
        className={classes.button}
        startIcon={<Settings />}
        onClick={props.compile}
    > {props.content} </Button>);
}

function toHex(str) {
    let result = "";
    for (let i = 0; i < str.length; i++) {
        result += str.charCodeAt(i).toString(16);
    }
    return result;
}

class CustomButton extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.compile = this.compile.bind(this);
    }

    compile() {
        const filePath = this.props.file.key.split("/");
        const compilerEndpoint = (this.props.file.lang === "python" && Config.compiler.pyEndpoint) || Config.compiler.csEndpoint;
        this.props.addLog("Request to compiler...", "Compiler");
        axios.post(compilerEndpoint, {
            text: this.props.file.savedContent,
            filename: filePath[filePath.length - 1],
        }, { timeout: 10000 }).then(res => {
            console.log("====> ", res);
            this.props.changeFileDeployed(this.props.file.key, 1);
            this.props.changeFileCompiled(this.props.file.key, toHex(res.data[0].avm), res.data[0].method || res.data[0].abi); // todo: change data from array to object
            this.props.addLog("Compiled: " + toHex(res.data[0].avm), "Compiler");
            this.props.enqueueSnackbar(notify("Compiled!", "success", "Compiler", this.props.closeSnackbar));
        }).catch(err => {
            const messageError = (err.response && err.response.data) || "Server did not respond, please try again later";
            console.log(messageError);
            this.props.addLog(messageError, "Compiler");
            this.props.enqueueSnackbar(notify(messageError, "error", "Compiler", this.props.closeSnackbar));
        });
    }

    render() {
        let content;
        if (this.props.file.compiled) {
            content = "compiled";
        } else {
            content = "compile";
        }

        return (
            <CustomButtonView disabled={!(this.props.file.saved && !this.props.file.compiled)} content={content} compile={this.compile} args={{ lala: 15 }} />
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
    return { file: file };
};

const mapDispatchToProps = dispatch => ({
    changeFileDeployed: (name, txid) => dispatch(actions.changeFileDeployed(name, txid)),
    changeFileCompiled: (name, binary, abi) => dispatch(actions.changeFileCompiled(name, binary, abi)),
    addLog: (a, b) => dispatch(actions.addLog(a, b)),
    enqueueSnackbar: (message, options) => dispatch(actions.enqueueSnackbar(message /*options*/)),
    closeSnackbar: (key) => dispatch(actions.closeSnackbar(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomButton)
;
