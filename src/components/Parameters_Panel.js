import React, { memo , useState} from "react";
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

  
  let compiled_files =  props.file.map(f => (f.key))
  const clearInputAndAddTodo = _ => {
    
   
    props.addParameter('','', '') // file_compiled
    
  
  };

  function onC(e) {
    
    e.value ? setTodos([e.value]) : console.log("no contract")
    console.log(e.methods.methods)
    console.log(todos)
    setMethods(e.methods.methods)
    console.log(methods.map(f => (f)).length
    ?  methods.map(f => ({value: f ,label: f, methods:f})): [{label: "No Methods income" }])

  }


  function onSelectMethods(method) {
    selectMethods([method])
  }


function removeTodo(e){
    console.log("REMOVED")
    console.log(e)
    props.delParameter(e)
  }
  return (
    
    <Layout>
      <Select options={  props.file.map(f => (f.key)).length
     ?  props.file.map(f => ({value: f.key ,label: f.key, methods:f.methods})): [{label: "No compiled contracts" }] } onChange={i => onC(i)}></Select>
     {todos.map((file, i) => (
       <div key={`Div.Item.${i}`}>
       <Select options={methods.map(f => (f)).length
    ?  methods.map(f => ({value: f ,label: f, methods:f})): [{label: "No Methods income" }]} onChange={i => onSelectMethods(i)}></Select>
            {selected_methods.map(f => (
              <div>
      <List key={`ListItem.${i}`} style={{ overflow: "hidden" }}>
          {props.parameter.map((todo, idx) => (
             
              <TodoListItem
                
                key={`TodoItem.${idx}`}
                selector_id ={todo.param_id}
                type={todo.type_of_value} 
                value_field ={todo.value}
                divider={idx !== props.parameter.length - 1}
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
});
const mapDispatchToProps = dispatch =>({
  
  addParameter: (a,b,c) => dispatch(actions.addParameter(a,b,c)),
  delParameter: (param_id) => dispatch(actions.delParameter(param_id))

  // changeParameterType: (a,b) =>dispatch(actions.changeParameterType(a,b)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Parameters_Panel);
