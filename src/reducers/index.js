import { combineReducers } from 'redux'
import alertsReducer from './alerts'
import usersReducer from './logs'
import groupLogReducer from './tabswitch'
import filesReducer from './files'
import currentFile from './current_file'
import walletReducer from './wallet'
import parameterReducer from './params'
import neoReducer from './neo'
import contractReducer from './contract'
import methodsReducer from './methods'
import deployfiledReducer from './deployfiels'

const reducers = combineReducers({
  alerts: alertsReducer,
  logs: usersReducer,
  files: filesReducer,
  currentFile: currentFile,
  wallet: walletReducer,
  tab: groupLogReducer,
  neo: neoReducer,
  parameter: parameterReducer,  
  contract: contractReducer,
  methods: methodsReducer,
  deployfield: deployfiledReducer,
})

export default reducers
