import { combineReducers } from 'redux'
import usersReducer from './logs'
import walletReducer from './wallet'
import neoReducer from './neo'

const reducers = combineReducers({
  logs: usersReducer,
  wallet: walletReducer,
  neo: neoReducer,
})

export default reducers