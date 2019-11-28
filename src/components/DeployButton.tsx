import Telegram from "@material-ui/icons/Telegram";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import * as actions from "../actions/index";
import { connect } from "react-redux";
import notify from "../utils/notificator";
import neoDapi from "neo-dapi";
import * as Config from "Config";
import Link from "@material-ui/core/Link";

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
        const args = {
            network: this.props.neo.network + "",
            name: "ne2", //this.props.deployfield.map(f => f.name)[0] + "",
            version: "1.0.1", //this.props.deployfield.map(f => f.version)[0] + "",
            author: "fuggy", //this.props.deployfield.map(f => f.author)[0] + "",
            email: "fuggy", //this.props.deployfield.map(f => f.emai)[0] + "",
            description: "fuggy", //this.props.deployfield.map(f => f.description)[0] + "",
            needsStorage: false, //this.props.deployfield.map(f => f.needsStorage)[0],
            dynamicInvoke: false, //this.props.deployfield.map(f => f.dynamicInvoke)[0],
            isPayable: false, //this.props.deployfield.map(f => f.isPayable)[0],
            parameterList: "0710",
            returnType: "05",
            code: this.props.file.binary + "",
            networkFee: Config.deploy.defaultFee + "",
        };
        console.log("### args:", args);
        neoDapi.deploy(args).then((result) => {
            console.log(result);
            neoDapi.getTransaction(result.txid, "PrivateNet").then(res => console.log("# GET TX RESULT: ", res)).catch(err => console.log("# GET TX RESULT: ", err)).finally(res => console.log("# GET TX RESULT: ", res));
            neoDapi.getApplicationLog(result.txid, "PrivateNet").then(res => console.log("# GET TX RESULT: ", res)).catch(err => console.log("# GET TX RESULT: ", err)).finally(res => console.log("# GET TX RESULT: ", res));

            // console.log("### nodeUrl:", nodeUrl);
            // const msg = `Transaction has been successfully deployed!\nTransaction ID:\n    ${txid} (viewing the transaction by reference will be available after adding it to the block)`;
            // this.props.addLog(msg, "Deploy");
            // this.props.enqueueSnackbar(notify("Transaction has been successfully deployed!", "success", "Deploy", this.props.closeSnackbar));
            // this.props.changeFileDeployed(this.props.file.key, txid);

        }).catch(err => {
            console.log(err);
            this.props.addLog(err.description.message || err.description || "Transaction has been rejected!", "Deploy");
            this.props.enqueueSnackbar(notify(err.description.message || err.description || "Transaction has been rejected!", "error", "Deploy", this.props.closeSnackbar));
            // Error with bed specification https://github.com/NeoResearch/neocompiler-eco/issues/45
            if (err.description.message && (err.description.message === "Error: One of the Policy filters failed.")) {
                this.props.enqueueSnackbar(notify("Try to increase the amount of fee", "info", "Deploy", this.props.closeSnackbar));
            }
        });
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
        neo: store.neo,
        contract: store.contract,
        deployfield: store.deployfield.filter(f => f.contract === store.contract.map(f => f.contract)[0]),
    };
};

const mapDispatchToProps = dispatch => ({
    changeFileDeployed: (name, i) => dispatch(actions.changeFileDeployed(name, i)),
    enqueueSnackbar: (message, options) => dispatch(actions.enqueueSnackbar(message /*options*/)),
    closeSnackbar: (key) => dispatch(actions.closeSnackbar(key)),
    addLog: (a, b) => dispatch(actions.addLog(a, b)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomButton);
