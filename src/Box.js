import React from 'react';
import {
  View
} from 'react-native';

class Box extends React.Component {
  constructor(props) {
    console.log('PROPS', props);
    super(props);
    this.state = {
      position: {
        x: props.position.x,
        y: props.position.y
      },
      velocity: {
        x: props.velocity.x,
        y: props.velocity.y
      }
    }
    this.setState = this.setState.bind(this);
  }

  render() {
    return (
      <View
        style={{
          position: 'absolute',
          borderWidth: this.props.outline ? 1 : 0,
          borderColor: this.props.outlineColor,
          height: this.props.height || this.state.height,
          width: this.props.width || this.state.width,
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
        {this.props.children}
      </View>
    );
  }

  componentWillMount() {
    // this.setState({
    //   position: {
    //     x: this.props.position.x,
    //     y: this.props.position.y
    //   },
    //   velocity: {
    //     x: this.props.velocity.x,
    //     y: this.props.velocity.y
    //   }
    // });
  }

  componentDidMount() {
    console.log('COMPONENTDIDMOUNT', this.state);
    // this.getNextVelocity();
    this.update = setInterval(() => this.getNextVelocity(), 17); // have to use arrow functions here
  }

  componentWillUnmount() {
    clearInterval(this.update);
  }

  getNextVelocity() {
    console.log('STATE', this.state);
    let nextVelocity = {
      x: this.state.velocity.x,
      y: this.state.velocity.y
    }
    this.setState({
      velocity: {
        x: nextVelocity.x,
        y: nextVelocity.y
      }
    }, this.moveToNewPosition)
  }

  moveToNewPosition() {
    console.log('moveToNewPosition');
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
  outline: React.PropTypes.bool,
  outlineColor: React.PropTypes.string,
  collideScreenBounds: React.PropTypes.bool,
  height: React.PropTypes.number,
  width: React.PropTypes.number,
  interactWith: React.PropTypes.array
};

Box.defaultProps = {
  physics: true,
  position: {
    x: 0,
    y: 0
  },
  gravity: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  acceleration: {
    x: 0,
    y: 0
  },
  drag: {
    x: 0,
    y: 0
  },
  anchor: {
    x: 0.5,
    y: 0.5
  },
  outline: false,
  outlineColor: 'red',
  collideScreenBounds: false,
  height: null,
  width: null,
};

export default Box;
