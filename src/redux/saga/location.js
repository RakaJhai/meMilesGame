import {takeLatest, put} from 'redux-saga/effects';
import {apiCity, apiLogin, apiProvince} from '../api/getAllApi';
import {removeToken, saveAccountId, saveToken} from '../api/asyncstorage';

function* getProvince(action){
    try{
        const resProvince = yield apiProvince();
        // console.log("res provincer", resProvince.data.data);
        yield put({type: 'GET_PROVINCE_SUCCESS', payload: resProvince.data.data})
        yield put({type: 'GET_CITY'});

    }
    catch(err){
        yield put({type: 'GET_PROVINCE_FAILED'})
        console.log('Error get province : ', err)
    }
}

function* getCity(action){
    try{
        const resCity = yield apiCity();

        yield put({type: 'GET_CITY_SUCCESS', payload: resCity.data.data})
    }
    catch(err){
        yield put({type: 'GET_CITY_FAILED'})
        console.log('Erro get city : ', err)
    }
}

function* locationSaga(){
    yield takeLatest('GET_PROVINCE', getProvince);
    yield takeLatest('GET_CITY', getCity);
}

export default locationSaga;