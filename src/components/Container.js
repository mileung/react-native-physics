import React from 'react';
var update = require('react-addons-update');
import {
  View
} from 'react-native';
import Box from './Box';

export default class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: null,
      height: null
    };
  }
  render() {
    let { style, outline } = this.props;
    return (
      <View
        style={[
          style,
          {
            width: this.state.width,
            height: this.state.height,
            borderWidth: outline ? 1 : 0,
            borderColor: outline === true ? 'red' : outline ? outline : null,
          }
        ]}
        onLayout={e => {
          let { width, height } = e.nativeEvent.layout;
          this.setState({
            width,
            height
          });
        }}
      >
        {React.Children.map(this.props.children, child => {
          if (child.type !== Box) {
            return child;
          }
          return React.cloneElement(child, {
            container: {
              width: this.state.width,
              height: this.state.height
            },
            interactWith: child.props.interactWith ? child.props.interactWith.map(interactee => this.state.childrenWithKeys[interactee]) : null, // child.props.interactWith ? this.state.childrenWithKeys[child.props.interactWith[0]] : null,
            onUpdate: this.onBoxUpdate
          });
        })}
      </View>
    );
  }
  componentWillMount() {
    let { children } = this.props;
    console.log('CHILDREN', children.constructor);
    if (children.constructor !== Array) {
      children = [children];
    }
    let childrenWithKeys = {};
    let childrenWhoInteract = {};
    for (let index in children) {
      let child = children[index];
      console.log('CHILD', child);
      if (child.key) {
        childrenWithKeys[child.key] = child;
      }
      // if (child.props.interactWith) {
      //   childrenWhoInteract[child.key] = child;
      //   console.log('CHILDRENWHOINTERACT', childrenWhoInteract);
      // }
    }
    this.setState({
      childrenWithKeys,
      childrenWhoInteract,
      width: this.props.style.width,
      height: this.props.style.height
    });
    // console.log('children', this.props.children);
  }
  onBoxUpdate() {
    // console.log('hi');
  }
}
