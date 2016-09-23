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
            }
          });
        })}
      </View>
    );
  }
  componentWillMount() {
    this.setState({
      width: this.props.style.width,
      height: this.props.style.height
    });
  }
}
