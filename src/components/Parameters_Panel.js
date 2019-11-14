import React, { memo , useState} from "react";
import {Paper, Grid, Button } from "@material-ui/core";
import { connect } from 'react-redux';
import * as actions from '../actions/index'
import Selector from "./Selector";
import {
  List,
  ListItem,
  IconButton,
  ListItemSecondaryAction
} from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

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
  console.log(props.parameter)
  const [todos, setTodos] = useState([]);
  // setTodos(props.parameter);
  const clearInputAndAddTodo = _ => {
    
    
    props.addParameter('','', '')
    
  
  };


function removeTodo(e){
    console.log("REMOVED")
    console.log(e)
    props.delParameter(e)
  }
  return (
    
    <Layout>
      
        <List style={{ overflow: "hidden" }}>
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
     
      <AddTodo
        onButtonClick={clearInputAndAddTodo}
       
      />
    </Layout>
  )
};

const mapStateToProps = state => ({
  parameter: state.parameter
});
const mapDispatchToProps = dispatch =>({
  
  addParameter: (a,b,c) => dispatch(actions.addParameter(a,b,c)),
  delParameter: (param_id) => dispatch(actions.delParameter(param_id))

  // changeParameterType: (a,b) =>dispatch(actions.changeParameterType(a,b)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Parameters_Panel);
