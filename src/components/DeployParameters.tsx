import React, { memo } from "react";
import { Paper,   ListItem } from "@material-ui/core";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import Switch from "@material-ui/core/Switch";
import { fade, withStyles} from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const BootstrapInput = withStyles(theme => ({
    root: {
        "label + &": {
            marginTop: theme.spacing(0),
        },
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
            "\"Segoe UI\"",
            "Roboto",
            "\"Helvetica Neue\"",
            "Arial",
            "sans-serif",
            "\"Apple Color Emoji\"",
            "\"Segoe UI Emoji\"",
            "\"Segoe UI Symbol\"",
        ].join(","),
        "&:focus": {
            boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}))(InputBase);


const Layout = memo(props => (
    <Paper
        elevation={0}
        style={{ padding: 0, margin: 0, backgroundColor: "#fafafa" }}
    >
        {props.children}
    </Paper>
));

function DeployParameters(props) {


    function OnC(e , type) {

        console.log(props.contract);
        console.log(props.deployfield);
        console.log(props.deployfield.map(f =>f.description)[0]);
        if (type === "name") {
            props.changeNameField(props.contract.map(f => f.contract)[0], type, e.target.value);
        }
        if (type === "version") {
            props.changeNameField(props.contract.map(f => f.contract)[0], type, e.target.value);
        }
        if (type === "author") {
            props.changeNameField(props.contract.map(f => f.contract)[0], type, e.target.value);
        }
        if (type === "email") {
            props.changeNameField(props.contract.map(f => f.contract)[0], type, e.target.value);
        }
        if (type === "description") {
            props.changeNameField(props.contract.map(f => f.contract)[0], type, e.target.value);
        }
        if (type === "needsStorage") {
            props.changeNameField(props.contract.map(f => f.contract)[0], type, e.target.checked);

        }
        if (type === "dynamicInvoke") {
            props.changeNameField(props.contract.map(f => f.contract)[0], type, e.target.checked);
        }
        if (type === "isPayable") {
            props.changeNameField(props.contract.map(f => f.contract)[0], type, e.target.checked);
        }
        if (type === "networkFee") {
            props.changeNameField(props.contract.map(f => f.contract)[0], type, e.target.value);
        }


    }


    return (
        <Layout>
            <Paper>
                <ListItem >
                    <InputLabel  shrink htmlFor="bootstrap-input">
                        {"name"}
                    </InputLabel>
                    <BootstrapInput value={props.deployfield.map(f =>f.name)[0] ? props.deployfield.map(f =>f.name)[0] : ""} onChange={t => OnC(t, "name")}  id="bootstrap-input"  />
                </ListItem>
            </Paper>
            <Paper>
                <ListItem >
                    <InputLabel  shrink htmlFor="bootstrap-input">
                        {"version"}
                    </InputLabel>
                    <BootstrapInput value={props.deployfield.map(f =>f.version)[0] ? props.deployfield.map(f =>f.version)[0] : ""} onChange={t => OnC(t, "version")}  id="bootstrap-input"  />
                </ListItem>
            </Paper>
            <Paper>
                <ListItem >
                    <InputLabel  shrink htmlFor="bootstrap-input">
                        {"author"}
                    </InputLabel>
                    <BootstrapInput value={props.deployfield.map(f =>f.author)[0] ? props.deployfield.map(f =>f.author)[0] : ""}onChange={t => OnC(t, "author")}  id="bootstrap-input"  />
                </ListItem>
            </Paper>
            <Paper>
                <ListItem >
                    <InputLabel  shrink htmlFor="bootstrap-input">
                        {"email"}
                    </InputLabel>
                    <BootstrapInput value={props.deployfield.map(f =>f.email)[0] ? props.deployfield.map(f =>f.email)[0] : ""} onChange={t => OnC(t, "email")}  id="bootstrap-input"  />
                </ListItem>
            </Paper>
            <Paper>
                <ListItem >
                    <InputLabel  shrink htmlFor="bootstrap-input">
                        {"description"}
                    </InputLabel>
                    <BootstrapInput value={props.deployfield.map(f =>f.description)[0] ? props.deployfield.map(f =>f.description)[0] : ""} onChange={t => OnC(t, "description")}  id="bootstrap-input"  />
                </ListItem>
            </Paper>
            <Paper>
                <ListItem >
                    <InputLabel  shrink htmlFor="bootstrap-input">
                        {"networkFee"}
                    </InputLabel>
                    <BootstrapInput value={props.deployfield.map(f =>f.networkFee)[0] ? props.deployfield.map(f =>f.networkFee)[0] : ""} onChange={t => OnC(t, "networkFee")}  id="bootstrap-input"  />
                </ListItem>
            </Paper>
            <Paper>
                <FormControlLabel
                    control={
                        <Switch checked={props.deployfield.map(f =>f.needsStorage)[0] ? props.deployfield.map(f =>f.needsStorage)[0] : false}  onChange={t =>OnC(t, "needsStorage")} value="needsStorage" />
                    }
                    label="needsStorage"
                />
            </Paper>
            <Paper>
                <FormControlLabel
                    control={
                        <Switch checked={props.deployfield.map(f =>f.dynamicInvoke)[0] ? props.deployfield.map(f =>f.dynamicInvoke)[0] : false}  onChange={t =>OnC(t, "dynamicInvoke")} value="dynamicInvoke" />
                    }
                    label="dynamicInvoke"
                />
            </Paper>
            <Paper>
                <FormControlLabel
                    control={
                        <Switch checked={props.deployfield.map(f =>f.isPayable)[0] ? props.deployfield.map(f =>f.isPayable)[0] : false}  onChange={t =>OnC(t, "isPayable")} value="isPayable" />
                    }
                    label="isPayable"
                />
            </Paper>
        </Layout>
    );
}

const mapStateToProps = state => ({
    contract: state.contract,
    deployfield: state.deployfield.filter(f => f.contract === state.contract.map(f => f.contract)[0]),
});


const mapDispatchToProps = dispatch =>({

    addeployField: (contract, name, version, email) => dispatch(actions.addeployField(contract, name, version, email)),
    changeNameField: (contract, field_name, value) => dispatch(actions.changeNameField(contract, field_name, value)),
    // changeParameterType: (a,b) =>dispatch(actions.changeParameterType(a,b)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeployParameters);
