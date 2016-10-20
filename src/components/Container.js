import React from 'react';
import { View } from 'react-native';
import { createStore, bindActionCreators } from 'redux';
import rootReducer from '../reducers/index.js';
import { Provider, connect } from 'react-redux';
import { v4 } from 'uuid';
import Box from './Box';

let store = createStore(rootReducer)

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
      <Provider store={store}>
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
              id: child.props.id ? child.props.id : v4()
            });
          })}
        </View>
      </Provider>
    );
  }
  componentWillMount() {
    let { children } = this.props;
    this.setState({
      width: this.props.style.width,
      height: this.props.style.height
    });
  }
}
