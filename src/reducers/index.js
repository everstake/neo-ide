import { combineReducers } from 'redux'
import logs from './logs'
import visibilityFilter from './visibilityFilter'

export default combineReducers({
  logs,
  visibilityFilter
})