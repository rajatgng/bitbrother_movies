import {
    MOVIEDESC_CHANGED,
    MOVIEGENRE_CHANGED,
    MOVIELANG_CHANGED,
    MOVIENAME_CHANGED,
    MOVIEYEAR_CHANGED,
    MOVIE_ADDED,
    FETCH_MOVIES,
    FETCH_COMMENT,
    COMMENT_ADDED,
    COMMENTTEXT_CHANGED
  } from '../actions/types';

  const INITIAL_STATE = {
    id:'',
    name:'',
    year:'',
    genre:'',
    desc:'',
    lang:'',
    image:'',
    movies:{},
    comment:{},
    commentText:undefined
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
        return { ...state, ...INITIAL_STATE,movies:state.movies };
      case FETCH_MOVIES:
        return {...state,movies:action.payload};
      case COMMENTTEXT_CHANGED:
        return {...state,commentText:action.payload}  
      case COMMENT_ADDED:
        return { ...state,comment:state.comment }
      case FETCH_COMMENT:
        return {...state, comment:action.payload}   
      default:
        return state;
    }
  };