import { combineReducers } from 'redux';
import {
  SET_POSITION,
  SET_VELOCITY,
  CREATE_BOX,
  setPosition,
  setVelocity,
  createBox
} from '../actions/index.js';

const rootReducer = combineReducers({
  interactees: updateBoxReducer
});

function updateBoxReducer(state = null, action) {
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
    case CREATE_BOX:
      return {
        ...state,
        [action.payload.interactee]: action.payload.box
      };
    default:
      return state;
  }
}

export default rootReducer;
