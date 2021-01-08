import {all} from 'redux-saga/effects';
import authSaga from './auth';
import locationSaga from './location';
import gameListSaga from './gameList';
import scoreListSaga from './scoreListGame';
import commentGamesSaga from './commentGame';
import categorySaga from './category';
import vendorSaga from './vendor';
import iklanSaga from './iklan';
import saldoSaga from './saldo';
import likeSaga from './like';

export default function* rootSaga() {
  yield all([
    authSaga(), 
    locationSaga(), 
    gameListSaga(), 
    scoreListSaga(), 
    commentGamesSaga(),
    categorySaga(),
    vendorSaga(),
    iklanSaga(),
    saldoSaga(),
    likeSaga()
  ]);
}
