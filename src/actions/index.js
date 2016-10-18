const SET_POSITION = 'SET_POSITION'
const SET_VELOCITY = 'SET_VELOCITY'


function setPosition(position) {
  return {
    type: SET_POSITION,
    payload: position
  };
}

function setVelocity(velocity) {
  return {
    type: SET_VELOCITY,
    payload: velocity
  };
}

export {
  SET_POSITION,
  SET_VELOCITY,
  setPosition,
  setVelocity
};
