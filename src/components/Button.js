import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import * as actions from '../actions/index'
import notify from '../utils/notificator.js';

function GroupedButtons(props) {


    function handleClick(e) {
            console.log(props.contract)
            console.log(props.deployfield.map(f => f.name)[0])
            console.log(props.files.map(f => f.binary)[0])


            props.neo.neo.deploy({
                network: 'TestNet',
                name: props.deployfield.map(f => f.name)[0] + "",
                version: props.deployfield.map(f => f.version)[0]+ "",
                author: props.deployfield.map(f => f.author)[0]+ "",
                email: props.deployfield.map(f => f.emai)[0]+ "",
                description: props.deployfield.map(f => f.description)[0]+ "",
                needsStorage: props.deployfield.map(f => f.needsStorage)[0],
                dynamicInvoke: props.deployfield.map(f => f.dynamicInvoke)[0],
                isPayable: props.deployfield.map(f => f.isPayable)[0],
                parameterList: '0710',
                returnType: '05',
                code: props.files.map(f => f.binary)[0],
                networkFee: props.deployfield.map(f => f.networkFee)[0]+ "",


            }).then(({txid, nodeUrl}: InvokeOutput) => {
                let msg = `Deploy transaction success!\nTransaction ID: ${txid} `
                props.addLog(msg, 'Deploy');
                props.enqueueSnackbar(notify(msg, 'success', 'Deploy', props.closeSnackbar));
                props.changeFileDeployed(props.file.key)
            }).catch(err => {
                props.addLog(err.description, 'Deploy');
                props.enqueueSnackbar(notify(err.description, 'error', 'Deploy', props.closeSnackbar));
            })
    
    }


    return (
        <Paper>
        <Grid item xs={12} md={6}>
            <Grid container spacing={1} direction="column" alignItems="center">
                <Grid item>
                    <ButtonGroup
                        variant="contained"
                        color="secondary"
                        size="large"
                        aria-label="large contained secondary button group"
                    >
                        <Button onClick={handleClick}>Deploy</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        </Grid>
        </Paper>
    );
}

const mapStateToProps = state => ({
    neo: state.neo,
    contract: state.contract,
    deployfield: state.deployfield.filter(f => f.contract === state.contract.map(f => f.contract)[0]),
    files: state.files.filter(f => f.key === state.contract.map(f => f.contract)[0])
  });
  

const options = ['Deploy'];
const mapDispatchToProps = dispatch => ({
    changeFileDeployed: (name) => dispatch(actions.changeFileDeployed(name)),
    enqueueSnackbar: (message, options)=>dispatch(actions.enqueueSnackbar(message, options)),
    closeSnackbar: (key)=>dispatch(actions.closeSnackbar(key)),
    addLog: (a, b) => dispatch(actions.addLog(a, b))
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupedButtons)