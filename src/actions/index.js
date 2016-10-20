const SET_POSITION = 'SET_POSITION';
const SET_VELOCITY = 'SET_VELOCITY';
const CREATE_BOX = 'CREATE_BOX';


function setPosition(interactee, position) {
  return {
    type: SET_POSITION,
    payload: {
      interactee,
      position
    }
  };
}

function setVelocity(interactee, velocity) {
  return {
    type: SET_VELOCITY,
    payload: {
      interactee,
      velocity
    }
  };
}

function createBox(interactee, box) {
  return {
    type: CREATE_BOX,
    payload: {
      interactee,
      box
    }
  };
}

export {
  SET_POSITION,
  SET_VELOCITY,
  CREATE_BOX,
  setPosition,
  setVelocity,
  createBox
};
