import {combineReducers} from 'redux';
import auth from './auth';
import locations from './locations';
import gameList from './gameList';
import scoreList from './scoreList';
import comment from './comment';
import category from './category';
import vendor from './vendor';
import iklan from './iklan';
import saldo from './saldo';
import like from './like';

export default combineReducers({
    auth,
    locations,
    gameList,
    scoreList,
    comment,
    category,
    vendor,
    iklan,
    saldo,
    like
})
