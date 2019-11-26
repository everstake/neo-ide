import React, { memo , useState, useEffect} from "react";
import {Paper, Grid, Button } from "@material-ui/core";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import Selector from "./Selector";
import Select from "react-select";
import {
    List,
    ListItem,
    IconButton,
    ListItemSecondaryAction,
} from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

const AddTodo = memo((props: any) => (
    <Paper style={{ margin: 16, padding: 16 }}>
        <Grid container>
            <Grid xs={12} md={1} item>
                <Button
                    fullWidth
                    color="secondary"
                    variant="outlined"
                    onClick={props.onButtonClick}
                >
          Add Parameter
                </Button>
            </Grid>
        </Grid>
    </Paper>
));

const TodoListItem = memo((props: any) => (
    <ListItem divider={props.divider}>
        <Selector number={props.selector_id} type={props.type} value_field ={props.value_field}/>

        <ListItemSecondaryAction>
            <IconButton aria-label="Delete Todo" onClick={props.onButtonClick}>
                <DeleteOutlined />
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem>

));

const Layout = memo(props => (
    <Paper
        elevation={0}
        style={{ padding: 0, margin: 0, backgroundColor: "#fafafa" }}
    >
        {props.children}
    </Paper>
));


function Parameters_Panel(props)  {

    const [todos, setTodos] = useState([]);

    const [methods, setMethods] = useState([]);
    const [selected_methods, selectMethods] = useState([]);

    const checked_parameter = props.parameter.filter(f => ((f.file_compiled == props.deployedcontract.map(f => f.contract)[0] && f.param == props.methods.map(f => f.methods)[0])));

    const compiled_files =  props.file.map(f => (f.key));
    const clearInputAndAddTodo = _ => {

        //  console.log(selected_methods[0])
        //  console.log(todos[0])
        props.addParameter("","", "",props.deployedcontract.map(f => f.contract)[0], props.methods.map(f => f.methods)[0]); // file_compiled


    };
    // console.log(props.deployedcontract.map(f => f.contract)[0]);
    // console.log(props.file)
    useEffect(() => {

    //    console.log(props.deployedcontract)
        // console.log( props.contract.map(f => f.contract)[0]);
        // setMethods(props.file.filter(f => f.key == props.contract.map(f => f.contract)[0] ).map(f => f.methods).map(f => f.methods)[0]);

        return () => {


        };
    }, []);

    function onSelectFiles(e) {

        // console.log(e.methods)
        var d = (e.methods).match(/\b(\w|')+\b/gim);
        // console.log(d.map(f => console.log(f)));
        // console.log(e.value)
        props.selectDeployedContract(e.value);

        props.selectContractMethods(d[0]);

        e.methods ? setMethods(d) : setMethods([]);

    }


    function onSelectMethods(method) {

        props.selectContractMethods(method.value);

    }


    function removeTodo(e) {
        console.log("REMOVED");
        console.log(e);
        props.delParameter(e);
    }
    return (

        <Layout>
            <Select defaultValue={[{value: props.deployedcontract.map(f => f.contract)[0], label: props.deployedcontract.map(f => f.contract)[0]}]}options={  props.file.map(f => (f.tx_id)).length
                ?  props.file.map(f => ({value: f.tx_id ,label: f.tx_id, methods:f.abi, lang:f.lang})) : [{label: "No deployed contracts", isDisabled: true}] } onChange={i => onSelectFiles(i)}></Select>
            {props.deployedcontract.map((file, i) => (
                <div key={`Div.Item.${i}`}>
                    <Select value={[{value: props.methods.map(f => f.methods)[0], label:props.methods.map(f => f.methods)[0]}]}
                        options={methods.map(f => (f)).length
                            ?  methods.map(f => ({value: f ,label: f, methods:f})) : [{label: "No Methods income", isDisabled: true }]}

                        onChange={i => onSelectMethods(i)}></Select>
                    {props.methods.map(f => (
                        <div key={`Div.Item.${i}`}>
                            <List key={`ListItem.${i}`} style={{ overflow: "hidden" }}>
                                {checked_parameter.map((todo, idx) => (

                                    <TodoListItem

                                        key={`TodoItem.${idx}`}
                                        selector_id ={todo.param_id}
                                        type={todo.type_of_value}
                                        value_field ={todo.value}
                                        divider={idx !== checked_parameter.length - 1}
                                        onButtonClick={() => removeTodo(idx)}

                                    />

                                ))}
                            </List>
                            <AddTodo key={`AddItem.${i}`} onButtonClick={clearInputAndAddTodo}/> </div>
                    ))}
                </div>
            ))}
        </Layout>
    );
}

const mapStateToProps = state => ({
    parameter: state.parameter,
    file: state.files.filter((file) => file.file).filter(file => file.deployed),
    contract: state.contract,
    methods: state.methods,
    deployedcontract: state.deployedcontract,
});
const mapDispatchToProps = dispatch =>({

    addParameter: (a,b,c,d,g) => dispatch(actions.addParameter(a,b,c,d,g)),
    delParameter: (param_id) => dispatch(actions.delParameter(param_id)),
    selectCompiledContract: (contract) => dispatch(actions.selectCompiledContract(contract)),
    selectContractMethods: (methods) => dispatch(actions.selectContractMethods(methods)),
    selectDeployedContract: (contract) => dispatch(actions.selectDeployedContract(contract)),

    // changeParameterType: (a,b) =>dispatch(actions.changeParameterType(a,b)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Parameters_Panel);
