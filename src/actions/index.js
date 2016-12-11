const SET_POSITION_AND_VELOCITY = 'SET_POSITION_AND_VELOCITY';
const SET_BOX_SIZE = 'SET_BOX_SIZE';
const SET_CONTAINER_SIZE = 'SET_CONTAINER_SIZE';
const COLLIDE = 'COLLIDE';

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

function setContainerSize(width, height) {
  return {
    type: SET_CONTAINER_SIZE,
    payload: {
      width,
      height
    }
  };
}

function collide(id1, position1, velocity1, id2, position2, velocity2) {
  return {
    type: COLLIDE,
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

export {
  SET_POSITION_AND_VELOCITY,
  SET_BOX_SIZE,
  SET_CONTAINER_SIZE,
  COLLIDE,
  setPositionAndVelocity,
  setBoxSize,
  setContainerSize,
  collide
};
