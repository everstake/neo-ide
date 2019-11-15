import React from 'react'
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import * as actions from '../actions/index'
import Select from 'react-select'





function SelectDeploy(props) {




    function onSelectFiles(e) {
         props.selectCompiledContract(e.value) 
         props.addeployField(e.value, '', '', '');


      }

    return(
        <Paper>
    <Select defaultValue={[{value: props.contract.map(f => f.contract)[0], label: props.contract.map(f => f.contract)[0]}]}options={  props.file.map(f => (f.key)).length
     ?  props.file.map(f => ({value: f.key ,label: f.key, methods:f.methods})): [{label: "No compiled contracts", isDisabled: true}] } onChange={i => onSelectFiles(i)}></Select>
</Paper>
    )
    }



const mapStateToProps = state => ({

    file: state.files.filter((file) => file.file).filter(file => file.compiled),
    contract: state.contract,

  });

  const mapDispatchToProps = dispatch =>({
    
    selectCompiledContract: (contract) => dispatch(actions.selectCompiledContract(contract)),
    addeployField: (contract, name, version, email) => dispatch(actions.addeployField(contract, name, version, email))
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(SelectDeploy);