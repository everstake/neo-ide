import Telegram from '@material-ui/icons/Telegram';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import React from "react";
import * as actions from '../actions/index'
import {connect} from 'react-redux';




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
            code: this.props.file.binary,
            networkFee: '0.001'
        }).then(({txid, nodeUrl}: InvokeOutput) => {
            this.props.addLog(`Deploy transaction success!\nTransaction ID: ${txid} `, 'Deploy');
            this.props.enqueueSnackbar({
                message: 'Compiled!',
                options: {
                  variant: 'success',
                  group: 'Deploy',
                  action: key => (
                    <Button onClick={() => {this.props.closeSnackbar(key)}}>close</Button>
                  )
                }
            })
            this.props.changeFileDeployed(this.props.file.key)
        }).catch(err => {
            this.props.addLog(err.description, 'Deploy');
            console.log("Deploy error: ", err)
            this.props.enqueueSnackbar({
                message: err.description,
                options: {
                  variant: 'error',
                  group: 'Deploy',
                  action: key => (
                    <Button onClick={() => {this.props.closeSnackbar(key)}}>close</Button>
                  )
                }
            })
        })
    }

    render() {
        let content;
        if (this.props.saved) {
            content = "deployed"
        } else {
            content = "deploy"
        }
        console.log("deployed: ", this.props.file.saved);
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