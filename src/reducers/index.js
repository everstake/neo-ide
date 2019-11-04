import { combineReducers } from 'redux'
import alertsReducer from './alerts'
import usersReducer from './logs'
import groupLogReducer from './tabswitch'
import filesReducer from './files'
import currentFile from './current_file'
import walletReducer from './wallet'

import neoReducer from './neo'

const reducers = combineReducers({
  alerts: alertsReducer,
  logs: usersReducer,
  files: filesReducer,
  currentFile: currentFile,
  wallet: walletReducer,
  tab: groupLogReducer,
  neo: neoReducer,
})

export default reducers
