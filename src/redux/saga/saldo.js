import {takeLatest, put} from 'redux-saga/effects';
import {apiAddTopUp} from '../api/getAllApi';

function* addSaldo(action){
    try{
        console.log('start')
        const resAddTopUp = yield apiAddTopUp(action.payload);
        console.log('Ress add Topup saga', resAddTopUp.data)
        yield put({type: 'ADD_SALDO_SUCCESS', payload: resAddTopUp.data});
    }
    catch(err){
        console.log('Error add TopUP', JSON.stringify(err))
        yield put({type: 'ADD_SALDO_FAILED'})
    }
}

function* saldoSaga(){
    yield takeLatest('ADD_SALDO', addSaldo)
}

export default saldoSaga;