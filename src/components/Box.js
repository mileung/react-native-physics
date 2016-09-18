import React from 'react';
import {
  View
} from 'react-native';

class Box extends React.Component {
  constructor(props) {
    super(props);
    this.getNextVelocity = this.getNextVelocity.bind(this);
  }

  render() {
    let { outline, height, width, position, children } = this.props;
    return (
      <View
        style={{
          position: 'absolute',
          borderWidth: outline ? 1 : 0,
          borderColor: outline === true ? 'red' : outline ? outline : null,
          height: height || this.state.height,
          width: width || this.state.width,
          left: this.state.position.x,
          top: this.state.position.y,
        }}
        onLayout={e => {
          let { width, height } = e.nativeEvent.layout;
          this.setState({
            height: height,
            width: width
          });
        }}
      >
        {children}
      </View>
    );
  }

  componentWillMount() {
    let { position, velocity, acceleration, gravity, bounce, drag, anchor } = this.props;
    this.setState({
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
      gravity: {
        x: gravity.x / 60 || 0,
        y: gravity.y / 60 || 0
      },
      bounce: {
        x: bounce.x || 0,
        y: bounce.y || 0
      },
      drag: {
        x: drag.x || 0,
        y: drag.y || 0
      },
      anchor: {
        x: anchor.x || 0,
        y: anchor.y || 0
      }
    });
  }

  componentDidMount() {
    // console.log('COMPONENTDIDMOUNT', this.state);
    this.update = setInterval(this.getNextVelocity, 17); // have to use arrow functions here
    // console.log('PROPS', this.props);
  }

  componentWillUnmount() {
    clearInterval(this.update);
  }

  componentWillUpdate(props) {
    // console.log('PROPS', props.container);

  }

  getNextVelocity() {
    // console.log('STATE:', this.state);
    let nextVelocity = {
      x: this.state.velocity.x,
      y: this.state.velocity.y
    }

    let nextAcceleration = {
      x: this.state.acceleration.x,
      y: this.state.acceleration.y
    }

    let nextGravity = {
      x: this.state.gravity.x,
      y: this.state.gravity.y
    }

    if (this.props.collideWithContainer) {
      if ((this.state.position.x <= 0 && this.state.velocity.x < 0) || (this.state.position.x + this.state.width >= this.props.container.width && this.state.velocity.x > 0)) {
        nextVelocity.x *= -this.state.bounce.x;
        nextAcceleration.x = 0;
        this.setState({
          acceleration: {
            x: 0,
            y: this.state.acceleration.y
          }
        });
        // console.log('NEXTVELOCITY', nextVelocity.x);
      }
      if ((this.state.position.y <= 0 && this.state.velocity.y < 0) || (this.state.position.y + this.state.height >= this.props.container.height && this.state.velocity.y > 0)) {
        nextVelocity.y *= -this.state.bounce.y;
        nextAcceleration.y = 0;
        this.setState({
          acceleration: {
            x: this.state.acceleration.x,
            y: 0
          }
        });
      }
      if ((this.state.position.x <= 0 || (this.state.position.x + this.state.width >= this.props.container.width)) && !this.state.acceleration.x) {
        nextGravity.x = 0;
      }
      if ((this.state.position.y <= 0 || (this.state.position.y + this.state.height >= this.props.container.height)) && !this.state.acceleration.y) {
        nextGravity.y = 0;
      }
    }

    this.setState({
      velocity: {
        x: nextVelocity.x + nextAcceleration.x + nextGravity.x,
        y: nextVelocity.y + nextAcceleration.y + nextGravity.y
      }
    }, this.moveToNewPosition)
  }

  moveToNewPosition() {
    this.setState({
      position: {
        x: this.state.position.x + this.state.velocity.x,
        y: this.state.position.y + this.state.velocity.y
      }
    });
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
  interactWith: React.PropTypes.array
};

Box.defaultProps = {
  physics: true,
  container: {},
  position: {},
  gravity: {},
  velocity: {},
  acceleration: {},
  drag: {},
  anchor: {},
  bounce: {},
  outline: false,
  collideWithContainer: false,
  height: null,
  width: null,
};

export default Box;
