import React, { memo , useState, useEffect} from "react";
import {Paper, Grid, Button } from "@material-ui/core";
import { connect } from 'react-redux';
import * as actions from '../actions/index'
import Selector from "./Selector";
import Select from 'react-select'
import {
  List,
  ListItem,
  IconButton,
  ListItemSecondaryAction
} from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import { array } from "prop-types";

const AddTodo = memo(props => (
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


const TodoListItem = memo(props => (
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

 let checked_parameter = props.parameter.filter(f => ((f.file_compiled == props.contract.map(f => f.contract)[0] && f.param ==props.methods.map(f => f.methods)[0])))

//   if (!checked_parameter[checked_parameter.length-1]){
//     checked_parameter = []
//   }
// console.log(checked_parameter)
//  file_compiled: "examples_python/domain.py", param: "name" }
  let compiled_files =  props.file.map(f => (f.key))
  const clearInputAndAddTodo = _ => {
    
  //  console.log(selected_methods[0])
  //  console.log(todos[0])
    props.addParameter('','', '',props.contract.map(f => f.contract)[0], props.methods.map(f => f.methods)[0]) // file_compiled
    
  
  };

  useEffect(() => {
    // effect
setMethods(props.file.filter(f => f.key == props.contract.map(f => f.contract)[0] ).map(f => f.methods).map(f => f.methods)[0])
    // console.log()
    return () => {
      // props.selectContractMethods()
   
    };
  }, [])

  function onSelectFiles(e) {
    console.log(e.value)
    console.log(e.methods)
    // console.log(e.methods.methods)
    // e.value ? (setTodos([e.value])): console.log("no contract")
    props.selectCompiledContract(e.value) 
    // console.log(e.methods.methods)
    // console.log(todos)
    
    e.methods ? setMethods(e.methods.methods) : setMethods([])
    // console.log(methods.map(f => (f)).length
    // ?  methods.map(f => ({value: f ,label: f, methods:f})): [{label: "No Methods income" }])

    // console.log(props.contract)
    // console.log(props.methods)
  }


  function onSelectMethods(method) {
  
    props.selectContractMethods(method.value)
    // console.log(method)
  }


function removeTodo(e){
    console.log("REMOVED")
    console.log(e)
    props.delParameter(e)
  }
  return (
   
    <Layout>
      <Select defaultValue={[{value: props.contract.map(f => f.contract)[0], label: props.contract.map(f => f.contract)[0]}]}options={  props.file.map(f => (f.key)).length
     ?  props.file.map(f => ({value: f.key ,label: f.key, methods:f.methods})): [{label: "No compiled contracts", isDisabled: true}] } onChange={i => onSelectFiles(i)}></Select>
     {props.contract.map((file, i) => (
       <div key={`Div.Item.${i}`}>
       <Select defaultValue={[{value: props.methods.map(f => f.methods)[0], label:props.methods.map(f => f.methods)[0]}]} 
       options={methods.map(f => (f)).length
    ?  methods.map(f => ({value: f ,label: f, methods:f})): [{label: "No Methods income", isDisabled: true }]} 
    
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
                divider={idx !==checked_parameter.length - 1}
                onButtonClick={() => removeTodo(idx)}
                
              />
            
          ))}
        </List>

      <AddTodo key={`AddItem.${i}`} onButtonClick={clearInputAndAddTodo}/> </div>
      ))}
      </div>
          ))}
    </Layout>
  )
};

const mapStateToProps = state => ({
  parameter: state.parameter,
  file: state.files.filter((file) => file.file).filter(file => file.compiled),
  contract: state.contract,
  methods: state.methods
});
const mapDispatchToProps = dispatch =>({
  
  addParameter: (a,b,c,d,g) => dispatch(actions.addParameter(a,b,c,d,g)),
  delParameter: (param_id) => dispatch(actions.delParameter(param_id)),
  selectCompiledContract: (contract) => dispatch(actions.selectCompiledContract(contract)),
  selectContractMethods: (methods) => dispatch(actions.selectContractMethods(methods)),

  // changeParameterType: (a,b) =>dispatch(actions.changeParameterType(a,b)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Parameters_Panel);
