import { combineReducers } from 'redux'
import events from './events'
import users from './users'
import app from './app'

const rootReducer = combineReducers({
	app,
	events,
	users,
})

export default rootReducer
