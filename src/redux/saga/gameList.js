import {takeLatest, put} from 'redux-saga/effects';
import {apiGameList} from '../api/getAllApi';

function* getGameList(action){
    try{
        const resGameList = yield apiGameList();
        yield put({type: 'GET_GML_SUCCESS', payload: resGameList.data})
        yield put({type: 'GET_COMMENT_GAMES'})
        yield put({type: 'GET_SCORELIST'})
        yield put({type: 'GET_CATEGORY'})
        yield put({type: 'GET_CITY'});
        yield put({type: 'GET_PROVINCE'})
    }
    catch(err){
        yield put({type: 'GET_GML_FAILED'})
    }
}


function* gameListSaga(){
    yield takeLatest('GET_GML', getGameList);
}

export default gameListSaga;