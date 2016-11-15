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
          console.log('collideDictionary', this.collideDictionary);
          if (child.type !== Box) {
            return child;
          }
          return React.cloneElement(child, {
            id: child.props.id ? child.props.id : v4(),
            collideWith: [],
            callback: () => {console.log('hello');}
          });
        })}
      </View>
    );
  }
  componentWillMount() {
    let { collide } = this.props;
    let collideDictionary = {};
    console.log(this.props.collide);
    for (let i = 0; i < collide.length; i++) {
      let collision = collide[i];
      for (let u = 0; u < collision.boxes.length; u ++) {
        collideDictionary[collision.boxes[u]] = collision.boxes.filter(val => collision.boxes[u] !== val);
      }
    }
    console.log('COLLIDEDICTIONARY', collideDictionary);
    this.collideDictionary = collideDictionary;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setContainerSize
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(SubContainer);
