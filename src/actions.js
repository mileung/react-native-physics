const SET_POSITION_AND_VELOCITY = 'SET_POSITION_AND_VELOCITY';
const SET_BOX_SIZE = 'SET_BOX_SIZE';
const COLLIDE_BOXES = 'COLLIDE_BOXES';
const RESET = 'RESET';

function setPositionAndVelocity(interactee, position, velocity) {
  return {
    type: SET_POSITION_AND_VELOCITY,
    payload: {
      interactee,
      position,
      velocity
    }
  }
}

function setBoxSize(interactee, layout) {
  return {
    type: SET_BOX_SIZE,
    payload: {
      interactee,
      width: layout.width,
      height: layout.height
    }
  };
}

function collideBoxes(id1, position1, velocity1, id2, position2, velocity2) {
  return {
    type: COLLIDE_BOXES,
    payload: {
      id1,
      position1,
      velocity1,
      id2,
      position2,
      velocity2
    }
  };
}

function reset() {
  return {
    type: RESET,
    payload: null
  }
}

export {
  SET_POSITION_AND_VELOCITY,
  SET_BOX_SIZE,
  COLLIDE_BOXES,
  RESET,
  setPositionAndVelocity,
  setBoxSize,
  collideBoxes,
  reset
};
