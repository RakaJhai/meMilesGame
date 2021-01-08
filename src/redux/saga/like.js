import {takeLatest, put} from 'redux-saga/effects';
import { getAccountId } from '../api/asyncstorage';
import {apiLike, apiGetLike} from '../api/getAllApi';

function* addLike(action){
    try{
        const id = yield getAccountId();
        action.payload = {
            ...action.payload,
            customerid: id
        }
        const resAddLike = yield apiLike(action.payload)

        yield put({type: 'ADD_LIKE_SUCCESS', payload: resAddLike.data})
        yield put({type: 'GET_LIKE'});
    }
    catch(err){
        yield put({type: 'ADD_LIKE_FAILED'})
    }
}

function* getLike(action){
    try{
        const id = yield getAccountId();
        // console.log('Action payload saga get like', action.payload);
        action.payload = {
            ...action.payload,
            customerid: id
        }
        // console.log('Action payload saga get like 1', action.payload);
        const resGetLike = yield apiGetLike(action.payload)

        // console.log('Res get like saga', resGetLike.data)
        yield put({type: 'GET_LIKE_SUCCESS', payload: resGetLike.data})

        // console.log("like saga end")
    }
    catch(err){
        yield put({type: 'GET_LIKE_FAILED'})
    }
}

function* likeSaga(){
    yield takeLatest('ADD_LIKE', addLike);
    yield takeLatest('GET_LIKE', getLike);

}

export default likeSaga;