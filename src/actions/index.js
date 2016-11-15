const SET_INITIAL_POSITION_AND_VELOCITY = 'CREATE_BOX';
const SET_POSITION_AND_VELOCITY = 'SET_POSITION_AND_VELOCITY';
const SET_BOX_SIZE = 'SET_BOX_SIZE';
const SET_CONTAINER_SIZE = 'SET_CONTAINER_SIZE';

function setInitialPositionAndVelocity(interactee, positionAndVelocity) {
  return {
    type: SET_INITIAL_POSITION_AND_VELOCITY,
    payload: {
      interactee,
      positionAndVelocity
    }
  };
}

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

function setBoxSize(interactee, width, height) {
  return {
    type: SET_BOX_SIZE,
    payload: {
      interactee,
      width,
      height
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

export {
  SET_INITIAL_POSITION_AND_VELOCITY,
  SET_POSITION_AND_VELOCITY,
  SET_BOX_SIZE,
  SET_CONTAINER_SIZE,
  setInitialPositionAndVelocity,
  setPositionAndVelocity,
  setBoxSize,
  setContainerSize
};
