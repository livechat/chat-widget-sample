import { connect } from 'react-redux'
import App from '../components/App'
import { getEvents } from '../reducers/events'
import { getUsers, getOwnId, getCurrentAgent } from '../reducers/users'
import { getRate, getChatState } from '../reducers/app'
import { sendMessage, rateGood, rateBad } from '../actions/chatActions'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const parseTimestamp = timestamp => {
	const date = new Date(timestamp)
	return `${ date.getDate() } ${ months[date.getMonth()] } ${ date.getHours() }:${ date.getMinutes() }`
}

const parseMessages = messages =>
	messages
		.map(message => ({
			...message,
			parsedDate: parseTimestamp(message.timestamp),
		}))
		.reduce(
			(result, current) => {
				const previous = result[result.length - 1]
				if (!previous.length || previous[previous.length - 1].authorId === current.authorId) {
					result[result.length - 1].push(current)
					return result
				}
				result.push([current])
				return result
			},
			[[]],
		)

const mapStateToProps = state => {
	return {
		events: parseMessages(getEvents(state)),
		users: getUsers(state),
		ownId: getOwnId(state),
		currentAgent: getCurrentAgent(state),
		rate: getRate(state),
		chatState: getChatState(state),
	}
}

const mapDispatchToProps = dispatch => ({
	onMessageSend: data => {
		dispatch(
			sendMessage({
				text: data,
			}),
		)
	},
	sendMessage: text =>
		dispatch(
			sendMessage({
				text,
			}),
		),
	rateGood: () => {
		dispatch(rateGood())
	},
	rateBad: () => {
		dispatch(rateBad())
	}
})

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)
export default AppContainer
