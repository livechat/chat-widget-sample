import { createReducer } from 'redux-create-reducer'
import * as actionTypes from '../constants/chatActionTypes'

const initialState = {
	byIds: {
		bot: {
			id: 'bot',
			name: 'Bot',
			avatarUrl:
				'https://static.staging.livechatinc.com/1520/P10064EDGF/7970c9d036275c2ee9282d15535ef57b/botengine-avatar.png',
		},
	},
	ownId: null,
	currentAgent: 'bot',
}

export default createReducer(initialState, {
	[actionTypes.NEW_USER](state, action) {
		return {
			...state,
			currentAgent: action.payload.id,
			byIds: {
				...state.byIds,
				[action.payload.id]: action.payload,
			},
		}
	},
	[actionTypes.OWN_DATA_RECEIVED](state, action) {
		return {
			...state,
			ownId: action.payload.id,
			byIds: {
				...state.byIds,
				[action.payload.id]: {
					...action.payload,
					name: 'Client',
				},
			},
		}
	},
})

export const getUsers = state => state.users.byIds
export const getOwnId = state => state.users.ownId
export const getCurrentAgent = state => state.users.byIds[state.users.currentAgent]
