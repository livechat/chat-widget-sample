import * as actionTypes from '../constants/chatActionTypes'
export const newMessage = ({ id, authorId, customId, text, buttons, title, imageUrl, timestamp }) => ({
	type: actionTypes.NEW_MESSAGE,
	payload: {
		id,
		authorId,
		customId,
		text,
		buttons,
		title,
		imageUrl,
		timestamp,
	},
})

export const sendMessage = ({ text, customId }) => ({
	type: actionTypes.SEND_MESSAGE,
	payload: {
		text,
		customId: customId || String(Math.random()),
		timestamp: new Date(),
	},
})

export const newUser = ({ id, name, email, avatarUrl }) => ({
	type: actionTypes.NEW_USER,
	payload: {
		id,
		name,
		email,
		avatarUrl,
	},
})

export const ownDataReceived = ({ id }) => ({
	type: actionTypes.OWN_DATA_RECEIVED,
	payload: {
		id,
	},
})

export const chatEnded = () => ({
	type: actionTypes.CHAT_ENDED,
})

export const chatStarted = ({ chatId }) => ({
	type: actionTypes.CHAT_STARTED,
	payload: {
		chatId,
	},
})

export const changeChatService = ({ chatService }) => ({
	type: actionTypes.CHANGE_CHAT_SERVICE,
	payload: {
		chatService,
	},
})

export const rateGood = () => ({
	type: actionTypes.RATE_GOOD,
})

export const rateBad = () => ({
	type: actionTypes.RATE_BAD,
})

export const chatRated = ({ rate }) => ({
	type: actionTypes.CHAT_RATED,
	payload: {
		rate,
	},
})
