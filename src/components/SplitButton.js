import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import {connect} from 'react-redux';
import * as actions from '../actions/index'
import notify from '../utils/notificator.js';

const mapStateToProps = (store) => {
    let file = {};
    store.files.forEach(elem => {
        if (elem.file === true && elem.key.slice(-store.currentFile.length) === store.currentFile) {
            file = elem;
        }
    });
    return {
        file: file,
        logs: store,
        wallet: store.wallet,
        neo: store.neo,
    };
};

const options = ['Deploy'];
const mapDispatchToProps = dispatch => ({
    changeFileDeployed: (name) => dispatch(actions.changeFileDeployed(name)),
    enqueueSnackbar: (message, options)=>dispatch(actions.enqueueSnackbar(message, options)),
    closeSnackbar: (key)=>dispatch(actions.closeSnackbar(key)),
    addLog: (a, b) => dispatch(actions.addLog(a, b))
});

function SplitButton(props) {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleClick = () => {
        // alert(`You clicked ${options[selectedIndex]}`);

        console.log(props.wallet);
        props.neo.neo.deploy({
            network: 'TestNet',
            name: 'Hello world!',
            version: 'v1.0.0',
            author: 'NEOLine',
            email: 'info@neoline.network',
            description: 'My first contract.',
            needsStorage: true,
            dynamicInvoke: false,
            isPayable: false,
            parameterList: '0710',
            returnType: '05',
            code: props.file.binary,
            networkFee: '0.001'
        }).then(({txid, nodeUrl}: InvokeOutput) => {
            let msg = `Deploy transaction success!\nTransaction ID: ${txid} `
            props.addLog(msg, 'Deploy');
            props.enqueueSnackbar(notify(msg, 'success', 'Deploy', props.closeSnackbar));
            props.changeFileDeployed(props.file.key)
        }).catch(err => {
            props.addLog(err.description, 'Deploy');
            props.enqueueSnackbar(notify(err.description, 'error', 'Deploy', props.closeSnackbar));
        })

    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const handleClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    return (
        <Grid container direction="column" alignItems="center">
            <Grid item xs={12}>
                <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
                    <Button onClick={handleClick}>{options[selectedIndex]}</Button>
                    <Button
                        color="primary"
                        size="small"
                        aria-owns={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                    >
                        <ArrowDropDownIcon/>
                    </Button>
                </ButtonGroup>
                <Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
                    {({TransitionProps, placement}) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                            }}
                        >
                            <Paper id="menu-list-grow">
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList>
                                        {options.map((option, index) => (
                                            <MenuItem
                                                key={option}
                                                disabled={index === 2}
                                                selected={index === selectedIndex}
                                                onClick={event => handleMenuItemClick(event, index)}
                                            >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </Grid>
        </Grid>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SplitButton);