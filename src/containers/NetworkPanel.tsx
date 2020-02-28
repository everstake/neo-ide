import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import * as actions from "../actions/index";
import {connect} from "react-redux";
import notify from "../utils/notificator";

import { withTranslation } from "react-i18next";

const mapStateToProps = (store) => {
    let fileContent = "";
    let fileLang;
    store.files.forEach(elem => {
        if (elem.file === true && elem.key.slice(-store.currentFile.length) === store.currentFile) {
            fileContent = elem.currentContent;
            fileLang = elem.lang;
        }
    });
    return {
        value: fileContent,
        currentFile: store.currentFile,
        fileLang: fileLang,
        settings: store.settings,
        neo: store.neo,
    };
};

const mapDispatchToProps = dispatch => ({
    changeSetting: (param, value) => dispatch(actions.changeSetting(param, value)),
    changeFileSaved: (fileName, newContent, autosave) => dispatch(actions.changeFileSaved(fileName, newContent, autosave)),
    enqueueSnackbar: (message, options) => dispatch(actions.enqueueSnackbar(message /*options*/)),
    closeSnackbar: (key) => dispatch(actions.closeSnackbar(key)),
});

const PurpleSwitch = withStyles({
    switchBase: {
        color: purple[300],
        "&$checked": {
            color: purple[500],
        },
        "&$checked + $track": {
            backgroundColor: purple[500],
        },
    },
    checked: {},
    track: {},
})(Switch);

const settingsPanel = function CustomizedSwitches(props) {

    const handleChange = name => event => {
        if (props.neo.network) {
            props.enqueueSnackbar(notify(props.t("You can switch the network in the wallet application"), "info", "Broadcast successful", props.closeSnackbar));
            props.enqueueSnackbar(notify(props.t("O3 wallet does not currently support switching requests between networks"), "error", "Broadcast successful", props.closeSnackbar));
        } else {
            props.enqueueSnackbar(notify(props.t("Please connect wallet first"), "warning", "Broadcast successful", props.closeSnackbar));
        }
    };

    return (
        <FormGroup>
            <p>{props.t("Select network")}</p>
            <FormControlLabel
                control={
                    <PurpleSwitch
                        checked={props.neo.network == "MainNet"}
                        onChange={handleChange("autosave")}
                        // value="checkedA"
                    />
                }
                label={props.t("Main network")}
            />
            <FormControlLabel
                control={
                    <PurpleSwitch
                        checked={props.neo.network == "TestNet"}
                        onChange={handleChange("autocomplete")}
                        // value="checkedB"
                    />
                }
                label={props.t("Test network")}
            />
            <FormControlLabel
                control={
                    <PurpleSwitch
                        checked={props.neo.network == "PrivateNet"}
                        onChange={handleChange("autocomplete")}
                        // value="checkedB"
                    />
                }
                label={props.t("Private network")}
            />
        </FormGroup>
    );
};

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(settingsPanel));
