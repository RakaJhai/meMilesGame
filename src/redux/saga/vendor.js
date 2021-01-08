import {takeLatest, put} from 'redux-saga/effects';
import {apiAddVendor, apiGetVendor} from '../api/getAllApi';

function* addVendor(action){
    try{
        console.log('Action saga addVendor', action.payload)
        const resAddVendor = yield apiAddVendor(action.payload)

        console.log('Re add vendor', resAddVendor.data)
        yield put({type: 'ADD_VENDOR_SUCCESS', payload: resAddVendor.data})
    }
    catch(err){
        console.log('Error add Vendor', err)

        yield put({type: 'ADD_VENDOR_FAILED'})
    }
}

function* getvendor(action){
    try{
        console.log("saga Get vendor", action.payload)
        const resGetVendor = yield apiGetVendor(action.payload)
        console.log("Respon get vEndor saga", resGetVendor)
        yield put({type: 'GET_VENDOR_SUCCESS', payload: resGetVendor.data})
    }
    catch(err){
        console.log("Erro Get vendor", err);
        yield put({type: 'GET_VENDOR_FAILED'})
    }
}
function* vendorSaga(){
    yield takeLatest('ADD_VENDOR', addVendor);
    yield takeLatest('GET_VENDOR', getvendor);
}

export default vendorSaga;