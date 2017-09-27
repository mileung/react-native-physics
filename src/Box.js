import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View
} from 'react-native';
import {
  setPositionAndVelocity,
  setBoxSize
} from './actions';

class Box extends React.Component {
  static propTypes = {
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }),
    gravity: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }),
    velocity: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }),
    acceleration: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }),
    drag: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }),
    collideWithContainer: PropTypes.bool,
    height: PropTypes.number,
    width: PropTypes.number,
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired
  }

  static defaultProps = { // SubContainer overrides these
    outline: false,
    position: {x: 0, y: 0},
    gravity: {x: 0, y: 0},
    velocity: {x: 0, y: 0},
    acceleration: {x: 0, y: 0},
    drag: {x: 0, y: 0},
    anchor: {x: 0, y: 0}, // not implemented
    bounce: {x: 0, y: 0},
    mass: 1, // not implemented
    collideWithContainer: false,
    height: null,
    width: null,
    id: null
  }

  componentWillMount() {
    let { id, outline, position, velocity, acceleration } = this.props;
    this.acceleration = acceleration,
    this.borderWidth = outline ? 1 : 0;
    this.borderColor = outline === true ? 'red' : outline ? outline : null;

    // // the only thing boxes will care about each other is position, velocity, and dimensions of the other box (set in onLayOut of box's View)
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
  }
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
}

function mapStateToProps({ boxes }) {
  return { boxes };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setPositionAndVelocity,
    setBoxSize,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Box);
