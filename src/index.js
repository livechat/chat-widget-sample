import React from 'react'
import { render } from 'react-dom'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { Provider } from 'react-redux'
import configureStore from './store'
import rootSaga from './sagas'
import { ThemeProvider, FixedWrapper } from '@livechat/ui-kit'
import AppContainer from './containers/AppContainer'
import Minimized from './components/Minimized'

const { store, persistor } = configureStore()
store.runSaga(rootSaga, store)

const root = document.getElementById('root')

render(
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<ThemeProvider>
				<FixedWrapper.Root>
					<FixedWrapper.Maximized style={{
						boxShadow: '0 0 1em rgba(0, 0, 0, 0.2)',
					}}>
						<AppContainer />
					</FixedWrapper.Maximized>
					<FixedWrapper.Minimized>
						<Minimized />
					</FixedWrapper.Minimized>
				</FixedWrapper.Root>
			</ThemeProvider>
		</PersistGate>
	</Provider>,
	root,
)
