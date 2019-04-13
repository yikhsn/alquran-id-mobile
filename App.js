import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './src/store/reducer';
import Appnavigator from './src/navigations/AppNavigator';

const store = createStore(reducer);

export default class App extends Component {
    state = {
        theme: 'light'
    }

    dark = () => this.setState({ theme: 'dark'});
    light = () => this.setState({ theme: 'light'});

    render() {
        return (
            <Provider store={store}>
                <Appnavigator
                    screenProps={{ 
                        theme: this.state.theme,
                        dark: this.dark,
                        light: this.light
                    }}
                />
            </Provider>
        );
    }
}