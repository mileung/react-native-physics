import { combineReducers } from 'redux';
import {
  SET_POSITION,
  SET_VELOCITY,
  setPosition,
  setVelocity
} from '../action/index.js';

const rootReducer = combineReducers({
  state: (state = {}) => state
});

function setPositionReducer(state = {x: 0, y: 0}, action) {
  switch (action.type) {
    case SET_POSITION:
      return action.payload;
    default:
      return state;
  }
}

function setVelocityReducer(state = {x: 0, y: 0}, action) {
  switch (action.type) {
    case SET_VELOCITY:
      return action.payload;
    default:
      return state;
  }
}


export default rootReducer;
