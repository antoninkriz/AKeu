import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';

// Reducers
import uiReducer from './reducers/uiReducer'

const initialState = {};
const middlewares = [thunk];

const reducers = combineReducers({
  ui: uiReducer
});

// React DevTools extension
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?? undefined;
const addReactDevTools = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const enhancer = addReactDevTools(applyMiddleware(...middlewares));
const store = createStore(reducers, initialState, enhancer);

export default store;