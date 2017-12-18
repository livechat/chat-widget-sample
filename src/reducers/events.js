import { createReducer } from 'redux-create-reducer'
import * as actionTypes from '../constants/chatActionTypes'

const initialState = [
	{
		id: 'bot-message',
		authorId: 'bot',
		text: 'Hello, how can I help you?',
		timestamp: Date.now(),
	},
]

export default createReducer(initialState, {
	[actionTypes.NEW_MESSAGE](state, action) {
		if (action.payload.customId === 'VISITOR_CHAT_HISTORY') {
			return state
		}
		const foundEvent = state.filter(event => {
			return (
				(event.customId && event.customId === action.payload.customId) || (event.id && event.id === action.payload.id)
			)
		})
		if (!foundEvent.length) {
			return [...state, action.payload]
		}
		return state
	},
	[actionTypes.SEND_MESSAGE](state, action) {
		if (action.payload.customId === 'VISITOR_CHAT_HISTORY') {
			return state
		}
		return [
			...state,
			{
				...action.payload,
				status: 'SENDING',
				own: true,
			},
		]
	},
})
export const getEvents = state => state.events
