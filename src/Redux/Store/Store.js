import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from '../Reducers/CombineReducer';

const persistedConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistedConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistedStore = persistStore(store);

export { store, persistedStore };