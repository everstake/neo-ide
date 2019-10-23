import { combineReducers } from 'redux'
import usersReducer from './logs'
import filesReducer from './files'
import currentFile from './current_file'

const reducers = combineReducers({
  logs: usersReducer,
  files: filesReducer,
  currentFile: currentFile
})

export default reducers