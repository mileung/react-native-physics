import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import {
  View
} from 'react-native';
import {
  setPositionAndVelocity,
  setBoxSize
} from '../actions/index';

class Box extends React.Component {
  render() {
    if (!this.props.boxes[this.props.id]) {
      return null;
    }

    let { children, height, width } = this.props;
    let { position } = this.props.boxes[this.props.id];

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
        onLayout={e => this.props.setBoxSize(this.props.id, e.nativeEvent.layout)}
      >
        {children}
      </View>
    );
  }

  componentWillMount() {
    let { id, outline, collideWithContainer, bounce, position, velocity, acceleration, drag, gravity, anchor } = this.props;
    console.log('ID', id);
    // if (!this.props.id) {
    //   this.props.id = this.props.id;
    // }
    this.acceleration = acceleration,
    this.borderWidth = outline ? 1 : 0;
    this.borderColor = outline === true ? 'red' : outline ? outline : null;
    //
    // // the only thing interactees will care about each other is position, velocity, and dimensions of the other box (set in onLayOut of box's View)
    this.props.setPositionAndVelocity(this.props.id,
      {
        x: position.x || 0,
        y: position.y || 0
      },
      {
        x: velocity.x || 0,
        y: velocity.y || 0
      }
    );
    // requestAnimationFrame(this.updateBoxes)
  }

  componentDidMount() {
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
    // container: state.container
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setPositionAndVelocity,
    setBoxSize,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Box);
