import React from 'react';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import { Provider } from 'react-redux';
import SubContainer from './SubContainer';

let store = createStore(rootReducer)

export default Container = ({ style, width, height, collide, overlap, children, fps, delay }) => {
  return (
    <Provider store={store}>
      <SubContainer
        style={style}
        width={width}
        height={height}
        collide={collide}
        overlap={overlap}
        fps={fps}
        delay={delay}
        >
        {children}
      </SubContainer>
    </Provider>
  );
}
