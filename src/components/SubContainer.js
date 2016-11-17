import React from 'react';
import { View } from 'react-native';
import { createStore, bindActionCreators } from 'redux';
import rootReducer from '../reducers/index.js';
import { Provider, connect } from 'react-redux';
import { v4 } from 'uuid';
import Box from './Box';
import { setContainerSize } from '../actions/index';


class SubContainer extends React.Component {
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
          this.props.setContainerSize(width, height);
        }}
      >
        {React.Children.map(this.props.children, child => {
          if (child.type !== Box) {
            return child;
          }
          return React.cloneElement(child, {
            id: child.props.id ? child.props.id : v4(),
            collide: child.props.id ? this.collisionDictionary[child.props.id] : null
          });
        })}
      </View>
    );
  }
  componentWillMount() {
    let { collide, children } = this.props;
    let collisionDictionary = {};
    for (let i = 0; i < children.length; i++) {
      let child = children[i];
      if (child.props.id) {
        collisionDictionary[child.props.id] = JSON.parse(JSON.stringify(collide)).filter(collision => {
          return collision.boxes.indexOf(child.props.id) !== -1;
        }).map(collision => {
          collision.boxes = collision.boxes.filter(box => box !== child.props.id);
          return collision;
        });
      }
    }
    this.collisionDictionary = collisionDictionary;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setContainerSize
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(SubContainer);
