const CREATE_BOX = 'CREATE_BOX';
// const SET_POSITION = 'SET_POSITION';
// const SET_VELOCITY = 'SET_VELOCITY';
const SET_POSITION_AND_VELOCITY = 'SET_POSITION_AND_VELOCITY';
const SET_BOX_SIZE = 'SET_BOX_SIZE';
const SET_CONTAINER_SIZE = 'SET_CONTAINER_SIZE';
const SET_REBOUND_RATE = 'SET_REBOUND_RATE';

function createBox(interactee, box) {
  // console.log('INTERACTEE, BOX', interactee, box);
  return {
    type: CREATE_BOX,
    payload: {
      interactee,
      box
    }
  };
}

// function setPosition(interactee, position) {
//   return {
//     type: SET_POSITION,
//     payload: {
//       interactee,
//       position
//     }
//   };
// }
//
// function setVelocity(interactee, velocity) {
//   return {
//     type: SET_VELOCITY,
//     payload: {
//       interactee,
//       velocity
//     }
//   };
// }

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
  // console.log('setContainerSize', width, height);
  return {
    type: SET_CONTAINER_SIZE,
    payload: {
      width,
      height
    }
  };
}

function setReboundRate(interactee, container, {velocity, acceleration, gravity, bounce, position, height, width}) {
  // console.log('CONTAINER', container);
  let totalAcceleration = {
    x: Math.abs(acceleration.x + gravity.x),
    y: Math.abs(acceleration.y + gravity.y)
  }
  let drop = {
    width: {
      inital: totalAcceleration.x < 0 ? position.x : container.width - position.x,
      second: totalAcceleration.x < 0 ? position.x * bounce.x : (container.width - position.x) * bounce.x
    },
    height: {
      inital: totalAcceleration.x < 0 ? position.y : container.height - position.y,
      second: totalAcceleration.x < 0 ? position.y * bounce.y : (container.height - position.y) * bounce.y
    }
  }
  // Yes, I realize there's a lot of code that can be removed here, but it's easier to read
  // because it's all part of a physics equation that I mashed together.
  // distance traveled when dropped from rest = 0.5 x gravity x time^2
  // velocity = gravity x acceleration
  // so totalAcceleration * Math.sqrt(drop.width.inital / (0.5 * totalAcceleration.x)) is
  // really gravity x time, giving you the velocity at impact.
  let impactVelocity = {
    x: {
      inital: totalAcceleration.x * Math.sqrt(Math.abs(drop.width.inital / (0.5 * totalAcceleration.x))),
      second: totalAcceleration.x * Math.sqrt(Math.abs(drop.width.second / (0.5 * totalAcceleration.x)))
    },
    y: {
      inital: totalAcceleration.y * Math.sqrt(Math.abs(drop.height.inital / (0.5 * totalAcceleration.y))),
      second: totalAcceleration.y * Math.sqrt(Math.abs(drop.height.second / (0.5 * totalAcceleration.y)))
    }
  }
  reboundRate = {
    x: impactVelocity.x.second / impactVelocity.x.inital || 0,
    y: impactVelocity.y.second / impactVelocity.y.inital || 0
  };
  // console.log('REBOUNDRATE', reboundRate);

  return {
    type: SET_REBOUND_RATE,
    payload: {
      interactee,
      reboundRate
    }
  };
}

export {
  CREATE_BOX,
  // SET_POSITION,
  // SET_VELOCITY,
  SET_POSITION_AND_VELOCITY,
  SET_BOX_SIZE,
  SET_CONTAINER_SIZE,
  SET_REBOUND_RATE,
  createBox,
  // setPosition,
  // setVelocity,
  setPositionAndVelocity,
  setBoxSize,
  setContainerSize,
  setReboundRate
};
