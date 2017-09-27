import React from 'react';
import { Navigator } from 'react-native-deprecated-custom-components';
import {
  TouchableWithoutFeedback,
  Text,
  View
} from 'react-native'

import Menu from './examples/Menu';
import Velocity from './examples/Velocity';
import Drag from './examples/Drag';
import Acceleration from './examples/Acceleration';
import Gravity from './examples/Gravity';
import Collision from './examples/Collision';
import Overlap from './examples/Overlap';
import Random from './examples/Random';

const ROUTES = {
  Menu,
  Velocity,
  Drag,
  Acceleration,
  Gravity,
  Collision,
  Overlap,
  Random
};

// let { width, height } = Dimensions.get('window');

export default class Example extends React.Component {
  render() {
    return (
      <Navigator
        style={{ flex: 1 }}
        ref={ref => this.navigator = ref}
        initialRoute={{ title: 'Menu' }}
        renderScene={(route, navigator) =>{
          let Component = ROUTES[route.title];
          return (
            <TouchableWithoutFeedback
              style={{borderWidth: 100}}
              onPress={() => {
                if (route.title !== 'Menu') {
                  this.navigator.pop();
                }
              }}
              >
              <View style={{ flex: 1 }}>
                <Component navigator={navigator} />
              </View>
            </TouchableWithoutFeedback>
          );
        }}
      />
    );
  }
}
