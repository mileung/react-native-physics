import React from 'react';
import { View } from 'react-native';
import { createStore, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Box from '../Box';
import { setContainerSize, setPositionAndVelocity, collideBoxes, reset } from '../actions';

class SubContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.updateBoxes = this.updateBoxes.bind(this);
    this.timePerFrame = 1000 / this.props.fps;
    this.nextFrame = Date.now() + this.timePerFrame;
  }

  componentWillMount() {
    this.interactions = []; // array of objects. objects has shape of { boxes: [box1, box2], callback: () => {} }

    for (let i in this.props.collide) {
      let collision = this.props.collide[i];
      for (let i = 0; i < collision.boxes.length - 1; i++) {
        for (let u = i + 1; u < collision.boxes.length; u++) {
          box1 = collision.boxes[i];
          box2 = collision.boxes[u];
          this.interactions.push({
            boxes: [collision.boxes[i], collision.boxes[u]],
            collide: (box1, box2) => {
              collision.callback(box1, box2);
              this.props.collideBoxes(box1.id, box1.position, box1.velocity, box2.id, box2.position, box2.velocity);
            }
          });
        }
      }
    }
    for (let i in this.props.overlap) {
      let overlap = this.props.overlap[i];
    	for (let i = 0; i < overlap.boxes.length - 1; i++) {
    		for (let u = i + 1; u < overlap.boxes.length; u++) {
          this.interactions.push({
            boxes: [overlap.boxes[i], overlap.boxes[u]],
            overlap: (box1, box2) => {
              overlap.callback(box1, box2);
            }
          });
    		}
    	}
    }
  }

  render() {
    let { style, outline, width, height } = this.props;
    return (
      <View
        style={[
          style,
          {
            width: width || null,
            height: height || null,
            borderWidth: outline ? 1 : 0,
            borderColor: outline === true ? 'red' : outline ? outline : null,
          }
        ]}
        onLayout={e => this.setState({ ...e.nativeEvent.layout })}
        >
        {React.Children.map(this.props.children, child => {
          if (child.type !== Box) {
            return child;
          }
          return React.cloneElement(child, {
            id: child.props.id,
            container: {
              width: this.state.width,
              height: this.state.height
            }
          });
        })}
      </View>
    );
  }

  componentDidMount() {
    // this.boxes vs this.props.boxes
    // this.boxes stores values that are only relevent to a box itself and no other boxes
    // (i.e. gravity, acceleration, drag, bounce).
    // this.props.boxes (redux) stores values that other colliding/overlapping boxes need to be aware of
    // (i.e. velocity, position, and size)
    this.boxes = {};
    let { collide, children, delay } = this.props;
    let overlapDictionary = {};
    if (children) {
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
    }
    setTimeout(() => requestAnimationFrame(this.updateBoxes), delay);
  }

  componentWillUnmount() {
    this.boxes = {};
    this.interactions = [];
    this.props.reset();
    cancelAnimationFrame(this.updateBoxes);
  }

  addMissingProps(child) {
    let { gravity, acceleration, drag, bounce } = child.props;
    return React.cloneElement(child, {
      gravity: gravity ? {
        x: gravity.x || 0,
        y: gravity.y || 0
      } : {x: 0, y: 0},
      acceleration: acceleration ? {
        x: acceleration.x || 0,
        y: acceleration.y || 0
      } : {x: 0, y: 0},
      drag: drag ? {
        x: drag.x || 0,
        y: drag.y || 0
      } : {x: 0, y: 0},
      bounce: bounce ? {
        x: bounce.x || 0,
        y: bounce.y || 0
      } : {x: 0, y: 0}
    });
  }

  updateBoxes() { // this is where the magic happens; needs a lot of work
    if (Date.now() < this.nextFrame) {
      return requestAnimationFrame(this.updateBoxes);
    } else {
      this.nextFrame = Date.now() + this.timePerFrame;
    }

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
          this.boxes[id].props.acceleration.x = 0;
        }
        if ((position.y <= 0 && velocity.y < 0) || (position.y + height >= this.state.height && velocity.y > 0)) {
          nextVelocity.y *= -bounce.y;
          this.boxes[id].props.acceleration.y = 0;
        }
      }
      nextVelocity.x += gravity.x;
      nextVelocity.y += gravity.y;


      this.props.setPositionAndVelocity(id, nextPosition, nextVelocity);
    }

    for (let i in this.interactions) {
      let interaction = this.interactions[i];
      let callback = interaction.collide || interaction.overlap;
      let args = [];
      let id1 = interaction.boxes[0];
      let id2 = interaction.boxes[1];
      let box1 = this.props.boxes[id1];
      let box2 = this.props.boxes[id2];
      let velocity1 = {
        x: box1.velocity.x,
        y: box1.velocity.y * -this.boxes[id1].props.bounce.y
      };
      let velocity2 = {
        x: box2.velocity.x,
        y: box2.velocity.y * -this.boxes[id2].props.bounce.y
      };
      if (box1.position.x + box1.width > box2.position.x && box1.position.x < box2.position.x + box2.width) {
        if (
          (box1.position.y + box1.height >= box2.position.y && box1.position.y <= box2.position.y) ||
          (box1.position.y <= box2.position.y + box2.height && box1.position.y + box1.height >= box2.position.y + box2.height)
            ) {
          if (interaction.collide) {
            velocity1.y = box1.velocity.y * -this.boxes[id1].props.bounce.y;
            velocity2.y = box2.velocity.y * -this.boxes[id2].props.bounce.y;
          }
          args = [
            { id: id1, position: box1.position, velocity: velocity1 },
            {id: id2, position: box2.position, velocity: velocity2}
          ];
          callback(...args);
        }
      } else if (box1.position.y + box1.height > box2.position.y && box1.position.y < box2.position.y + box2.height) {
        if (
          (box1.position.x + box1.width >= box2.position.x && box1.position.x <= box2.position.x) ||
          (box1.position.x <= box2.position.x + box2.width && box1.position.x + box1.width >= box2.position.x + box2.width)
            ) {
          if (interaction.collide) {
            velocity1.x = box1.velocity.x * -this.boxes[id1].props.bounce.x;
            velocity2.x = box2.velocity.x * -this.boxes[id2].props.bounce.x;
          }
          args = [
            { id: id1, position: box1.position, velocity: velocity1 },
            {id: id2, position: box2.position, velocity: velocity2}
          ];
          callback(...args);
        }
      }
    }
    requestAnimationFrame(this.updateBoxes)
  }
}

SubContainer.propTypes = {
  height: React.PropTypes.number,
  width: React.PropTypes.number,
  fps: React.PropTypes.number,
  delay: React.PropTypes.number,
  collide: React.PropTypes.arrayOf(React.PropTypes.object),
  overlap: React.PropTypes.arrayOf(React.PropTypes.object),
  // and style: object or StylSheet.create({})
};

Box.defaultProps = {
  height: null,
  width: null,
  fps: 60,
  delay: 0,
  collide: null,
  overlap: null,
  style: null
};

function mapStateToProps(state) {
  return {
    boxes: state.boxes
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setPositionAndVelocity,
    setContainerSize,
    collideBoxes,
    reset
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SubContainer);
