import React, {useEffect, useState, useCallback} from "react";
import "../stylesheets/d.css";
import App from "../App";
import SplitPane from "react-split-pane";
import "../stylesheets/demos.css";
import ensureArray from "ensure-array";
import ButtonM from "./Button";
import SideNav, {NavIcon, NavItem, NavText} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "../stylesheets/react-breadcrumbs.css";
import styled from "styled-components";
import Select from "react-select";
import FileBrowserWrapper from "../containers/FileBrowserWrapper";
import MultilineTextFields from "./ParametrsPane";
import Grid from "@material-ui/core/Grid";
import Wallet from "./Wallet";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import * as actions from "../actions/index";
import {connect} from "react-redux";
import SaveButton from "./SaveButton";
import CompileButton from "./CompileButton";
import DeployButton from "./DeployButton";
import Tab from "./Tabs";
import SplitButton from "./SplitButton";
import DeployParameters from "./DeployParameters";
import SelectDeploy from "./SelectDeploy";
import SettingsPanel from "../containers/SettingsPanel";
import DiskButtons from "../containers/DiskButtons";

import neoDapi from "neo-dapi";
const Main = styled.main`
    margin-left: 20px;
`;

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        overflow: "hidden",
        padding: theme.spacing(0, 3),
    },
    paper: {
        maxWidth: 400,
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
    },
}));

const mapStateToProps = store => ({
    logs: store,
    neo: store.neo,
    contract: store.contract,
});

const mapDispatchToProps = dispatch => ({
    changeNEOField: (type, value) => dispatch(actions.changeNEOField(type, value)),
});


