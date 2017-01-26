import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  StatusBar
} from 'react-native';

export default class Menu extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', padding: 15 }}>
        <StatusBar hidden={true} />
        {this.button('Velocity')}
        {this.button('Acceleration')}
        {this.button('Gravity')}
        {this.button('Collision')}
        {this.button('Overlap')}
        {this.button('Random')}
      </View>
    );
  }

  button(state) {
    return (
      <TouchableOpacity
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e6e6e6', margin: 15, borderRadius: 5 }}
        onPress={() => this.props.navigator.push({ title: state })}
        >
        <Text style={{fontSize: 30, color: '#595959'}}>{state}</Text>
      </TouchableOpacity>
    );
  }
}
