import {takeLatest, put} from 'redux-saga/effects';
import {apiScoresList} from '../api/getAllApi';

function* getScoreList(action){
    try{
        // console.log('score list saga', action.payload)

        /* Menjalankan api (fungsi axios di ../api/getAllApi) yang mengambil data score list */
        const resScoreList = yield apiScoresList(action.payload)

        // console.log("res score list", resScoreList.data)
       
        // console.log("res score list", resScoreList.data)

        /*Mengurutkan data score dari max->min dan mengirim datanya ke reducer */
        if(resScoreList.data.length > 0){
            resScoreList.data.sort(function(a, b) {
                return b.gamepoint - a.gamepoint;
            })
            yield put({type: 'GET_SCORELIST_SUCCESS', payload: resScoreList.data})
            
        }
    }
    catch(err){

        yield put({type: 'GET_SCORELIST_FAILED'})
        // console.log('error get score list', err)
    }
}

function* scoreListSaga(){
    yield takeLatest('GET_SCORELIST', getScoreList)
}

export default scoreListSaga;