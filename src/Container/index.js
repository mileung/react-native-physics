import React from 'react';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import { Provider } from 'react-redux';
import SubContainer from './SubContainer';

export default class Container extends React.Component {
  componentWillMount() {
    this.store = createStore(rootReducer)
  }

  render() {
    // PropTypes are in SubContainer
    // can't get redux state in class that has Provider, so needed SubContainer
    return (
      <Provider store={this.store}>
        <SubContainer {...this.props}>
          {this.props.children}
        </SubContainer>
      </Provider>
    );
  }
}
