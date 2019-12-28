import Settings from "@material-ui/icons/Settings";
import React from "react";
import * as actions from "../actions/index";
import { connect } from "react-redux";
import notify from "../utils/notificator";
import axios from "axios";
import * as Config from "Config";
import CustomButtonView from "../components/ButtonView";

import { withTranslation } from "react-i18next";

class CustomButton extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.compile = this.compile.bind(this);
    }

    compile() {
        this.props.changeFileProcessing(this.props.file, true);
        const filePath = this.props.file.key.split("/");
        const compilerEndpoint = (this.props.file.lang === "python" && Config.compiler.pyEndpoint) || Config.compiler.csEndpoint;
        this.props.addLog(this.props.t("Request to compiler..."), "Compiler");
        axios.post(compilerEndpoint, {
            text: this.props.file.savedContent,
            filename: filePath[filePath.length - 1],
        }, { timeout: 10000 }).then(res => {
            if(this.props.file.lang == "csharp") {
                console.log("lang is csharp");
                console.log("=======>", res.data.abi.split(",")[0].split(":")[1]);
                console.log("====> ", res.data.abi.split(",")[0].split(":")[1].split("0x")[1]);
                console.log("====> ", res.data.method);
                this.props.changeFileCompiled(this.props.file.key, res.data.avm, res.data.method, res.data.abi.split(",")[0].split(":")[1].split("0x")[1]);
            }
            else {
                this.props.changeFileCompiled(this.props.file.key, res.data.avm, (res.data.abi).match(/\b(\w|')+\b/gim), res.data.scriptHash);
            }
            this.props.addLog(this.props.t("Compiled") + ": " + res.data.avm, "Compiler");
            this.props.enqueueSnackbar(notify(this.props.t("Compiled") + "!", "success", "Compiler", this.props.closeSnackbar));
        }).catch(err => {
            const messageError = (err.response && err.response.data) || this.props.t("Server did not respond, please try again later");
            console.log(err);
            this.props.addLog(messageError, "Compiler");
            this.props.enqueueSnackbar(notify(messageError, "error", "Compiler", this.props.closeSnackbar));
            this.props.changeFileProcessing(this.props.file, false);
        });
    }

    render() {
        let content;
        if (this.props.file.processing) {
            content = "compiling";
        } else if (this.props.file.compiled) {
            content = "compiled";
        } else {
            content = "compile";
        }

        return (
            <CustomButtonView
                disabled={!(this.props.file.saved && !this.props.file.compiled && !this.props.file.processing)}
                content={content}
                compile={this.compile}
                icon={Settings}
                onClick={this.compile}
            />
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
    changeFileCompiled: (name, binary, abi, hash) => dispatch(actions.changeFileCompiled(name, binary, abi, hash)),
    addLog: (a, b) => dispatch(actions.addLog(a, b)),
    enqueueSnackbar: (message, options) => dispatch(actions.enqueueSnackbar(message /*options*/)),
    closeSnackbar: (key) => dispatch(actions.closeSnackbar(key)),
    changeFileProcessing: (key, processing) => dispatch(actions.changeFileProcessing(key, processing)),
});

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(CustomButton))
;
