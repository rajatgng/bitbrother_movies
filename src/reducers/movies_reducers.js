import {
    MOVIEDESC_CHANGED,
    MOVIEGENRE_CHANGED,
    MOVIELANG_CHANGED,
    MOVIENAME_CHANGED,
    MOVIEYEAR_CHANGED,
    MOVIE_ADDED
  } from '../actions/types';

  const INITIAL_STATE = {
    id:'',
    name:'',
    year:'',
    genre:'',
    desc:'',
    lang:'',
    image:'',
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case MOVIENAME_CHANGED:
        return { ...state, name: action.payload };
      case MOVIEDESC_CHANGED:
        return { ...state, desc: action.payload };
      case MOVIEGENRE_CHANGED:
        return { ...state, genre: action.payload };
      case MOVIELANG_CHANGED:
        return { ...state, lang: action.payload };
      case MOVIEYEAR_CHANGED:
        return { ...state, year:action.payload };
      case MOVIE_ADDED:
        return { ...state, ...INITIAL_STATE };
      default:
        return state;
    }
  };