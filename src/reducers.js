import { combineReducers } from 'redux';
import {
  SET_BOX_SIZE,
  SET_POSITION_AND_VELOCITY,
  COLLIDE_BOXES,
  RESET
} from './actions';

const rootReducer = combineReducers({
  boxes: updateBoxReducer
});

function updateBoxReducer(state = {}, action) {
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
    case COLLIDE_BOXES:
      return {
        ...state,
        [action.payload.id1]: {
          ...state[action.payload.id1],
          position: action.payload.position1,
          velocity: action.payload.velocity1
        },
        [action.payload.id2]: {
          ...state[action.payload.id2],
          position: action.payload.position2,
          velocity: action.payload.velocity2
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
      case RESET:
        return {
        };
    default:
      return state;
  }
}

export default rootReducer;
