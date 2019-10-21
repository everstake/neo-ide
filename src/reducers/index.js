import { combineReducers } from 'redux'
import usersReducer from './logs'

const reducers = combineReducers({
  logs: usersReducer
})

export default reducers