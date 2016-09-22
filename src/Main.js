import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions
} from 'react-native'
import Container from './components/Container';
import Box from './components/Box';

let { width, height } = Dimensions.get('window');

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      container: {
        width: 0,
        height: 0
      }
    }
  }
  render() {
    return (
      <Container style={styles.container}>
        {new Array(1).fill(0).map((v, i) => {
          return (
            <Box
              key={i}
              width={Math.round(100 * Math.random())}
              height={Math.round(100 * Math.random())}
              outline={"#" + Math.random().toString(16).slice(2, 8)}
              //position={{x: Math.round(width * Math.random()), y: Math.round(height * Math.random())}}
              position={{x: 500, y: 500}}
              //gravity={{x: 200 - Math.round(400 * Math.random()), y: 200 - Math.round(400 * Math.random())}}
              gravity={{x: -10, y: -10}}
              bounce={{x: 0.9, y: 0.9}}
              collideWithContainer={true}
            />
          );
        })}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
