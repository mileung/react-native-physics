import { combineReducers } from 'redux';
import {
  CREATE_BOX,
  // SET_POSITION,
  // SET_VELOCITY,
  SET_BOX_SIZE,
  SET_CONTAINER_SIZE,
  SET_REBOUND_RATE,
  SET_POSITION_AND_VELOCITY
} from '../actions/index.js';

const rootReducer = combineReducers({
  boxes: updateBoxReducer,
  container: setContainerSizeReducer
});

function updateBoxReducer(state = null, action) {
  // console.log('ACTION', action);
  switch (action.type) {
    case SET_POSITION_AND_VELOCITY:
      return {
        ...state,
        [action.payload.interactee]: {
          ...state[action.payload.interactee],
          position: action.payload.position,
          velocity: action.payload.velocity
        }
      };
    case CREATE_BOX:
      return {
        ...state,
        [action.payload.interactee]: action.payload.box
      };
    // case SET_POSITION:
    //   return {
    //     ...state,
    //     [action.payload.interactee]: {
    //       ...state[action.payload.interactee],
    //       position: action.payload.position
    //     }
    //   };
    // case SET_VELOCITY:
    //   return {
    //     ...state,
    //     [action.payload.interactee]: {
    //       ...state[action.payload.interactee],
    //       velocity: action.payload.velocity
    //     }
    //   };
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

function setContainerSizeReducer(state = {width: 0, height: 0}, action) {
  switch (action.type) {
    case SET_CONTAINER_SIZE:
      return {
        width: action.payload.width,
        height: action.payload.height
      };
      break;
    default:
      return state;
  }
}

export default rootReducer;
