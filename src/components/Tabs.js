import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LogPanel from '../containers/LogPanel';
import '../stylesheets/tabs.css'

import * as actions from '../actions/index'
import {connect} from 'react-redux';

function TabPanel(props) {
    const {children, value, tabIndex, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== tabIndex}
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
        'aria-controls': `simple-tabpanel-${index}`,
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
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"'
        ].join(","),
        "&:hover": {
            color: "#40a9ff",
            opacity: 1
        },
        "&$selected": {
            color: "#1890ff",
            fontWeight: theme.typography.fontWeightMedium
        },
        "&:focus": {
            color: "#40a9ff"
        }
    },
    selected: {}
}))(props => <Tab disableRipple {...props} />);

function SimpleTabs(props) {
    let value = props.tabIndex

    const handleChange = (event, newValue) => {
        props.tabSwitch(event.target.textContent);
    };

    return (
        <div>
            <AppBar className="AppBar" position="static">
                <Tabs className="AppBarTabs" value={value} onChange={handleChange} aria-label="simple tabs example">
                    <AntTab label="Compiler" {...a11yProps(0)} />
                    <AntTab label="Deploy" {...a11yProps(1)} />
                    <AntTab label="Debug" {...a11yProps(2)} />
                </Tabs>
            </AppBar>

            <LogPanel></LogPanel>

        </div>
    );
}

const mapStateToProps = state => ({
    tabIndex: state.tab.index
});

const mapDispatchToProps = dispatch => ({
    tabSwitch: (a, b) => dispatch(actions.tabSwitch(a, b))
});
export default connect(mapStateToProps, mapDispatchToProps)(SimpleTabs);