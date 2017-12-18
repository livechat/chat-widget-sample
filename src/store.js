import { applyMiddleware, createStore, compose } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import createSagaMiddleware from 'redux-saga'
import events from './reducers/events'
import users from './reducers/users'
import app from './reducers/app'

const config = {
	key: 'root',
	storage,
}

const reducer = persistCombineReducers(config, {
	app,
	events,
	users,
})

const sagaMiddleware = createSagaMiddleware()

const composeCreateStore = () =>
	compose(applyMiddleware(sagaMiddleware), window.devToolsExtension ? window.devToolsExtension() : fn => fn)(
		createStore,
	)

const configureStore = port => {
	const finalCreateStore = composeCreateStore(port)
	const store = {
		...finalCreateStore(reducer),
		runSaga: sagaMiddleware.run,
	}

	// if (module.hot) {
	// 	module.hot.accept('./reducers', () => store.replaceReducer(reducer))
	// }
	const persistor = persistStore(store)
	return { persistor, store }
}

export default configureStore
