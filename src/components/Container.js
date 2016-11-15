import React from 'react';
import { createStore } from 'redux';
import rootReducer from '../reducers/index.js';
import { Provider } from 'react-redux';
import SubContainer from './SubContainer';

let store = createStore(rootReducer)

export default Container = ({ style, width, height, collide, children }) => {
  return (
    <Provider store={store}>
      <SubContainer
        style={style}
        width={width}
        height={height}
        collide={collide}
      >
        {children}
      </SubContainer>
    </Provider>
  );
}
