import { createReducer } from 'redux-create-reducer'
import * as chatActionTypes from '../constants/chatActionTypes'

const initialState = {
	chatState: 'NOT_CHATTING',
	widgetState: 'MAXIMIZED',
	chatService: 'botEngine',
	rate: 'none',
}

export default createReducer(initialState, {
	[chatActionTypes.CHAT_STARTED](state) {
		return {
			...state,
			chatState: 'CHATTING',
			chatService: 'LiveChat',
		}
	},
	[chatActionTypes.CHANGE_CHAT_SERVICE](state, { payload }) {
		return {
			...state,
			chatService: payload.chatService,
		}
	},
	[chatActionTypes.CHAT_ENDED](state) {
		return {
			...state,
			chatState: 'ENDED',
		}
	},
	[chatActionTypes.CHAT_RATED](state, { payload }) {
		return {
			...state,
			rate: payload.rate || state.rate,
		}
	},
	[chatActionTypes.RATE_GOOD](state, { payload }) {
		return {
			...state,
			rate: 'good',
		}
	},
	[chatActionTypes.RATE_BAD](state, { payload }) {
		return {
			...state,
			rate: 'bad',
		}
	},
})

export const getChatState = state => state.app.chatState
export const getWidgetState = state => state.app.widgetState
export const getChatService = state => state.app.chatService
export const getRate = state => state.app.rate
