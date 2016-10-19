const SET_POSITION = 'SET_POSITION'
const SET_VELOCITY = 'SET_VELOCITY'


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

export {
  SET_POSITION,
  SET_VELOCITY,
  setPosition,
  setVelocity
};
