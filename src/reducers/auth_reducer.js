import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    SIGNUP_USER_SUCCESS ,
    SIGNUP_USER_FAIL ,
    SIGNUP_USER,
    PHONE_CHANGED,
    NAME_CHANGED,
    SIGNOUT_USER,
    MAP_LOAD
  } from '../actions/types';
//import console = require('console');
  
  const INITIAL_STATE = {
    name:'',
    email: '',
    password: '',
    phone:'',
    token:'',
    error: '',
    loading: false,
    test:'test',
    map:false
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case MAP_LOAD:
      return { ...state, map:action.payload };
      case EMAIL_CHANGED:
        return { ...state, email: action.payload };
      case PASSWORD_CHANGED:
        return { ...state, password: action.payload };
      case NAME_CHANGED:
        return { ...state, name: action.payload };
      case PHONE_CHANGED:
        return { ...state, phone: action.payload };
      case LOGIN_USER:
        return { ...state, loading: true, error: '' };
      case LOGIN_USER_SUCCESS:
        return { ...state, ...INITIAL_STATE, token: action.payload, };
      case LOGIN_USER_FAIL:
        return { ...state, error: 'Either e-mail or password is wrong.', password: '', loading: false };
      case SIGNUP_USER:
        return { ...state, loading: true, error: '' };
      case SIGNUP_USER_SUCCESS:
        return { ...state, ...INITIAL_STATE, token: action.payload };
      case SIGNUP_USER_FAIL:
        return { ...state, error: 'Something Went Wrong?Try Later', password: '', loading: false };
      case SIGNOUT_USER:
        return { ...state, ...INITIAL_STATE,};
      default:
        return state;
    }
  };