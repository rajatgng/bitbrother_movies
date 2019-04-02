import { combineReducers } from "redux";
import auth from './auth_reducer';
import movie from './movies_reducers';
export default combineReducers({
    auth,
    movie
});