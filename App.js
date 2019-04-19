import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Appnavigator from './src/navigations/AppNavigator';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store/store';

export default class App extends Component {
    state = {
        theme: 'light'
    }

    dark = () => this.setState({ theme: 'dark'});
    light = () => this.setState({ theme: 'light'});

    render() {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <Appnavigator
                        screenProps={{ 
                            theme: this.state.theme,
                            dark: this.dark,
                            light: this.light
                        }}
                    />
                </PersistGate>
            </Provider>
        );
    }
}