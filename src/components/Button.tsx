import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import notify from "../utils/notificator";
import neoDapi from "neo-dapi";

import { withTranslation } from "react-i18next";

function GroupedButtons(props) {


    function handleClick(e) {
        props.changeFileProcessing(props.file, true);
        neoDapi.deploy({
            network: props.neo.network + "",
            name: props.deployfield.map(f => f.name)[0] + "",
            version: props.deployfield.map(f => f.version)[0] + "",
            author: props.deployfield.map(f => f.author)[0] + "",
            email: props.deployfield.map(f => f.email)[0] + "",
            description: props.deployfield.map(f => f.description)[0] + "",
            needsStorage: props.deployfield.map(f => f.needsStorage)[0],
            dynamicInvoke: props.deployfield.map(f => f.dynamicInvoke)[0],
            isPayable: props.deployfield.map(f => f.isPayable)[0],
            parameterList: "0710",
            returnType: "05",
            code: props.files.map(f => f.binary)[0] + "",
            networkFee: props.deployfield.map(f => f.networkFee)[0] + "",
        }).then(({ txid, nodeUrl }) => {
            const deployedMsg = props.t("Transaction has been successfully deployed!");
            const viewLinkMsg = props.t("(viewing the transaction by reference will be available after adding it to the block)");
            const msg = deployedMsg + "\n" + props.t("Transaction ID:") + `\n    ${txid} ` + viewLinkMsg;
            props.addLog(msg, "Deploy");
            props.enqueueSnackbar(notify(deployedMsg, "success", "Deploy", props.closeSnackbar));
            props.changeFileDeployed(props.files.map(f => f.key)[0], txid);
        }).catch(err => {
            // props.changeFileDeployed(props.files.map(f => f.key)[0], 1); // why do we need this?
            console.log(err);
            props.addLog(err.description.message || err.description || "Transaction has been rejected!", "Deploy");
            props.enqueueSnackbar(notify(err.description.message || err.description || "Transaction has been rejected!", "error", "Deploy", props.closeSnackbar));
            // Error with bed specification https://github.com/NeoResearch/neocompiler-eco/issues/45
            if (err.description.message && (err.description.message === "Error: One of the Policy filters failed.")) {
                props.enqueueSnackbar(notify("Try to increase the amount of fee", "info", "Deploy", props.closeSnackbar));
            }
            props.changeFileProcessing(props.file, false);
        });

    }


    return (
        <Paper>
            <Grid item xs={12} md={6}>
                <Grid container spacing={1} direction="column" alignItems="center">
                    <Grid item>
                        <ButtonGroup
                            className="btn-primary"
                            variant="contained"
                            color="secondary"
                            size="large"
                            aria-label="large contained secondary button group"
                            disabled={props.deployfield.map(f => f.name)[0].length && props.deployfield.map(f => f.version)[0].length &&
                            props.deployfield.map(f => f.author)[0].length && props.deployfield.map(f => f.email)[0].length
                            && props.deployfield.map(f => f.networkFee)[0].length && !props.file.processing && !props.file.deployed ? false : true}
                        >
                            <Button onClick={handleClick}>
                                {
                                    props.t(
                                        (props.file.deployed && "Deployed") ||
                                        (props.file.processing && "Deploying") ||
                                        "Deploy",
                                    )
                                }
                            </Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}

const mapStateToProps = (state) => {
    let file = {};
    state.files.forEach(elem => {
        if (elem.file === true && elem.key.slice(-state.currentFile.length) === state.currentFile) {
            file = elem;
        }
    });
    return {
        neo: state.neo,
        contract: state.contract,
        deployfield: state.deployfield.filter(f => f.contract === state.contract.map(f => f.contract)[0]),
        files: state.files.filter(f => f.key === state.contract.map(f => f.contract)[0]),
        file: file,
    };
};

const options = ["Deploy"];
const mapDispatchToProps = dispatch => ({
    changeFileDeployed: (name, txid) => dispatch(actions.changeFileDeployed(name, txid)),
    enqueueSnackbar: (message, options) => dispatch(actions.enqueueSnackbar(message /*options*/)),
    closeSnackbar: (key) => dispatch(actions.closeSnackbar(key)),
    addLog: (a, b) => dispatch(actions.addLog(a, b)),
    changeFileProcessing: (key, processing) => dispatch(actions.changeFileProcessing(key, processing)),
});

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(GroupedButtons));

