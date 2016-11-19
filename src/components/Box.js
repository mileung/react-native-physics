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

class Box extends React.Component {
  constructor(props) {
    super(props);
    this.updateBox = this.updateBox.bind(this);
  }

  render() {
    if (!this.props.boxes || !this.props.boxes[this.id]) {
      return null;
    }

    let { children, height, width } = this.props;
    let { position } = this.props.boxes[this.id];

    return (
      <View
        style={{
          position: 'absolute',
          borderWidth: this.borderWidth,
          borderColor: this.borderColor,
          height: height,
          width: width,
          left: position.x,
          top: position.y,
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
    };
    this.borderWidth = outline ? 1 : 0;
    this.borderColor = outline === true ? 'red' : outline ? outline : null;
    this.getReboundRate()
    console.log('COLLIDE', this.id, this.props.collide);

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
    setTimeout(() => requestAnimationFrame(this.updateBox));
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.updateBox);
  }

  updateBox() {
    // console.log(this.id, this.props.boxes);
    // get next velocity
    let { elastic, reboundRate, acceleration } = this;
    let { position, velocity, width, height } = this.props.boxes[this.id];
    let { container, bounce, outline, drag, gravity, collideWithContainer, collide } = this.props;
    let nextPosition = {
      x: position.x + velocity.x,
      y: position.y + velocity.y
    }
    let nextVelocity = {
      x: velocity.x,
      y: velocity.y
    }
    let nextAcceleration = {
      x: acceleration.x + (drag.x === 0 ? 0 : velocity.x > 0 ? -drag.x : velocity.x < 0 ? drag.x : 0),
      y: acceleration.y + (drag.y === 0 ? 0 : velocity.y > 0 ? -drag.y : velocity.y < 0 ? drag.y : 0)
    }

    nextVelocity.x += nextAcceleration.x;
    nextVelocity.y += nextAcceleration.y;

    if (collideWithContainer) {
      if ((position.x <= 0 && velocity.x < 0) || (position.x + width >= container.width && velocity.x > 0)) {
        nextVelocity.x = velocity.x * -reboundRate.x + gravity.x * reboundRate.x;
        this.acceleration.x = 0;
      }
      if ((position.y <= 0 && velocity.y < 0) || (position.y + height >= container.height && velocity.y > 0)) {
        nextVelocity.y = velocity.y * -reboundRate.y + gravity.y * reboundRate.y;
        this.acceleration.y = 0;
      }
    }

    nextVelocity.x += gravity.x;
    nextVelocity.y += gravity.y;

    // move to new position
    if (collideWithContainer) {
      if (nextPosition.x < 0) {
        nextPosition.x = 0;
      } else if (nextPosition.x + width > container.width) {
        nextPosition.x = container.width - width;
      }
      if (nextPosition.y < 0) {
        nextPosition.y = 0;
      } else if (nextPosition.y + height > container.height) {
        nextPosition.y = container.height - height;
      }
    }
    if (false) { // for collisions and overlap
      for (let i = 0; i < interactWith.length; i++) {
        let interactee = this.props.boxes[interactWith[i]];
        if (position.x + width > interactee.position.x && position.x < interactee.position.x + interactee.width) {
          if (velocity.y > 0 && nextPosition.y + height >= interactee.position.y && position.y <= interactee.position.y) {
            nextPosition.y = interactee.position.y - height;
            nextVelocity.y = (velocity.y + interactee.velocity.y) * -reboundRate.y;
            this.acceleration.y = 0;
          } else if (velocity.y < 0 && nextPosition.y <= interactee.position.y + interactee.height && position.y + height >= interactee.position.y + interactee.height) {
            nextPosition.y = interactee.position.y + interactee.height;
            nextVelocity.y = (velocity.y + interactee.velocity.y) * -reboundRate.y;
            console.log('NEXTVELOCITY', this.reboundRate);
            this.acceleration.y = 0;
          }
        }
        if (position.y + height > interactee.position.y && position.y < interactee.position.y + interactee.height) {
          if (velocity.x > 0 && nextPosition.x + width >= interactee.position.x && position.x <= interactee.position.x) {
            nextPosition.x = interactee.position.x - width;
            nextVelocity.x = (velocity.x + interactee.velocity.x) * -reboundRate.x;
            this.acceleration.x = 0;
          } else if (velocity.x < 0 && nextPosition.x <= interactee.position.x + interactee.width && position.x + width >= interactee.position.x + interactee.width) {
            nextPosition.x = interactee.position.x + interactee.width;
            nextVelocity.x = (velocity.x + interactee.velocity.x) * -reboundRate.x;
            this.acceleration.x = 0;
          }
        }
      }
    }

    this.props.setPositionAndVelocity(this.id, nextPosition, nextVelocity);
    requestAnimationFrame(this.updateBox);
  }
  getReboundRate() {
    let { acceleration, gravity, bounce, position, drag } = this.props;

    // container props isn't passed to Box at this point.
    // the size of the container is arbitrary; just needs to be bigger than the position.
    let container = {
      width: position.x + 1,
      height: position.y + 1,
    };
    let totalAcceleration = {
      x: Math.abs(acceleration.x + gravity.x) - drag.x,
      y: Math.abs(acceleration.y + gravity.y) - drag.y
    }
    let drop = {
      width: {
        inital: container.width - position.x,
        second: (container.width - position.x) * bounce.x
      },
      height: {
        inital: container.height - position.y,
        second: (container.height - position.y) * bounce.y
      }
    }
    let impactVelocity = {
      x: {
        inital: totalAcceleration.x * Math.sqrt(2 * drop.width.inital / totalAcceleration.x),
        second: totalAcceleration.x * Math.sqrt(2 * drop.width.second / totalAcceleration.x)
      },
      y: {
        inital: totalAcceleration.y * Math.sqrt(2 * drop.height.inital / totalAcceleration.y),
        second: totalAcceleration.y * Math.sqrt(2 * drop.height.second / totalAcceleration.y)
      }
    }
    this.reboundRate = {
      x: impactVelocity.x.second / impactVelocity.x.inital || bounce.x || 0,
      y: impactVelocity.y.second / impactVelocity.y.inital || bounce.y || 0
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
    setPositionAndVelocity,
    setBoxSize,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Box);
