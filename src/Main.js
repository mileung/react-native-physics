import React from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native'
import Container from './components/Container';
import Box from './components/Box';
import RandomBox from './RandomBox'

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
          width={200}
          height={100}
          outline={true}
          collideWithContainer={true}
          gravity={{y: 10}}
          bounce={{y: Math.random()}}
          position={{x: 100, y: 50}}
        />
        <Text>Test</Text>
        <Container style={{top: 200, height: 300, borderWidth: 1}}>
          <Box
            width={100}
            height={100}
            outline={'green'}
            collideWithContainer={true}
            gravity={{y: 10}}
            bounce={{y: Math.random()}}
            position={{x: 80, y: 50}}
          />
          <Box
            width={100}
            height={100}
            outline={'blue'}
            collideWithContainer={true}
            gravity={{y: 10, x: -5}}
            bounce={{y: Math.random()}}
            position={{x: 220, y: 50}}
          />
        </Container>*/}
        <Box
          drag={{y: 0.1}}
          velocity={{y: 10}}
          width={100}
          height={100}
          outline={'blue'}
          position={{x: 100, y: 10}}
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