function MainPanel(props) {

    const [selected, setSelected] = useState("home");
    const [expanded, setExpanded] = useState(false);
    const [account, setAccount] = useState(false);

    const [balance, setBalance] = useState(null);


    const handleReady = useCallback(event => {
        // console.log("EVEEET");

        // console.log(event);
        neoDapi.getAccount().then(f =>
        {
            //console.log(f.address);
            props.changeNEOField("address", f.address);
        }).catch(e => {  console.log(e);
            props.changeNEOField("neo", false) ; });


    }, []);


    const handleBalance = (event, m) => {
        // let t = setInterval(function () {
        neoDapi.getBalance({
            params: [
                {
                    address: m + "",
                    assets: ["NEO", "GAS"],
                },
            ],
            network: event + "",
        }).then(results => {
            // console.log("### RESULTS: ", results);
            Object.keys(results).forEach(address => {
                const balances = results[address];
                const asset = [];
                const balanci = [];
                balances.forEach(balance => {
                    const { assetID, symbol, amount } = balance;
                    asset.push(symbol);
                    balanci.push(amount);

                });
                props.changeNEOField("coin_type", asset);
                props.changeNEOField("amount", balanci);


                //console.log(asset);
                //console.log(balanci);

            });
        }).catch (e =>  console.log(e) );

        // }, 1000)
    };

    const handleConnected = useCallback(event => {
        // const { key, keyCode } = event;

        // console.log("CON");
        // console.log(event);


        neoDapi.getNetworks()
            .then(f =>
            {
                props.changeNEOField("network", f.defaultNetwork);
                return f;
            },

            ).then(f => { handleBalance(f.defaultNetwork, event.address) ; } );
    }, []);


    const handleChangeNetwork = useCallback(event => {
        props.changeNEOField("network", event.defaultNetwork);

    }, []);


    useEffect(() => {
        neoDapi.addEventListener(neoDapi.Constants.EventName.READY, handleReady);
        neoDapi.addEventListener(neoDapi.Constants.EventName.CONNECTED, handleConnected);
        neoDapi.addEventListener(neoDapi.Constants.EventName.NETWORK_CHANGED, handleChangeNetwork);

        return () => {

            neoDapi.removeEventListener(neoDapi.Constants.EventName.NETWORK_CHANGED);
            neoDapi.removeEventListener(neoDapi.Constants.EventName.CONNECTED);
            neoDapi.removeEventListener(neoDapi.Constants.EventName.READY);

        };
    }, [handleReady, handleConnected, handleChangeNetwork]);


    const onSelect = (selected) => {

        setSelected(selected);
    };
    const onToggle = (expanded) => {

        setExpanded(expanded);
    };

    const classes = useStyles(props);

    function renderBreadcrumbs() {
        // console.log(!props.contract.length);
        const pageTitle = {
            "home": [
                <div>
                    <SaveButton/>
                    <CompileButton/>
                    <DeployButton/>
                </div>,
                <DiskButtons/>,
                <FileBrowserWrapper/>,
            ],
            "devices": props.neo.network ? [props.contract.length ? <div className='select'><SelectDeploy></SelectDeploy><DeployParameters></DeployParameters><ButtonM></ButtonM></div> : <div className='select'><SelectDeploy></SelectDeploy></div>] : [<Paper> There is no wallet</Paper>],
            "reports": ["Reports"],
            "wallet": [<Wallet account={account} balance={balance}></Wallet>,
                <MultilineTextFields></MultilineTextFields>],
            "settings/editor": [<SettingsPanel />],
            // 'settings/network': ['Settings', 'Network']
        };

        const list = ensureArray(pageTitle[selected]);

        return (
            <div className={classes.root}>

                {/* <Grid container wrap="nowrap" spacing={2}> */}

                {list.map((item, index) => (
                    <Paper className={classes.paper}>
                        <Grid xs={12} container wrap="nowrap" spacing={2}>


                            {item}
                        </Grid>
                    </Paper>
                ))}

                {/* </Grid> */}

            </div>
        );
    }

    return (
        <div>
            <SplitPane split="vertical" size={550}>
                <div>
                    <SideNav onSelect={onSelect} onToggle={onToggle}>
                        <SideNav.Nav selected={selected}>
                            <NavItem eventKey="home">
                                <NavIcon>
                                    <i className="fa fa-fw fa-folder-open"
                                        style={{fontSize: "1.75em", verticalAlign: "middle"}}/>
                                </NavIcon>

                            </NavItem>
                            <NavItem eventKey="devices">
                                <NavIcon>
                                    <i className="fa fa-fw fa-play-circle"
                                        style={{fontSize: "1.75em", verticalAlign: "middle"}}/>
                                </NavIcon>

                            </NavItem>
                            <NavItem eventKey="wallet">
                                <NavIcon>
                                    <i className="fa fa-fw fa-bank"
                                        style={{fontSize: "1.75em", verticalAlign: "middle"}}/>
                                </NavIcon>
                                <NavText style={{paddingRight: 32}} title="Wallet">
                                    Devices
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="reports">
                                <NavIcon>
                                    <i className="fa fa-fw fa-bug"
                                        style={{fontSize: "1.75em", verticalAlign: "middle"}}/>
                                </NavIcon>
                                <NavText style={{paddingRight: 32}} title="Reports">
                                    Reports
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="settings">
                                <NavIcon>
                                    <i className="fa fa-fw fa-cogs"
                                        style={{fontSize: "1.5em", verticalAlign: "middle"}}/>
                                </NavIcon>
                                <NavText style={{paddingRight: 32}} title="Settings">
                                    Settings
                                </NavText>
                                <NavItem eventKey="settings/editor">
                                    <NavText title="Editor">
                                        Editor
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="settings/network">
                                    <NavText title="Network">
                                        Network
                                    </NavText>
                                </NavItem>
                            </NavItem>
                        </SideNav.Nav>
                    </SideNav>
                    <Main className="main-breadcrumbs">
                        {renderBreadcrumbs()}
                    </Main>
                </div>
                <SplitPane split="horizontal" size={500}>
                    <App/>
                    {/* <LogPanel /> */}
                    <Tab/>
                </SplitPane>
            </SplitPane>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPanel);
