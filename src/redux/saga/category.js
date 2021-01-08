import {takeLatest, put} from 'redux-saga/effects';
import { apiGetKategori } from '../api/getAllApi';

function* getKategori(action){
    try{
        const resCategory = yield apiGetKategori();

        yield put({type: 'GET_CATEGORY_SUCCESS', payload: resCategory.data})

        // console.log('Res category saga', resCategory.data.data)
    }
    catch(err){
        yield put({type: 'GET_CATEGORY_FAILED'})
    }
}

function* categorySaga(){
   yield takeLatest('GET_CATEGORY', getKategori)
}

export default categorySaga;