import { combineReducers } from 'redux'
import usersReducer from './logs'
import walletReducer from './wallet'

const reducers = combineReducers({
  logs: usersReducer,
  wallet: walletReducer
})

export default reducers