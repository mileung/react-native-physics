import React from 'react';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import { Provider } from 'react-redux';
import SubContainer from './SubContainer';

let store = createStore(rootReducer)

export default Container = props => {
  // PropTypes are in SubContainer
  // can't get redux state in class that has Provider, so needed SubContainer
  return (
    <Provider store={store}>
      <SubContainer {...props}>
        {props.children}
      </SubContainer>
    </Provider>
  );
}
