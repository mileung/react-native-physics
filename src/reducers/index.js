import { combineReducers } from 'redux';
import {
  CREATE_BOX,
  SET_POSITION,
  SET_VELOCITY,
  SET_BOX_SIZE,
  SET_REBOUND_RATE
} from '../actions/index.js';

const rootReducer = combineReducers({
  boxes: updateBoxReducer
});

function updateBoxReducer(state = null, action) {
  // console.log('ACTION', action);
  switch (action.type) {
    case CREATE_BOX:
      return {
        ...state,
        [action.payload.interactee]: action.payload.box
      };
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
    case SET_BOX_SIZE:
      return {
        ...state,
        [action.payload.interactee]: {
          ...state[action.payload.interactee],
          height: action.payload.height,
          width: action.payload.width
        }
      };
    case SET_REBOUND_RATE:
      return {
        ...state,
        [action.payload.interactee]: {
          ...state[action.payload.interactee],
          reboundRate: action.payload.reboundRate
        }
      };
    default:
      return state;
  }
}

export default rootReducer;
