import {
    MOVIEDESC_CHANGED,
    MOVIEGENRE_CHANGED,
    MOVIELANG_CHANGED,
    MOVIENAME_CHANGED,
    MOVIEYEAR_CHANGED,
    MOVIE_ADDED
  } from './types';
  import firebase from 'firebase';
  //var uuid = require('react-native-uuid');
  const UUID = require("uuid-v4");
  export const movieNameChanged = (text) => {
    return {
      type: MOVIENAME_CHANGED,
      payload: text
    };
  };
  export const movieYearChanged = (text) => {
    return {
      type: MOVIEYEAR_CHANGED,
      payload: text
    };
  };

  export const movieDescChanged = (text) => {
    return {
      type: MOVIEDESC_CHANGED,
      payload: text
    };
  };
  export const movieGenreChanged = (text) => {
    return {
      type: MOVIEGENRE_CHANGED,
      payload: text
    };
  };
  export const movieLangChanged = (text) => {
    return {
      type: MOVIELANG_CHANGED,
      payload: text
    };
  };
  export const movieAdded =  ({name,year,genre,desc,lang}) =>  async dispatch => {

    const { currentUser } = firebase.auth(); 
    const uuid = UUID();;
    firebase.database().ref(`Users/${currentUser.uid}/movies/${uuid}/`).set({
        name,
        year,
        genre,
        desc,
        lang
        }).then((data)=>{
        console.log("movie added successfully");
        dispatch({ type: MOVIE_ADDED });
        }).catch((error)=>{
            console.log('error ' , error)
        })
  };