import { combineReducers } from 'redux'
import alertsReducer from './alerts'
import usersReducer from './logs'
import groupLogReducer from './tabswitch'
import filesReducer from './files'
import currentFile from './current_file'
import parameterReducer from './params'
import neoReducer from './neo'
import contractReducer from './contract'
import methodsReducer from './methods'
import deployfiledReducer from './deployfiels'
import deployedcontractReducer from './deployed_contract'
const reducers = combineReducers({
  alerts: alertsReducer,
  logs: usersReducer,
  files: filesReducer,
  currentFile: currentFile,
  tab: groupLogReducer,
  neo: neoReducer,
  parameter: parameterReducer,  
  contract: contractReducer,
  methods: methodsReducer,
  deployfield: deployfiledReducer,
  deployedcontract: deployedcontractReducer,
})

export default reducers
