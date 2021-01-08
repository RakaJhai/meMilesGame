import {takeLatest, put, all, takeEvery} from 'redux-saga/effects';
import {apiAddComment, apiCommentDetails, apiGetComment} from '../api/getAllApi';

function* addCommentGames(action){
    try{
        const resAddComment = yield apiAddComment(action.payload)
        console.log('Res Comment', resAddComment.data)
        yield put({type: 'ADD_COMMENT_GAMES_SUCCESS', payload: resAddComment.data})
        yield put({type: 'GET_GML'});
        console.log('Successs add comment')
    }
    catch(err){
        console.log('Saga add Comment', err)

        yield put({type: 'ADD_COMMENT_GAMES_FAILED'});
    }
}

function* getCommentGames(action){
    try{
        // console.log('get comment start')
        // console.log('action payload saga get comm', action.payload)
        const dataMapping = action.payload.map(item => parseInt(item.gamesid))
        // console.log('action payload mapping saga get comm', dataMapping)
        
        const resGetCommet = yield apiGetComment(dataMapping);

        // yield all

        // console.log('get comment res', resGetCommet.data)

        yield put({type: 'GET_COMMENT_GAMES_SUCCESS', payload: resGetCommet.data})
        
        // console.log('get comment endt')
    }
    catch(err){
        yield put({type: 'GET_COMMENT_GAMES_FAILED'})
    }
}

function* detailsComment(action){
    try{

        // console.log("Action payload saga details", action.payload)
        const resDetails = yield apiCommentDetails(action.payload);

        // console.log("res details saga", resDetails.data)
        yield put({type: 'DETAILS_COMMENT_SUCCESS', payload: resDetails.data})
    }
    catch(err){
        // console.log('Error get comment details', err);
        yield put({type: 'DETAILS_COMMENT_FAILED'})
    }
}

function* commentGamesSaga(){
    yield takeLatest('ADD_COMMENT_GAMES', addCommentGames);
    yield takeEvery('GET_COMMENT_GAMES', getCommentGames);
    yield takeLatest('DETAILS_COMMENT', detailsComment)
}

export default commentGamesSaga;