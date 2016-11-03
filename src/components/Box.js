import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View
} from 'react-native';
import {
  setInitialPositionAndVelocity,
  setPositionAndVelocity,
  setBoxSize
} from '../actions/index';

let timePerFrame = 1000 / 60 * 1;

class Box extends React.Component {
  constructor(props) {
    super(props);
    this.updateBox = this.updateBox.bind(this);
  }

  render() {
    if (!this.props.boxes) {
      return null;
    }

    let { children, outline } = this.props;
    let { position, height, width } = this.props.boxes[this.id];
    // console.log('THIS.PROPS.BOXES[THIS.STATE.ID]', this.props.boxes[this.id]);

    return (
      <View
        style={{
          position: 'absolute',
          borderWidth: outline ? 1 : 0,
          borderColor: outline === true ? 'red' : outline ? outline : null,
          height: height,
          width: width,
          left: position.x || 0,
          top: position.y || 0,
        }}
        onLayout={e => {
          let { width, height } = e.nativeEvent.layout;
          this.props.setBoxSize(this.id, width, height);
        }}
      >
        {children}
      </View>
    );
  }

  componentWillMount() {
    let { id, outline, collideWithContainer, bounce, position, velocity, acceleration, drag, gravity, anchor } = this.props;

    // Render never shows the value of id, acceleration, elastic, or reound rate, so doesn't make sense to setState with these props and causes another rerender.  Plus, setState is asynchronous.
    if (!this.id) {
      this.id = this.props.id;
    }
    this.acceleration = acceleration,
    this.elastic = {
      x: bounce.x === 1,
      y: bounce.y === 1
    },
    this.getReboundRate()

    // the only thing interactees will care about each other is position, velocity, and dimensions of the other box (set in onLayOut of box's View)
    this.props.setInitialPositionAndVelocity(this.id, {
      position: {
        x: position.x || 0,
        y: position.y || 0
      },
      velocity: {
        x: velocity.x || 0,
        y: velocity.y || 0
      }
    });
    requestAnimationFrame(this.updateBox);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.updateBox);
  }

  updateBox() {
    // get next velocity
    let { elastic, reboundRate, acceleration } = this;
    let { position, velocity, width, height } = this.props.boxes[this.id];
    let { container, bounce, outline, drag, gravity, collideWithContainer, interactWith } = this.props;
    let nextPosition = {
      x: position.x + velocity.x,
      y: position.y + velocity.y
    }
    let nextVelocity = {
      x: velocity.x,
      y: velocity.y
    }
    let nextAcceleration = {
      x: acceleration.x + gravity.x + (drag.x === 0 ? 0 : velocity.x > 0 ? -drag.x : velocity.x < 0 ? drag.x : 0),
      y: acceleration.y + gravity.y + (drag.y === 0 ? 0 : velocity.y > 0 ? -drag.y : velocity.y < 0 ? drag.y : 0)
    }
    nextVelocity.x = velocity.x + nextAcceleration.x;
    nextVelocity.y = velocity.y + nextAcceleration.y;
    if (collideWithContainer) {
      if ((position.x <= 0 && velocity.x < 0) || (position.x + width >= container.width && velocity.x > 0)) {
        nextVelocity.x = velocity.x * -reboundRate.x;
        this.acceleration = {
          x: 0,
          y: acceleration.y
        };
      }
      if ((position.y <= 0 && velocity.y < 0) || (position.y + height >= container.height && velocity.y > 0)) {
        nextVelocity.y = velocity.y * -reboundRate.y;
        this.acceleration = {
          x: acceleration.x,
          y: 0
        };
      }
    }
    // move to new position
    if (collideWithContainer) {
      if (!this.elastic.x) {
        if (nextPosition.x < 0) {
          nextPosition.x = 0;
        } else if (nextPosition.x + width > container.width) {
          nextPosition.x = container.width - width;
        }
      }
      if (!this.elastic.y) {
        if (nextPosition.y < 0) {
          nextPosition.y = 0;
        } else if (nextPosition.y + height > container.height) {
          nextPosition.y = container.height - height;
        }
      }
      console.log('nextPosition', nextPosition);
    }

    if (false) { // for interactWith
      for (let i = 0; i< interactWith.length; i++) {
        let interactee = interactWith[i];
        if (!this.elastic.x) {
          if (position.x + width > interactee.props.position.x && position.x < interactee.props.position.x + interactee.props.width) {
            if (velocity.y > 0 && nextPosition.y + height >= interactee.props.position.y && position.y <= interactee.props.position.y) {
              nextPosition.y = interactee.props.position.y - height;
            } else if (velocity.y < 0 && nextPosition.y <= interactee.props.position.y + interactee.props.height && position.y + height >= interactee.props.position.y + interactee.props.height) {
              nextPosition.y = interactee.props.position.y + interactee.props.height;
            }
          }
        }
        if (!this.elastic.y) {
          if (position.y + height > interactee.props.position.y && position.y < interactee.props.position.y + interactee.props.height) {
            if (velocity.x > 0 && nextPosition.x + width >= interactee.props.position.x && position.x <= interactee.props.position.x) {
              nextPosition.x = interactee.props.position.x - width;
            } else if (velocity.x < 0 && nextPosition.x <= interactee.props.position.x + interactee.props.width && position.x + width >= interactee.props.position.x + interactee.props.width) {
              nextPosition.x = interactee.props.position.x + interactee.props.width;
            }
          }
        }
      }
    }


    // nextVelocity.x += this.elastic.x ? 0 : nextGravity.x;
    // nextVelocity.y += this.elastic.y ? 0 : nextGravity.y;

    this.props.setPositionAndVelocity(this.id, nextPosition, nextVelocity);
    requestAnimationFrame(this.updateBox);
  }
  getReboundRate() {
    let { acceleration, gravity, bounce, position, container } = this.props;
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
    this.reboundRate = {
      x: impactVelocity.x.second / impactVelocity.x.inital || 0,
      y: impactVelocity.y.second / impactVelocity.y.inital || 0
    };
  }
}

Box.propTypes = {
  physics: React.PropTypes.bool,
  onCollide: React.PropTypes.func,
  position: React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number
  }),
  gravity: React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number
  }),
  velocity: React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number
  }),
  acceleration: React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number
  }),
  drag: React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number
  }),
  anchor: React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number
  }),
  collideWithContainer: React.PropTypes.bool,
  height: React.PropTypes.number,
  width: React.PropTypes.number,
  // interactWith: React.PropTypes.array
};
Box.defaultProps = {
  outline: false,
  position: {x: 0, y: 0},
  gravity: {x: 0, y: 0},
  velocity: {x: 0, y: 0},
  acceleration: {x: 0, y: 0},
  drag: {x: 0, y: 0},
  anchor: {x: 0, y: 0},
  bounce: {x: 0, y: 0},
  outline: false,
  collideWithContainer: false,
  height: null,
  width: null
};


function mapStateToProps(state) {
  return {
    boxes: state.boxes,
    container: state.container
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setInitialPositionAndVelocity,
    // setPosition,
    // setVelocity,
    setPositionAndVelocity,
    setBoxSize,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Box);
