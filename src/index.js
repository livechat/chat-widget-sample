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
			<ThemeProvider
				theme={{
					colors: {
						tertiary: 'rgba(0,0,0,.65)',
					},
					components: {
						AgentBar: {
							css: {
								borderBottom: 0,
								color: '#fff',
								background: 'rgba(0,0,0,.65)',
							},
						},
						Avatar: {
							css: {},
						},
						Message: {
							secondaryTextColor: '#fff',
						},
						OwnMessage: {
							secondaryTextColor: '#fff',
						},
						TitleBar: {
							css: {
								background: 'rgba(0,0,0,.65)',
								borderRadius: '.5em .5em 0 0',
								fontWeight: 'bold',
							},
						},
						FixedWrapperMaximized: {
							css: {
								border: 0,
								boxShadow: '0 0 2em rgba(0, 0, 0, 0.3)',
								borderRadius: '.5em',
								overflow: 'hidden',
							},
						},
					},
				}}
			>
				<FixedWrapper.Root>
					<FixedWrapper.Maximized>
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
