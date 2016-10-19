import { combineReducers } from 'redux';
import {
  SET_POSITION,
  SET_VELOCITY,
  setPosition,
  setVelocity
} from '../actions/index.js';

const rootReducer = combineReducers({
  interactees: setBoxReducer
});

function setBoxReducer(state = {}, action) {
  // console.log('ACTION', action);
  switch (action.type) {
    case SET_POSITION:
      return {
        ...state,
        [action.payload.interactee]: {
          ...state[action.payload.interactee],
          position: action.payload.position
        }
      };
    case SET_VELOCITY:
      return {
        ...state,
        [action.payload.interactee]: {
          ...state[action.payload.interactee],
          velocity: action.payload.velocity
        }
      };
    default:
      return state;
  }
}


export default rootReducer;
