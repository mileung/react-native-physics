import React from 'react';
import { View } from 'react-native';
import { createStore, bindActionCreators } from 'redux';
import rootReducer from '../reducers/index.js';
import { Provider, connect } from 'react-redux';
import { v4 } from 'uuid';
import Box from './Box';
import { setContainerSize, setPositionAndVelocity, collideBoxes } from '../actions/index';


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
          });
        })}
      </View>
    );
  }
  componentWillMount() {
    // for (let i in this.props.collide) {
    //   let collision = this.props.collide[i];
    //   let collisionCombos = [];
    // 	for (let i = 0; i < collision.boxes.length - 1; i++) {
    // 		for (let u = i + 1; u < collision.boxes.length; u++) {
    // 			collisionCombos.push({
    //         boxes: [collision.boxes[i], collision.boxes[u]],
            // callback: () => {
            //   collision.callback();
            //   this.props.collideBoxes(id1, position1, velocity1, id2, position2, velocity2);
            // }}
    //       });
    // 		}
    // 	}
    // }
    this.interactions = [];

    for (let i in this.props.collide) {
      let collision = this.props.collide[i];
      for (let i = 0; i < collision.boxes.length - 1; i++) {
        for (let u = i + 1; u < collision.boxes.length; u++) {
          box1 = collision.boxes[i];
          box2 = collision.boxes[u];
          this.interactions.push({
            boxes: [collision.boxes[i], collision.boxes[u]],
            callback: () => {
              // velocity1 = {
              //   x: ,
              //   y:
              // };
              // velocity2 = {
              //   x: ,
              //   y:
              // };
              collision.callback(box1, box2);
              // this.props.collideBoxes(box1, this.props.boxes[box1].position, this.props.boxes[box1].velocity, box2, this.props.boxes[box2].position, this.props.boxes[box2].velocity);
            }
          });
        }
      }
    }

    for (let i in this.props.overlap) {
      let overlap = this.props.overlap[i];
    	for (let i = 0; i < overlap.boxes.length - 1; i++) {
    		for (let u = i + 1; u < overlap.boxes.length; u++) {
          this.interactions.push({boxes: [overlap.boxes[i], overlap.boxes[u]], callback: overlap.callback});
    		}
    	}
    }
    console.log('THIS.OVERLAPPINGS', this.interactions);
  }
  componentDidMount() {
    this.boxes = {};
    let { collide, children } = this.props;
    let overlapDictionary = {};
    if (!Array.isArray(children)) {
      children = [children];
    }
    for (let child of children) {
      if (child.type.displayName === 'Connect(Box)') {
        let id;
        if (child.props.id) {
          id = child.props.id
        }
        this.boxes[id] = this.addMissingProps(child);
      }
    }
    requestAnimationFrame(this.updateBoxes)
  }
  addMissingProps(child) {
    return React.cloneElement(child, {
      gravity: child.props.gravity || {x: 0, y: 0},
      acceleration: child.props.acceleration || {x: 0, y: 0},
      drag: child.props.drag || {x: 0, y: 0},
      mass: child.props.mass || 1
    });
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.updateBoxes);
  }
  updateBoxes() {
    // console.log('updating');
    for (let id in this.boxes) {
      let box = this.boxes[id];
      let { position, velocity, width, height } = this.props.boxes[id];
      let { acceleration, bounce, drag, gravity, collideWithContainer, collide } = box.props;
      let nextPosition = position;
      let nextVelocity = velocity;
      let nextAcceleration = {
        x: acceleration.x + (drag.x === 0 ? 0 : velocity.x > 0 ? -drag.x : velocity.x < 0 ? drag.x : 0),
        y: acceleration.y + (drag.y === 0 ? 0 : velocity.y > 0 ? -drag.y : velocity.y < 0 ? drag.y : 0)
      }

      nextVelocity.x += nextAcceleration.x;
      nextVelocity.y += nextAcceleration.y;
      nextPosition.x += velocity.x;
      nextPosition.y += velocity.y;
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
          nextVelocity.x *= -bounce.x;
          // this.boxes[id].props.acceleration.x = 0;
        }
        if ((position.y <= 0 && velocity.y < 0) || (position.y + height >= this.state.height && velocity.y > 0)) {
          nextVelocity.y *= -bounce.y;
          // this.boxes[id].props.acceleration.y = 0;
        }
      }
      nextVelocity.x += gravity.x;
      nextVelocity.y += gravity.y;


      this.props.setPositionAndVelocity(id, nextPosition, nextVelocity);
    }

    for (let i in this.interactions) {
      let interaction = this.interactions[i];
      let box1 = this.props.boxes[interaction.boxes[0]];
      let box2 = this.props.boxes[interaction.boxes[1]];
      if (box1.position.x + box1.width > box2.position.x && box1.position.x < box2.position.x + box2.width) {
        if (
          (box1.position.y + box1.height >= box2.position.y && box1.position.y <= box2.position.y) ||
          (box1.position.y <= box2.position.y + box2.height && box1.position.y + box1.height >= box2.position.y + box2.height)
            ) {
          interaction.callback(interaction.boxes[0], interaction.boxes[1]);
        }
      } else if (box1.position.y + box1.height > box2.position.y && box1.position.y < box2.position.y + box2.height) {
        if (
          (box1.position.x + box1.width >= box2.position.x && box1.position.x <= box2.position.x) ||
          (box1.position.x <= box2.position.x + box2.width && box1.position.x + box1.width >= box2.position.x + box2.width)
            ) {
          interaction.callback(interaction.boxes[0], interaction.boxes[1]);
        }
      }
    }
    requestAnimationFrame(this.updateBoxes)
  }

  updateBox() {
    if (Date.now() < nextFrame) {
      return requestAnimationFrame(this.updateBox);
    } else {
      nextFrame = Date.now() + timePerFrame;
    }
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
    setContainerSize,
    collideBoxes
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SubContainer);
