import {takeLatest, put} from 'redux-saga/effects';
import {apiAddIklan} from '../api/getAllApi';

function* addIklan(action){
    try{
        console.log('start')
        const resAddIklan = yield apiAddIklan(action.payload);
        // console.log('Ress add ikla saga', resAddIklan.data)
        yield put({type: 'ADD_IKLAN_SUCCESS', payload: resAddIklan.data});
        yield put({type: 'LOGIN'});
    }
    catch(err){
        console.log('Error add iklan', err)
        yield put({type: 'ADD_IKLAN_FAILED'})
    }
}

function* iklanSaga(){
    yield takeLatest('ADD_IKLAN', addIklan)
}

export default iklanSaga;