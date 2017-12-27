import React from 'react'
import { render } from 'react-dom'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { Provider } from 'react-redux'
import configureStore from './store'
import rootSaga from './sagas'
import AppContainer from './containers/AppContainer'

const { store, persistor } = configureStore()
store.runSaga(rootSaga, store)

const root = document.getElementById('root')

render(
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<AppContainer />
		</PersistGate>
	</Provider>,
	root,
)
