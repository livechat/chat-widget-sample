import fetch from 'unfetch'
import { init } from '@livechat/livechat-visitor-sdk'
import { call, takeEvery, fork, select, put, take, all } from 'redux-saga/effects'
import { REHYDRATE, PURGE } from 'redux-persist'
import { getChatService } from '../reducers/app'
import {
	newMessage,
	newUser,
	ownDataReceived,
	chatEnded,
	chatStarted,
	changeChatService,
	sendMessage,
	chatRated,
} from '../actions/chatActions'
import * as actionTypes from '../constants/chatActionTypes'
import { getEvents } from '../reducers/events'
import { getUsers, getOwnId } from '../reducers/users'

const botEngineClientToken = process.env.REACT_APP_BOTENGINE_CLIENT_TOKEN
const sessionId = String(Math.random())

const sendQueryToBotEngine = query =>
	fetch('https://api.botengine.ai/query', {
		headers: {
			authorization: `Bearer ${ botEngineClientToken }`,
			'Content-Type': 'application/json',
		},
		method: 'POST',
		body: JSON.stringify({
			sessionId: sessionId,
			query: query,
			storyId: process.env.REACT_APP_BOTENGINE_STORY_ID,
		}),
	}).then(response => response.json())

function* transferToLiveChat() {
	const events = yield select(getEvents)
	const users = yield select(getUsers)
	const ownId = yield select(getOwnId)
	const parsedEvents = events
		.map(event => {
			const userName = (users[event.authorId] && users[event.authorId].name) || users[ownId].name
			const text = event.text || event.title
			return `${ userName }: ${ text }`
		})
		.join(' \n')
	yield put(
		changeChatService({
			chatService: 'LiveChat',
		}),
	)
	yield put(
		sendMessage({
			customId: 'VISITOR_CHAT_HISTORY',
			text: parsedEvents,
		}),
	)
}

function* handleSendMessage(sdk, { payload }) {
	const chatService = yield select(getChatService)
	if (chatService === 'LiveChat') {
		try {
			yield call(sdk.sendMessage, {
				customId: payload.customId,
				text: payload.text,
			})
		} catch (error) {
			console.log('> ERROR', error)
		}
		return
	}
	if (chatService === 'botEngine') {
		try {
			const botEngineResponse = yield call(sendQueryToBotEngine, payload.text)
			if (
				!botEngineResponse.result ||
				!botEngineResponse.result.fulfillment ||
				!botEngineResponse.result.fulfillment.length
			) {
				yield call(transferToLiveChat)
				return
			}
			const messagesToAdd = botEngineResponse.result.fulfillment.map(fulfillmentItem => {
				const message = {
					id: Math.random(),
					authorId: 'bot',
				}
				if (fulfillmentItem.message) {
					message.text = fulfillmentItem.message
				}
				if (fulfillmentItem.buttons) {
					message.buttons = fulfillmentItem.buttons
				}
				if (fulfillmentItem.title) {
					message.title = fulfillmentItem.title
				}
				if (fulfillmentItem.imageUrl) {
					message.imageUrl = fulfillmentItem.imageUrl
				}
				if (fulfillmentItem.replies) {
					message.buttons = fulfillmentItem.replies.map(reply => ({
						title: reply,
					}))
				}
				if (botEngineResponse.timestamp) {
					message.timestamp = botEngineResponse.timestamp
				}
				return newMessage(message)
			})
			yield all(messagesToAdd.map(action => put(action)))
			if (botEngineResponse.result.interaction.action === 'livechat.transfer') {
				yield call(transferToLiveChat)
			}
		} catch (error) {
			console.log('>> BOTENGINEERROR', error)
			yield call(transferToLiveChat)
		}
	}
}

function* handleRateGood(sdk) {
	yield call(sdk.rateChat, {
		rate: 'good',
	})
}

function* handleRateBad(sdk) {
	yield call(sdk.rateChat, {
		rate: 'bad',
	})
}

function* handleCallbacks(store) {
	const sdk = init({
		license: process.env.REACT_APP_LIVECHAT_LICENSE,
	})
	sdk.on('new_message', data => {
		store.dispatch(newMessage(data))
	})
	sdk.on('agent_changed', data => {
		store.dispatch(newUser(data))
	})
	sdk.on('visitor_data', data => {
		store.dispatch(ownDataReceived(data))
	})
	sdk.on('chat_ended', () => {
		console.log('>chat_ended')
		store.dispatch(chatEnded())
	})
	sdk.on('chat_started', data => {
		store.dispatch(chatStarted(data))
	})
	sdk.on('status_changed', data => {
		console.log('> status_changed', data)
	})
	sdk.on('visitor_queued', data => {
		console.log('> visitor_queued', data)
	})
	sdk.on('typing_indicator', data => {
		console.log('> typing_indicator', data)
	})
	sdk.on('connection_status_changed', data => {
		console.log('> connection_status_changed', data)
	})
	sdk.on('chat_rated', data => {
		store.dispatch(chatRated({
			rate: data.rate,
		}))
	})

	yield takeEvery(actionTypes.SEND_MESSAGE, handleSendMessage, sdk)
	yield takeEvery(actionTypes.RATE_GOOD, handleRateGood, sdk)
	yield takeEvery(actionTypes.RATE_BAD, handleRateBad, sdk)
}

const getPersistSelector = state => state._persist && state._persist.rehydrated

export default function*(store) {
	if (!getPersistSelector) {
		yield take(REHYDRATE)
	}
	yield fork(handleCallbacks, store)
}
