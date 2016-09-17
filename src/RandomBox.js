import React from 'react';
import {
  Dimensions
} from 'react-native';
import Box from './Box'

export default () => {
  let { width, height } = Dimensions.get('window');
  return (
    <Box
      width={Math.round(100 * Math.random())}
      height={Math.round(100 * Math.random())}
      outline={true}
      outlineColor={"#" + Math.random().toString(16).slice(2, 8)}
      container={{
        width: width,
        height: height
      }}
      position={{x: Math.round(width * Math.random()), y: Math.round(height * Math.random())}}
      velocity={{x: 200 - Math.round(400 * Math.random()), y: 200 - Math.round(400 * Math.random())}}
      bounce={{x: Math.random(), y: Math.random()}}
      collideScreenBounds={true}
    />
  );
}
