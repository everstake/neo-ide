import React, {useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import notify from "../utils/notificator";
import neoDapi from "neo-dapi";
function ButtonInvoke(props) {


    useEffect(()=>{
        // console.log(props.parameter.map(f => console.log(f.param)))
        // console.log()
        console.log(props.deployedcontract.map(f => f.contract)[0]);

    });
    function handleClick(e) {
        const d = props.parameter.filter(f => f.param === props.methods.map(f => f.methods)[0]);
        console.log("ALAL+++++>>>>>>>> ", props.deployedcontract)
        neoDapi.invoke({    
            scriptHash: props.deployedcontract[0].contract,
            operation: props.methods.map(f => f.methods)[0],
            args:  d.map(f => {

                const a =  {type: f.type_of_value,
                    value: f.value,
                };
                return a;
            }),
            network: props.neo.network + "",
        })
            .then((result: Record<string, any>) => {
                console.log("Read invocation result: ", result);
                const msg = `Transaction has been successfully broadcasted!\nTransaction ID:\n    ${result.txid} (viewing the transaction by reference will be available after adding it to the block)`;
                props.addLog(msg, "Deploy");
                props.enqueueSnackbar(notify("Invoked successfully!", "success", "Broadcast successful", props.closeSnackbar));
            }).catch(err => {
                console.log(err);
                props.addLog(err.description, "Deploy");
                props.enqueueSnackbar(notify(err.description, "error", "Deploy", props.closeSnackbar));
            });
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
                            <Button onClick={handleClick}>Invoke</Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}

const mapStateToProps = state => ({
    methods: state.methods,
    parameter: state.parameter,
    neo: state.neo,
    deployedcontract: state.deployedcontract,
    deployfield: state.deployfield.filter(f => f.contract === state.deployedcontract.map(f => f.contract)[0]),
    files: state.files.filter(f => f.tx_id === state.deployedcontract.map(f => f.contract)[0]),
});


const options = ["Deploy"];
const mapDispatchToProps = dispatch => ({
    changeFileDeployed: (name, txid) => dispatch(actions.changeFileDeployed(name, txid)),
    enqueueSnackbar: (message, options)=>dispatch(actions.enqueueSnackbar(message /*options*/)),
    closeSnackbar: (key)=>dispatch(actions.closeSnackbar(key)),
    addLog: (a, b) => dispatch(actions.addLog(a, b)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonInvoke)
;
