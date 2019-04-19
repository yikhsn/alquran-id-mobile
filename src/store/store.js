import { AsyncStorage } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import appReducer from './reducers/mainReducer';
import themeReducer from './reducers/themeReducer';

const defaultReducer = combineReducers({ 
    rdc: appReducer, 
    theme: themeReducer 
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['theme'],
}

const middlewares = [];

const persistedReducer = persistReducer(persistConfig, defaultReducer);

export const store = createStore(
    persistedReducer,
    undefined,
    applyMiddleware(...middlewares)
);

export const persistor = persistStore(store);