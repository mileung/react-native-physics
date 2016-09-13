import React from 'react';
import {
  AppRegistry,
} from 'react-native';
import Main from './src/Main';

class RNPhysics extends React.Component {
  render() {
    return (
      <Main />
    );
  }
}

AppRegistry.registerComponent('RNPhysics', () => RNPhysics);
