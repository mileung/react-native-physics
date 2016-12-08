import React from 'react';
import { View } from 'react-native';
import { createStore, bindActionCreators } from 'redux';
import rootReducer from '../reducers/index.js';
import { Provider, connect } from 'react-redux';
import { v4 } from 'uuid';
import Box from './Box';
import { setContainerSize, setPositionAndVelocity } from '../actions/index';


class SubContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.updateBoxes = this.updateBoxes.bind(this);
  }
  render() {
    let { style, outline } = this.props;
    return (
      <View
        style={[
          style,
          {
            width: this.props.width || null,
            height: this.props.height || null,
            borderWidth: outline ? 1 : 0,
            borderColor: outline === true ? 'red' : outline ? outline : null,
          }
        ]}
        onLayout={e => {
          let { width, height } = e.nativeEvent.layout;
          // this.props.setContainerSize(width, height);
          this.setState({width, height});
        }}
      >
        {React.Children.map(this.props.children, child => {
          if (child.type !== Box) {
            return child;
          }
          return React.cloneElement(child, {
            id: child.props.id ? child.props.id : v4(),
            container: {
              width: this.state.width,
              height: this.state.height
            }
            // collide: child.props.id ? this.collisionDictionary[child.props.id] : null
          });
        })}
      </View>
    );
  }
  componentDidMount() {
    this.boxes = {};
    let { collide, children } = this.props;
    let collisionDictionary = {};
    if (!Array.isArray(children)) {
      children = [children];
    }
    for (let child of children) {
      if (child.type.displayName === 'Connect(Box)') {
        console.log('asd', child.props.id);
        let id;
        if (child.props.id) {
          id = child.props.id
        }
        this.boxes[id] = child
      }
      // if (child.props.id) {
      //   collisionDictionary[child.props.id] = JSON.parse(JSON.stringify(collide)).filter(collision => {
      //     return collision.boxes.indexOf(child.props.id) !== -1;
      //   }).map(collision => {
      //     collision.boxes = collision.boxes.filter(box => box !== child.props.id);
      //     return collision;
      //   });
      // }
    }
    // this.collisionDictionary = collisionDictionary;
    requestAnimationFrame(this.updateBoxes)
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.updateBoxes);
  }
  updateBoxes() {
    for (let id in this.boxes) {
      let box = this.boxes[id];
      let nextPosition = box.props.position;
      let { position, velocity, width, height } = this.props.boxes[id];
      let { acceleration, bounce, drag, gravity, collideWithContainer, collide } = box.props;
      nextPosition.y += velocity.y;
      // console.log('NEXTPOSITION.Y', nextPosition.y);
      if (collideWithContainer) {
        if (nextPosition.x < 0) {
          nextPosition.x = 0;
        } else if (nextPosition.x + width > this.state.width) {
          nextPosition.x = this.state.width - width;
        }
        if (nextPosition.y < 0) {
          nextPosition.y = 0;
        } else if (nextPosition.y + height > this.state.height) {
          nextPosition.y = this.state.height - height;
        }

        if ((position.x <= 0 && velocity.x < 0) || (position.x + width >= this.state.width && velocity.x > 0)) {
          // nextVelocity.x *= -bounce.x;
          // this.boxes[id].props.acceleration.x = 0;
        }
        if ((position.y <= 0 && velocity.y < 0) || (position.y + height >= this.state.height && velocity.y > 0)) {
          // nextVelocity.y *= -bounce.y;
          // this.boxes[id].props.acceleration.y = 0;
        }
      }
      this.props.setPositionAndVelocity(id, nextPosition, {x: 0, y: 15});
    }
    requestAnimationFrame(this.updateBoxes)
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

    // if (collideWithContainer) {
    //   if (nextPosition.x < 0) {
    //     nextPosition.x = 0;
    //   } else if (nextPosition.x + width > container.width) {
    //     nextPosition.x = container.width - width;
    //   }
    //   if (nextPosition.y < 0) {
    //     nextPosition.y = 0;
    //   } else if (nextPosition.y + height > container.height) {
    //     displacement.y = nextPosition.y + height - container.height;
    //     nextPosition.y = container.height - height;
    //   }
    //
    //   if ((position.x <= 0 && velocity.x < 0) || (position.x + width >= container.width && velocity.x > 0)) {
    //     nextVelocity.x *= -bounce.x;
    //     this.acceleration.x = 0;
    //   }
    //   if ((position.y <= 0 && velocity.y < 0) || (position.y + height >= container.height && velocity.y > 0)) {
    //     nextVelocity.y *= -bounce.y;
    //     this.acceleration.y = 0;
    //   }
    // }

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

function mapStateToProps(state) {
  return {
    boxes: state.boxes
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setPositionAndVelocity,
    setContainerSize
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SubContainer);
