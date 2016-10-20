import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View
} from 'react-native';
import {
  createBox,
  setPosition,
  setVelocity,
  setBoxSize,
  setReboundRate
} from '../actions/index';

let timePerFrame = 1000 / 60 * 1;

class Box extends React.Component {
  constructor(props) {
    super(props);
    this.getNextVelocity = this.getNextVelocity.bind(this);
  }

  render() {
    if (!this.props.boxes) {
      return null;
    }

    let { children } = this.props;
    let { position, outline, height, width } = this.props.boxes[this.state.id];

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
          this.props.setBoxSize(this.state.id, width, height);
        }}
      >
        {children}
      </View>
    );
  }

  componentWillMount() {
    let { id, bounce } = this.props;
    // this.setState({
    //   position: {
    //     x: position.x || 0,
    //     y: position.y || 0
    //   },
    //   velocity: {
    //     x: velocity.x || 0,
    //     y: velocity.y || 0
    //   },
    //   acceleration: {
    //     x: acceleration.x / 60 || 0,
    //     y: acceleration.y / 60 || 0
    //   },
    //   drag: {
    //     x: drag.x || 0,
    //     y: drag.y || 0
    //   },
    //   gravity: {
    //     x: gravity.x / 60 || 0,
    //     y: gravity.y / 60 || 0
    //   },
    //   bounce: {
    //     x: bounce.x || 0,
    //     y: bounce.y || 0
    //   },
    //   anchor: {
    //     x: anchor.x || 0,
    //     y: anchor.y || 0
    //   },
    //   elastic: {
    //     x: bounce.x === 1,
    //     y: bounce.y === 1
    //   }
    // });
    this.setState({
      id
    });
    this.props.createBox(id, {
      ...this.props,
      id,
      elastic: {
        x: bounce.x === 1,
        y: bounce.y === 1
      }
    });
    this.update = setInterval(this.getNextVelocity, timePerFrame);
  }

  componentDidMount() {
    setTimeout(() => this.props.setReboundRate(this.props), 0.0000000000000000000001);
  }

  componentWillUnmount() {
    clearInterval(this.update);
  }

  getNextVelocity() {
    // console.log('THIS.PROPS.ID', this.props.boxes);
    //
    // let { drag, acceleration, gravity, bounce, height, width, reboundRate, elastic } = this.state;
    // let { collideWithContainer, container, interactWith } = this.props;
    // let { position, velocity } = this.props.boxes[this.props.id];
    //
    //
    // let nextVelocity = {
    //   x: velocity.x,
    //   y: velocity.y
    // }
    // let nextDrag = {
    //   x: nextVelocity.x === 0 || drag.x === 0 ? 0 : nextVelocity.x > 0 ? -drag.x : nextVelocity.x < 0 ? drag.x : 0,
    //   y: nextVelocity.y === 0 || drag.y === 0 ? 0 : nextVelocity.y > 0 ? -drag.y : nextVelocity.y < 0 ? drag.y : 0
    // }
    // let rebound = {
    //   x: false,
    //   y: false
    // }
    // let nextGravity = {
    //   x: gravity.x,
    //   y: gravity.y
    // }
    // let nextAcceleration = {
    //   x: acceleration.x + nextDrag.x,
    //   y: acceleration.y + nextDrag.y
    // }
    //
    // nextVelocity.x += nextAcceleration.x;
    // nextVelocity.y += nextAcceleration.y;
    //
    // nextVelocity.x += elastic.x ? nextGravity.x : 0;
    // nextVelocity.y += elastic.y ? nextGravity.y : 0;
    // if (collideWithContainer) {
    //   if ((position.x <= 0 && velocity.x < 0) || (position.x + width >= container.width && velocity.x > 0)) {
    //     nextVelocity.x = velocity.x * -reboundRate.x;
    //     this.setState({
    //       acceleration: {
    //         x: 0,
    //         y: acceleration.y
    //       }
    //     });
    //   }
    //   if ((position.y <= 0 && velocity.y < 0) || (position.y + height >= container.height && velocity.y > 0)) {
    //     nextVelocity.y = velocity.y * -reboundRate.y;
    //     this.setState({
    //       acceleration: {
    //         x: acceleration.x,
    //         y: 0
    //       }
    //     });
    //   }
    // }
    //
    // if (false) {
    //   for (let i = 0; i < interactWith.length; i++) {
    //     let interactee = interactWith[i];
    //     console.log('INTERACTEE', interactee.props.position.y);
    //     // if (position.x + width > interactee.props.position.x && position.x < interactee.props.position.x + interactee.props.width) {
    //     //   if (velocity.y > 0 && position.y + height >= interactee.props.position.y && position.y < interactee.props.position.y) {
    //     //     nextVelocity.y = velocity.y * -reboundRate.y;
    //     //     console.log('1', interactee.key);
    //     //     this.setState({
    //     //       acceleration: {
    //     //         x: acceleration.x,
    //     //         y: 0
    //     //       }
    //     //     });
    //     //   } else if (gravity.y < 0 && velocity.y < 0 && position.y <= interactee.props.position.y + interactee.props.height) {
    //     //     nextVelocity.y = velocity.y * -reboundRate.y;
    //     //     console.log('2', interactee.key);
    //     //     this.setState({
    //     //       acceleration: {
    //     //         x: acceleration.x,
    //     //         y: 0
    //     //       }
    //     //     });
    //     //   }
    //     // }
    //     // if (position.y + height > interactee.props.position.y && position.y < interactee.props.position.y + interactee.props.height) {
    //     //   if (velocity.x > 0 && position.x + width >= interactee.props.position.x && position.x < interactee.props.position.x) {
    //     //     nextVelocity.x = velocity.x * -reboundRate.x;
    //     //     console.log('3', interactee.key);
    //     //     this.setState({
    //     //       acceleration: {
    //     //         x: 0,
    //     //         y: acceleration.y
    //     //       }
    //     //     });
    //     //   } else if (gravity.x < 0 && velocity.x < 0 && position.x <= interactee.props.position.x + interactee.props.width) {
    //     //     nextVelocity.x = velocity.x * -reboundRate.x;
    //     //     console.log('4', interactee.key);
    //     //     this.setState({
    //     //       acceleration: {
    //     //         x: 0,
    //     //         y: acceleration.y
    //     //       }
    //     //     });
    //     //   }
    //     // }
    //     // console.log('boxes', this.props.boxes);
    //   }
    // }
    // this.props.setPosition(this.props.id, this.state.position);
    // nextVelocity.x += elastic.x ? 0 : nextGravity.x;
    // nextVelocity.y += elastic.y ? 0 : nextGravity.y;
    //
    // // this.setState({
    // //   velocity: {
    // //     x: nextVelocity.x,
    // //     y: nextVelocity.y
    // //   }
    // // }, this.moveToNewPosition)
    //
    // console.log('nextv', nextVelocity);
    // this.props.setVelocity(this.props.id, nextVelocity);
    // this.moveToNewPosition();
  }

  moveToNewPosition() {
    // let { width, height, bounce, elastic } = this.state;
    // let { collideWithContainer, container, interactWith } = this.props;
    // let { position, velocity } = this.props.boxes[this.props.id];
    //
    // let nextPosition = {
    //   x: position.x + velocity.x,
    //   y: position.y + velocity.y
    // }
    //
    // if (collideWithContainer) {
    //   if (!elastic.x) {
    //     if (nextPosition.x < 0) {
    //       nextPosition.x = 0;
    //     } else if (nextPosition.x + width > container.width) {
    //       nextPosition.x = container.width - width;
    //     }
    //   }
    //   if (!elastic.y) {
    //     if (nextPosition.y < 0) {
    //       nextPosition.y = 0;
    //     } else if (nextPosition.y + height > container.height) {
    //       nextPosition.y = container.height - height;
    //     }
    //   }
    // }
    //
    // if (false) {
    //   for (let i = 0; i< interactWith.length; i++) {
    //     let interactee = interactWith[i];
    //     if (!elastic.y) {
    //       if (position.x + width > interactee.props.position.x && position.x < interactee.props.position.x + interactee.props.width) {
    //         if (velocity.y > 0 && nextPosition.y + height >= interactee.props.position.y && position.y <= interactee.props.position.y) {
    //           nextPosition.y = interactee.props.position.y - height;
    //         } else if (velocity.y < 0 && nextPosition.y <= interactee.props.position.y + interactee.props.height && position.y + height >= interactee.props.position.y + interactee.props.height) {
    //           nextPosition.y = interactee.props.position.y + interactee.props.height;
    //         }
    //       }
    //     }
    //     if (!elastic.x) {
    //       if (position.y + height > interactee.props.position.y && position.y < interactee.props.position.y + interactee.props.height) {
    //         if (velocity.x > 0 && nextPosition.x + width >= interactee.props.position.x && position.x <= interactee.props.position.x) {
    //           nextPosition.x = interactee.props.position.x - width;
    //         } else if (velocity.x < 0 && nextPosition.x <= interactee.props.position.x + interactee.props.width && position.x + width >= interactee.props.position.x + interactee.props.width) {
    //           nextPosition.x = interactee.props.position.x + interactee.props.width;
    //         }
    //       }
    //     }
    //   }
    // }
    //
    // // this.setState({
    // //   position: {
    // //     x: nextPosition.x,
    // //     y: nextPosition.y
    // //   }
    // // });
    //
    // this.props.setPosition(this.props.id, nextPosition);
    // console.log('NEXTPOSITION', nextPosition);
  }
  setReboundRate() {
    // let { velocity, acceleration, gravity, bounce, position, height, width } = this.props;
    // let { container } = this.props;
    // let totalAcceleration = {
    //   x: Math.abs(acceleration.x + gravity.x),
    //   y: Math.abs(acceleration.y + gravity.y)
    // }
    // let drop = {
    //   width: {
    //     inital: totalAcceleration.x < 0 ? position.x : container.width - position.x,
    //     second: totalAcceleration.x < 0 ? position.x * bounce.x : (container.width - position.x) * bounce.x
    //   },
    //   height: {
    //     inital: totalAcceleration.x < 0 ? position.y : container.height - position.y,
    //     second: totalAcceleration.x < 0 ? position.y * bounce.y : (container.height - position.y) * bounce.y
    //   }
    // }
    // // Yes, I realize there's a lot of code that can be removed here, but it's easier to read
    // // because it's all part of a physics equation that I mashed together.
    // // distance traveled when dropped from rest = 0.5 x gravity x time^2
    // // velocity = gravity x acceleration
    // // so totalAcceleration * Math.sqrt(drop.width.inital / (0.5 * totalAcceleration.x)) is
    // // really gravity x time, giving you the velocity at impact.
    // let impactVelocity = {
    //   x: {
    //     inital: totalAcceleration.x * Math.sqrt(Math.abs(drop.width.inital / (0.5 * totalAcceleration.x))),
    //     second: totalAcceleration.x * Math.sqrt(Math.abs(drop.width.second / (0.5 * totalAcceleration.x)))
    //   },
    //   y: {
    //     inital: totalAcceleration.y * Math.sqrt(Math.abs(drop.height.inital / (0.5 * totalAcceleration.y))),
    //     second: totalAcceleration.y * Math.sqrt(Math.abs(drop.height.second / (0.5 * totalAcceleration.y)))
    //   }
    // }
    // return reboundRate = {
    //   x: impactVelocity.x.second / impactVelocity.x.inital || 0,
    //   y: impactVelocity.y.second / impactVelocity.y.inital || 0
    // };

  }
  setID(ID) {
    console.log('THIS.STATE', this);
    if (this.state.ID) {
      console.log('CONDITION PASSED');
      this.setState({
        ID
      });
    }
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
  container: {x: 0, y: 0},
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
    boxes: state.boxes
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createBox,
    setPosition,
    setVelocity,
    setBoxSize,
    setReboundRate
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Box);
