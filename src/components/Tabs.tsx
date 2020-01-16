import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import LogPanel from "../containers/LogPanel";
import "../stylesheets/tabs.css";
// import * as PropTypes from 'prop-types';
import * as actions from "../actions/index";
import {connect} from "react-redux";
import intl from "../debug/store/intl";
import debugStore from "../debug/containers/debug/store/debug.store";
import OutputStore from '../debug/containers/output/store/index.store';
import CodeBox from '../debug/containers/code';

import OutDeb from '../debug/containers/outbox/index';
import { withTranslation } from "react-i18next";

function TabPanel(props) {
    const {children, value, tabIndex, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={false}
            id={`simple-tabpanel-${tabIndex}`}
            aria-labelledby={`simple-tab-${tabIndex}`}
            {...other}
        >
            <Box className="jej" p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const AntTab = withStyles(theme => ({
    root: {
        minHeight: "2px",
        textTransform: "none",
        minWidth: 42,
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: 15,
        marginRight: theme.spacing(4),
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
        "&:hover": {
            color: "#40a9ff",
            opacity: 1,
        },
        "&$selected": {
            color: "#1890ff",
            fontWeight: theme.typography.fontWeightMedium,
        },
        "&:focus": {
            color: "#40a9ff",
        },
    },
    selected: {},
}))((props: any) => <Tab disableRipple {...props} />);

function SimpleTabs(props) {
    
    const value = props.tabIndex;

    const handleChange = (event, newValue) => {
        props.tabSwitch(newValue);
    };
    var contextTypes = {
        router: PropTypes.shape({
          history: PropTypes.shape({
            push: PropTypes.func.isRequired,
            replace: PropTypes.func.isRequired,
          }).isRequired
        }).isRequired
      }
     var codeEditor = React.createRef<CodeBox>();
   const onSizeChange = () => {
        if (codeEditor.current) {
          codeEditor.current.editorLayout();
        }
      }




    return (
        <div>
            <AppBar className="AppBar" position="static">
                <Tabs className="AppBarTabs" value={value} onChange={handleChange} aria-label="simple tabs example">
                    <AntTab label={props.t("Compiler")} value={0} {...a11yProps(0)} />
                    <AntTab label={props.t("Deploy")}  value={1} {...a11yProps(1)} />
                    <AntTab label={props.t("Debug")}  value={2} {...a11yProps(2)} />
                    <AntTab label={props.t("Invoke")} value={3} {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            {
             <LogPanel></LogPanel>
            }
          

        </div>
    );
}

const mapStateToProps = state => ({
    tabIndex: state.tab.tab,
});

const mapDispatchToProps = dispatch => ({
    tabSwitch: (a) => dispatch(actions.tabSwitch(a)),
});
export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(SimpleTabs));
