import {combineReducers} from 'redux';

import alertReducer from './alert';
import auth from './auth';
import profile from './profile';
import post from './posts';

export default combineReducers({

    alertReducer,
    auth,
    profile,
    post

})