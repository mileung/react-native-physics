import React from 'react';
import { createStore } from 'redux';
import rootReducer from '../reducers/index.js';
import { Provider } from 'react-redux';
import SubContainer from './SubContainer';

let store = createStore(rootReducer)

export default class Container extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <SubContainer
          style={this.props.style}
          width={this.props.width}
          height={this.props.height}
        >
          {this.props.children}
        </SubContainer>
      </Provider>
    );
  }
}
