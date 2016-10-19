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
  switch (action.type) {
    case SET_POSITION:
      return {
        ...state,
        [action.interactee]: {
          ...inner[action.interactee],
          position: action.position
        }
      };
    case SET_VELOCITY:
      return {
        ...state,
        [action.interactee]: {
          ...inner[action.interactee],
          velocity: action.velocity
        }
      };
    default:
      return state;
  }
}


export default rootReducer;
