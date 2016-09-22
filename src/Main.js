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
      // <View style={styles.container}
      //   onLayout={e => {
      //     let { width, height } = e.nativeEvent.layout;
      //     this.setState({
      //       container: {
      //         width: width,
      //         height: height
      //       }
      //     });
      //   }}
      // >
      //   {/*{new Array(25).fill(0).map((v, i) => <RandomBox key={i} />)}*/}
      //   <Box
      //     width={200}
      //     height={100}
      //     outline={true}
      //     collideScreenBounds={true}
      //     gravity={{y: 10}}
      //     bounce={{y: Math.random()}}
      //     position={{x: 100, y: 50}}
      //     container={{
      //       width: this.state.container.width,
      //       height: this.state.container.height
      //     }}
      //   />
      // </View>
      <Container style={styles.container}>
        {/*<Box
          width={Math.round(100 * Math.random())}
          height={Math.round(100 * Math.random())}
          outline={"#" + Math.random().toString(16).slice(2, 8)}
          position={{x: Math.round(width * Math.random()), y: Math.round(height * Math.random())}}
          gravity={{x: 200 - Math.round(400 * Math.random()), y: 200 - Math.round(400 * Math.random())}}
          bounce={{x: Math.random(), y: Math.random()}}
          collideWithContainer={true}
        />*/}
        <Box
          width={Math.round(100 * Math.random())}
          height={Math.round(100 * Math.random())}
          outline={"#" + Math.random().toString(16).slice(2, 8)}
          position={{x: Math.round(width * Math.random()), y: Math.round(height * Math.random())}}
          gravity={{x: 200 - Math.round(400 * Math.random()), y: 50}}
          bounce={{x: 1, y: 0}}
          collideWithContainer={true}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
