import React, { Component } from 'react'
import Maximized from './Maximized'
import Minimized from './Minimized'
import { ThemeProvider, FixedWrapper, darkTheme, elegantTheme, purpleTheme, defaultTheme } from '@livechat/ui-kit'

const themes = {
    defaultTheme,
    purpleTheme,
    elegantTheme,
    darkTheme,
}

const commonThemeButton = {
    fontSize: '16px',
    padding: '1em',
    borderRadius: '1em',
    margin: '1em',
    cursor: 'pointer',
}

const themePurpleButton = {
    ...commonThemeButton,
    background: 'linear-gradient(to right, #6D5BBA, #8D58BF)',
    color: '#fff',  
}

const themeDarkButton = {
    ...commonThemeButton,
    background: 'rgba(0, 0, 0, 0.8)',
    color: '#fff',  
}

const themeDefaultButton = {
    ...commonThemeButton,
    background: '#427fe1',
    color: '#fff',  
}

const themeElegantButton = {
    ...commonThemeButton,
    background: '#000',
    color: '#D9A646',  
}


class App extends Component {
    state = {
        theme: 'defaultTheme'
    }
    
    handleThemeChange = ({ target }) => {
        console.log('target.name', target.name)
        this.setState({
            theme: target.name + 'Theme'    ,
        })
    }

    render() {
        return (
            <ThemeProvider theme={themes[this.state.theme]}>
                <div style={{
                    padding: '1em',
                }}>
                    <h1>
                        React Chat UI Kit
                    </h1>
                    <h2>Sample chat widget</h2>
                    <p>LiveChat UI Kit is set of React components to easily build nice-looking chat windows. Read <a target="_blank" href="https://docs.livechatinc.com/react-chat-ui-kit/">documentation</a> for more details.</p>
                    <h3>Change components theme:</h3>
                    <button id="theme-default" name="default" style={themeDefaultButton} onClick={this.handleThemeChange.bind(this)}>
                        default
                    </button>
                    <button id="theme-purple" name="purple" style={themePurpleButton} onClick={this.handleThemeChange.bind(this)}>
                        purple
                    </button>
                    <button id="theme-dark" name="dark" style={themeDarkButton} onClick={this.handleThemeChange.bind(this)}>
                        dark
                    </button>
                    <button id="theme-elegant" name="elegant" style={themeElegantButton} onClick={this.handleThemeChange.bind(this)}>
                        elegant
                    </button>
                    <FixedWrapper.Root maximizedOnInit>
                        <FixedWrapper.Maximized>
                            <Maximized {...this.props} />
                        </FixedWrapper.Maximized>
                        <FixedWrapper.Minimized>
                            <Minimized {...this.props} />
                        </FixedWrapper.Minimized>
                    </FixedWrapper.Root>
                </div>
			</ThemeProvider>
        )
    }
}

export default App
