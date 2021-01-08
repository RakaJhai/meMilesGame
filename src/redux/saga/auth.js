import {takeLatest, put} from 'redux-saga/effects';
import {apiLogin} from '../api/getAllApi';
import {removeToken, saveAccountId, saveToken} from '../api/asyncstorage';

function* login(action){
    try{
        const resLogin = yield apiLogin(action.payload);
        
        if (resLogin && resLogin.data.data) {
            yield saveToken(resLogin.data.token);
            yield saveAccountId(resLogin.data.data.id);
      
            yield put({type: 'LOGIN_SUCCESS', payload: resLogin.data.data});
        } 
        else {
            yield put({type: 'LOGIN_FAILED'})
        }
    }catch(err){
        yield put({type: 'LOGIN_FAILED'})
    }
}

function* logout(action){
    try{
        yield removeToken();
    }catch(err){
        if (Platform.OS == 'android'){
            ToastAndroid.showWithGravity(
                'Logout Failed',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            )
        }
        console.log('Failed logout', err)
    }
}
function* authSaga(){
    yield takeLatest('LOGIN', login);
    yield takeLatest('LOGOUT', logout)
}

export default authSaga;