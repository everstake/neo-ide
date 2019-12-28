import React from "react";
import { connect } from "react-redux";
import { SnackbarProvider } from "notistack";
import ReactTerminal, { ReactOutputRenderers } from "react-terminal-component";
import {
    OutputType,
    CommandMapping,
    defaultCommandMapping,
    EmulatorState,
    OutputFactory,
    Outputs,
} from "javascript-terminal";

import * as actions from "../actions/index";
import AlertsBox from "../components/alertsBox";

import Link from "@material-ui/core/Link";
import * as Config from "Config";

const LINK_OUTPUT_TYPE = "LINK_OUTPUT_TYPE";

const LinkOutput = ({ content: { beforeLink, endpoint, link, afterLink } }) => (
    <div>
        {beforeLink && <span>{beforeLink}&nbsp;</span>}
        {link && <Link href={endpoint + link} target="_blank" rel="noreferrer"> {link} </Link>}
        {afterLink && <span>&nbsp;{afterLink}</span>}
    </div>
);

const createLinkOutput = (beforeLink, endpoint, link, afterLink) => {
    return new OutputFactory.OutputRecord({
        type: LINK_OUTPUT_TYPE,
        content: {
            beforeLink,
            endpoint,
            link,
            afterLink,
        },
    });
};

function isLink(msg) {
    let msgBegin = msg;
    let link = "";
    let msgEnd = "";
    const linkIndex = msg.lastIndexOf("\n    ");
    if (linkIndex !== -1) {
        msgBegin = msg.slice(0, linkIndex);
        link = msg.slice(linkIndex + 5, msg.lastIndexOf("(") - 1);
        msgEnd = msg.slice(msg.lastIndexOf("("));
    }
    return { msgBegin, link, msgEnd };
}

const getNameByIndex = (val) => {
    switch (val) {
        case 0:
            return "Compiler";
        case 1:
            return "Deploy";
        case 2:
            return "Debug";
        case 3:
            return "Invoke";
        default:
            return "Compiler";
    }
};

function fetchLogs(logsArray, tab, network) {
    let newOutputs;
    const defaultState = EmulatorState.createEmpty();
    const defaultOutputs = defaultState.getOutputs();

    newOutputs = Outputs.addRecord(
        defaultOutputs, createLinkOutput(
            "",
            "",
            "",
            "",
        ),
    );

    logsArray.forEach(function (element) {
        if (element.group === getNameByIndex(tab.tab)) {
            const { msgBegin, link, msgEnd } = isLink(element.text);
            newOutputs = Outputs.addRecord(
                newOutputs, createLinkOutput(
                    element.date + " " + msgBegin, Config.blockExplorerEndpoints[network], link, msgEnd,
                ),
            );
        }
    });

    return defaultState.setOutputs(newOutputs);
}

class LogPanel extends React.Component<any, any> {
    render() {
        const logs = fetchLogs(this.props.logs, this.props.tab, this.props.network);
        return (
            <div>
                <SnackbarProvider
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}>
                    <AlertsBox />
                </SnackbarProvider>
                <ReactTerminal
                    inputStr={""}
                    outputRenderers={{
                        [OutputType.TEXT_OUTPUT_TYPE]: ReactOutputRenderers[OutputType.TEXT_OUTPUT_TYPE],
                        [OutputType.TEXT_ERROR_OUTPUT_TYPE]: ReactOutputRenderers[OutputType.TEXT_ERROR_OUTPUT_TYPE],
                        [OutputType.HEADER_OUTPUT_TYPE]: ReactOutputRenderers[OutputType.HEADER_OUTPUT_TYPE],
                        [LINK_OUTPUT_TYPE]: LinkOutput,
                    }}
                    theme={{
                        background: "#141313",
                        promptSymbolColor: "#6effe6",
                        commandColor: "#fcfcfc",
                        outputColor: "#fcfcfc",
                        errorOutputColor: "#ff89bd",
                        fontSize: "1.1rem",
                        spacing: "1%",
                        fontFamily: "monospace",
                        width: "100%",
                        height: "1000px",
                    }}
                    emulatorState={logs}
                />
            </div>
        );
    }
}
const mapStateToProps = state => ({
    logs: state.logs,
    tab: state.tab,
    network: state.neo.network,
});

const mapDispatchToProps = dispatch => ({
    addLog: (a, b) => dispatch(actions.addLog(a, b)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogPanel);
