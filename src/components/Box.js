import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View
} from 'react-native';
import {
  setPositionAndVelocity,
  setBoxSize
} from '../actions/index';

const timePerFrame = 30;
const nextFrame = Date.now() + timePerFrame;

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
        onLayout={e => this.props.setBoxSize(this.id, e.nativeEvent.layout)}
      >
        {children}
      </View>
    );
  }

  componentWillMount() {
    let { id, outline, collideWithContainer, bounce, position, velocity, acceleration, drag, gravity, anchor } = this.props;
    if (!this.id) {
      this.id = this.props.id;
    }
    this.acceleration = acceleration,
    this.borderWidth = outline ? 1 : 0;
    this.borderColor = outline === true ? 'red' : outline ? outline : null;

    // the only thing interactees will care about each other is position, velocity, and dimensions of the other box (set in onLayOut of box's View)
    this.props.setPositionAndVelocity(this.id,
      {
        x: position.x || 0,
        y: position.y || 0
      },
      {
        x: velocity.x || 0,
        y: velocity.y || 0
      }
    );
    requestAnimationFrame(this.updateBox)
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.updateBox);
  }

  updateBox() {
    if (Date.now() < nextFrame) {
      return requestAnimationFrame(this.updateBox);
    } else {
      nextFrame = Date.now() + timePerFrame;
    }

    // get next velocity
    let { acceleration } = this;
    let { position, velocity, width, height } = this.props.boxes[this.id];
    let { container, bounce, drag, gravity, collideWithContainer, collide } = this.props;
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
    let displacement = {
      x: 0,
      y: 0
    };

    nextVelocity.x += nextAcceleration.x;
    nextVelocity.y += nextAcceleration.y;

    if (collideWithContainer) {
      if (nextPosition.x < 0) {
        nextPosition.x = 0;
      } else if (nextPosition.x + width > container.width) {
        nextPosition.x = container.width - width;
      }
      if (nextPosition.y < 0) {
        nextPosition.y = 0;
      } else if (nextPosition.y + height > container.height) {
        displacement.y = nextPosition.y + height - container.height;
        nextPosition.y = container.height - height;
      }

      if ((position.x <= 0 && velocity.x < 0) || (position.x + width >= container.width && velocity.x > 0)) {
        nextVelocity.x *= -bounce.x;
        this.acceleration.x = 0;
      }
      if ((position.y <= 0 && velocity.y < 0) || (position.y + height >= container.height && velocity.y > 0)) {
        nextVelocity.y *= -bounce.y;
        this.acceleration.y = 0;
      }
    }

    nextVelocity.x += gravity.x;
    nextVelocity.y += gravity.y;

    if (false) { // for collisions and overlap
      for (let i = 0; i < interactWith.length; i++) {
        let interactee = this.props.boxes[interactWith[i]];
        if (position.x + width > interactee.position.x && position.x < interactee.position.x + interactee.width) {
          if (velocity.y > 0 && nextPosition.y + height >= interactee.position.y && position.y <= interactee.position.y) {
            nextPosition.y = interactee.position.y - height;
            nextVelocity.y = (velocity.y + interactee.velocity.y) * -bounce.y;
            this.acceleration.y = 0;
          } else if (velocity.y < 0 && nextPosition.y <= interactee.position.y + interactee.height && position.y + height >= interactee.position.y + interactee.height) {
            nextPosition.y = interactee.position.y + interactee.height;
            nextVelocity.y = (velocity.y + interactee.velocity.y) * -bounce.y;
            this.acceleration.y = 0;
          }
        }
        if (position.y + height > interactee.position.y && position.y < interactee.position.y + interactee.height) {
          if (velocity.x > 0 && nextPosition.x + width >= interactee.position.x && position.x <= interactee.position.x) {
            nextPosition.x = interactee.position.x - width;
            nextVelocity.x = (velocity.x + interactee.velocity.x) * -bounce.x;
            this.acceleration.x = 0;
          } else if (velocity.x < 0 && nextPosition.x <= interactee.position.x + interactee.width && position.x + width >= interactee.position.x + interactee.width) {
            nextPosition.x = interactee.position.x + interactee.width;
            nextVelocity.x = (velocity.x + interactee.velocity.x) * -bounce.x;
            this.acceleration.x = 0;
          }
        }
      }
    }

    this.props.setPositionAndVelocity(this.id, nextPosition, nextVelocity);
    requestAnimationFrame(this.updateBox);
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
  mass: 1,
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
    setPositionAndVelocity,
    setBoxSize,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Box);
