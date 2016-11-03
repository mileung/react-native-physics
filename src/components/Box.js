import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View
} from 'react-native';
import {
  createBox,
  // setPosition,
  // setVelocity,
  setPositionAndVelocity,
  setBoxSize,
  setReboundRate
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

    let { children } = this.props;
    let { position, outline, height, width } = this.props.boxes[this.id];
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
    let newProps = {
      outline,
      collideWithContainer,
      id: this.id,
      position: {
        x: position.x || 0,
        y: position.y || 0
      },
      velocity: {
        x: velocity.x || 0,
        y: velocity.y || 0
      },
      acceleration: {
        x: acceleration.x / 60 || 0,
        y: acceleration.y / 60 || 0
      },
      drag: {
        x: drag.x || 0,
        y: drag.y || 0
      },
      gravity: {
        x: gravity.x / 60 || 0,
        y: gravity.y / 60 || 0
      },
      bounce: {
        x: bounce.x || 0,
        y: bounce.y || 0
      },
      anchor: {
        x: anchor.x || 0,
        y: anchor.y || 0
      },
      elastic: {
        x: bounce.x === 1,
        y: bounce.y === 1
      }
    }
    if (!this.id) {
      this.id = this.props.id;
    }
    this.props.createBox(this.id, { // DOES ANYONE KNOW HOW TO CREATE DEFAULT PROPERTIES OF OBJECT PROPS?!?!
      ...newProps
    });
    this.props.setReboundRate(this.id, this.props.container, newProps); // takes a few ms for container to pass the container props;
    requestAnimationFrame(this.updateBox);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.updateBox);
  }
  updateBox() {
    // get next velocity
    let { outline, position, velocity, width, height, bounce, drag, reboundRate, gravity, acceleration, elastic, collideWithContainer, interactWith } = this.props.boxes[this.id];
    let { container } = this.props;
    let nextPosition = {
      x: position.x + velocity.x,
      y: position.y + velocity.y
    }
    console.log('VELOCITY', velocity);

    let nextVelocity = {
      x: velocity.x,
      y: velocity.y
    }
    // let nextGravity = {
    //   x: gravity.x,
    //   y: gravity.y
    // }
    let nextAcceleration = {
      x: acceleration.x + gravity.x + (drag.x === 0 ? 0 : velocity.x > 0 ? -drag.x : velocity.x < 0 ? drag.x : 0),
      y: acceleration.y + gravity.y + (drag.y === 0 ? 0 : velocity.y > 0 ? -drag.y : velocity.y < 0 ? drag.y : 0)
    }
    nextVelocity.x = velocity.x + nextAcceleration.x;
    nextVelocity.y = velocity.y + nextAcceleration.y;
    if (collideWithContainer) {
      if ((position.x <= 0 && velocity.x < 0) || (position.x + width >= container.width && velocity.x > 0)) {
        nextVelocity.x = velocity.x * -reboundRate.x;
        // this.setState({
        //   acceleration: {
        //     x: 0,
        //     y: acceleration.y
        //   }
        // });
      }
      if ((position.y <= 0 && velocity.y < 0) || (position.y + height >= container.height && velocity.y > 0)) {
        nextVelocity.y = velocity.y * -reboundRate.y;
        // this.setState({
        //   acceleration: {
        //     x: acceleration.x,
        //     y: 0
        //   }
        // });
      }
    }
    // move to new position
    if (collideWithContainer) {
      if (!elastic.x) {
        if (nextPosition.x < 0) {
          nextPosition.x = 0;
        } else if (nextPosition.x + width > container.width) {
          nextPosition.x = container.width - width;
        }
      }
      if (!elastic.y) {
        if (nextPosition.y < 0) {
          nextPosition.y = 0;
        } else if (nextPosition.y + height > container.height) {
          nextPosition.y = container.height - height;
        }
      }
    }

    if (false) { // for interactWith
      for (let i = 0; i< interactWith.length; i++) {
        let interactee = interactWith[i];
        if (!elastic.y) {
          if (position.x + width > interactee.props.position.x && position.x < interactee.props.position.x + interactee.props.width) {
            if (velocity.y > 0 && nextPosition.y + height >= interactee.props.position.y && position.y <= interactee.props.position.y) {
              nextPosition.y = interactee.props.position.y - height;
            } else if (velocity.y < 0 && nextPosition.y <= interactee.props.position.y + interactee.props.height && position.y + height >= interactee.props.position.y + interactee.props.height) {
              nextPosition.y = interactee.props.position.y + interactee.props.height;
            }
          }
        }
        if (!elastic.x) {
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


    // nextVelocity.x += elastic.x ? 0 : nextGravity.x;
    // nextVelocity.y += elastic.y ? 0 : nextGravity.y;

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
    createBox,
    // setPosition,
    // setVelocity,
    setPositionAndVelocity,
    setBoxSize,
    setReboundRate
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Box);
