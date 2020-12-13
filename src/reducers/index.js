import { combineReducers } from 'redux'
import counter from './counter'
import loginUpdater from './auth'

export default combineReducers({
  counter,loginUpdater
})
