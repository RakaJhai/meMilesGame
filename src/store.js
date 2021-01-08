import {applyMiddleware, createStore} from 'redux';
import rootReducer from './redux/reducer/index';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './redux/saga/index';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

export default store;