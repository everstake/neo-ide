import React , {useEffect} from "react";
import { connect } from 'react-redux';
import * as actions from '../actions/index'
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
const useStyles = makeStyles(theme => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250
  }
}));

function Selector(props) {
  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState();


 
  const handleChange = event => {
    setAge(event.target.value);
   
    props.changeParameterType(props.number, event.target.value)
    // console.log(props.parameter)
  };

  const handleText = e => {
    // console.log(props.number)
    // console.log(e.target.value)
    // // props.addParameter(props.number, "a", "s")

    props.changeParameterValue(props.number, e.target.value)
    console.log(props.number)
    console.log(props.type)
    console.log(props.value_field)
  }
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Type</InputLabel>
        <Select
          // labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={props.type}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          
          <MenuItem value={'0x00'}>Signature</MenuItem>
          <MenuItem value={'0x01'}>Boolean</MenuItem>
          <MenuItem value={'0x02'}>Hash160</MenuItem>
          <MenuItem value={'0x03'}>Hash256</MenuItem>
          <MenuItem value={'0x04'}>ByteArray</MenuItem>
          <MenuItem value={'0x05'}>PublicKey</MenuItem>
          <MenuItem value={'0x06'}>Array</MenuItem>
          <MenuItem value={'0x07'}>InteropInterface</MenuItem>
          <MenuItem value={'0x08'}>Void</MenuItem>
         
        </Select>

        <TextField
          id="standard-basic"
          className={classes.textField}
          onChange={handleText}
          value={props.value_field}
          label="Value"
          margin="dense"
        />
      </FormControl>
    </div>
  );
}


const mapStateToProps = state => ({
  parameter: state.parameter
});

const mapDispatchToProps = dispatch =>({
  
  addParameter: (a,b,c) => dispatch(actions.addParameter(a,b,c)),
  changeParameterType: (a,b) =>dispatch(actions.changeParameterType(a,b)),
  changeParameterValue: (a,b) =>dispatch(actions.changeParameterValue(a,b)),

  
});


export default connect(mapStateToProps, mapDispatchToProps)(Selector)