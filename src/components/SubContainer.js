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
            id: child.props.id ? child.props.id : v4()
          });
        })}
      </View>
    );
  }
  componentWillMount() {
    // let { children } = this.props;
    // this.setState({
    //   width: this.props.style.width,
    //   height: this.props.style.height
    // });
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setContainerSize
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(SubContainer);
