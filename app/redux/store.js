import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import createSagaMiddleware, {END} from 'redux-saga';
import rootReducer from './root-reducer';
import rootSaga from './root-saga';
import thunk from 'redux-thunk';
const sagaMiddleware = createSagaMiddleware();

const bindMiddleware = middleware => applyMiddleware(...middleware);

const store = createStore(rootReducer, bindMiddleware([thunk, sagaMiddleware]));

sagaMiddleware.run(rootSaga);

export {store};
