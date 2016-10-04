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
    return (
      <View
        style={[this.props.style, {width: this.state.width, height: this.state.height}]}
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
            interactWith: child.props.interactWith ? this.props.children[1] : null,
            onUpdate: this.onBoxUpdate
          });
        })}
      </View>
    );
  }
  componentWillMount() {
    let { children } = this.props;
    let childrenWithKeys = {};
    let childrenWhoInteract = {};
    for (let index in children) {
      let child = children[index];
      if (child.key) {
        childrenWithKeys[child.key] = child;
      }
      if (child.props.interactWith) {
        console.log('CHILD', child);
        childrenWhoInteract[child.key] = child;
      }
    }
    this.setState({
      childrenWithKeys,
      childrenWhoInteract,
      width: this.props.style.width,
      height: this.props.style.height
    }, () => console.log('state', this.state));
    // console.log('children', this.props.children);
  }
  onBoxUpdate() {
    // console.log('hi');
  }
}
