import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Appnavigator from './src/navigations/AppNavigator';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store/store';
import SplashScreen from 'react-native-splash-screen';

export default class App extends Component {
    state = {
        theme: 'light'
    }
    
    componentDidMount() {
        SplashScreen.hide()
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