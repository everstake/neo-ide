import Telegram from '@material-ui/icons/Telegram';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import React from "react";
import * as actions from '../actions/index'
import {connect} from 'react-redux';
import notify from '../utils/notificator.js';



const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
}));

function CustomButtonView(props) {
    const classes = useStyles();
    return (<Button
        disabled={props.disabled}
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<Telegram/>}
        onClick={props.deploy}
        args={props.args}
    > {props.content} </Button>);
}

class CustomButton extends React.Component {
    constructor(props) {
        super(props);
        this.deploy = this.deploy.bind(this);
    }

    deploy() {
        this.props.neo.neo.deploy({
            network: 'TestNet',
            name: 'Hello world3!',
            version: 'v1.0.1',
            author: 'NEOLine',
            email: 'info@neoline.network',
            description: 'My first contract.',
            needsStorage: true,
            dynamicInvoke: false,
            isPayable: false,
            parameterList: '0710',
            returnType: '05',
            code: this.props.file.binary,
            networkFee: '0.001'
        }).then(({txid, nodeUrl}: InvokeOutput) => {
            let msg = `Deploy transaction success!\nTransaction ID: ${txid} `
            this.props.addLog(msg, 'Deploy');
            this.props.enqueueSnackbar(notify(msg, 'success', 'Deploy', this.props.closeSnackbar));
            this.props.changeFileDeployed(this.props.file.key)
        }).catch(err => {
            this.props.addLog(err.description, 'Deploy');
            this.props.enqueueSnackbar(notify(err.description, 'error', 'Deploy', this.props.closeSnackbar));
        })
    }

    render() {
        let content;
        if (this.props.saved) {
            content = "deployed"
        } else {
            content = "deploy"
        }
        return (
            <CustomButtonView
                disabled={(!this.props.file.compiled && !this.props.file.deployed) || (this.props.file.deployed)}
                content={content} deploy={this.deploy} args={{lala: 15}}/>
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
            neo: store.neo
        };
};

const mapDispatchToProps = dispatch => ({
    changeFileDeployed: (name) => dispatch(actions.changeFileDeployed(name)),
    enqueueSnackbar: (message, options)=>dispatch(actions.enqueueSnackbar(message, options)),
    closeSnackbar: (key)=>dispatch(actions.closeSnackbar(key)),
    addLog: (a, b) => dispatch(actions.addLog(a, b))
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomButton)