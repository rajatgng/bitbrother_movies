import firebase from 'firebase';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAIL,
  SIGNUP_USER,
  NAME_CHANGED,
  PHONE_CHANGED,
  SIGNOUT_USER,
  MAP_LOAD
} from './types';
import { AsyncStorage } from 'react-native';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};
export const mapLoaded = (text) => {
  return {
    type: MAP_LOAD,
    payload: text
  };
};


export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};
export const nameChanged = (text) => {
  return {
    type: NAME_CHANGED,
    payload: text
  };
};

export const phoneChanged = (text) => {
  return {
    type: PHONE_CHANGED,
    payload: text
  };
};

export const loginUser =  ({ email, password }) =>  async dispatch => {
    dispatch({ type: LOGIN_USER });
    let token = await AsyncStorage.getItem('login_token');
    if(token){
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: token
      });

    }
    else{
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch((error) => loginUserFail(dispatch));
    }
  };
export const signupUser = ({ name,email,phone, password }) => {
  return (dispatch) => {
    dispatch({ type: SIGNUP_USER });

        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => {
            
            signupUserSuccess(dispatch, user,email,name,phone)
          })
          .catch(() => signupUserFail(dispatch));
  };
};

const loginUserFail = (dispatch) => {
  console.log("Login Fail..")
  dispatch({ type: LOGIN_USER_FAIL });
};

loginUserSuccess = async (dispatch, user) => {
  await AsyncStorage.setItem('login_token',user.user.uid);
  console.log("Login Suceess"+user.user.uid);
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user.user.uid
  });
};
const signupUserFail = (dispatch) => {
  console.log("signup fail");
  dispatch({ type: SIGNUP_USER_FAIL });
};

const signupUserSuccess = (dispatch, user, email, name, phone) => {
  
  const { currentUser } = firebase.auth();  
  firebase.database().ref(`Users/${currentUser.uid}/`).set({
    email,
    name,
    phone
    }).then((data)=>{
    console.log('data ' , data)
    console.log("Signup success")
dispatch({
  type: SIGNUP_USER_SUCCESS,
  payload: user.user.uid
});
    }).catch((error)=>{
    console.log('error ' , error)
})

};


export const signoutUser =  () => {
  return (dispatch) => {
    // const {currentUser} = firebase.auth();
    firebase.auth().signOut().
    
    then(async ()=>{
     await removeData();
  console.log("signout suucess");
  dispatch({ type: SIGNOUT_USER });
    }).
    catch((error)=>{
      console.log(error);
       
    });
  };
};
removeData = async () => {
  try{
  await AsyncStorage.removeItem('login_token');
  }
  catch(error){

  }
 
};
