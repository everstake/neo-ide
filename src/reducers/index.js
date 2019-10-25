import { combineReducers } from 'redux'
import usersReducer from './logs'
import filesReducer from './files'
import currentFile from './current_file'
import walletReducer from './wallet'
import neoReducer from './neo'

const reducers = combineReducers({
  logs: usersReducer,
  files: filesReducer,
  currentFile: currentFile,
  wallet: walletReducer,
  neo: neoReducer,
})

export default reducers