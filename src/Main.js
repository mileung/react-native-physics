import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native'
import Container from './components/Container';
import Box from './components/Box';

let { width, height } = Dimensions.get('window');

export default class Main extends React.Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.reset()}>
        <View style={styles.container}>
          <Container style={styles.container}>
            {/*{this.state.boxes}*/}
            {/* <Box
              // width={100}
              // height={100}
              outline={true}
              position={{x: 100, y: 40}}
              gravity={{x: 0, y: 2}}
              bounce={{x: 1, y: 1}}
              // interactWith={["asteroid"]}
              collideWithContainer={true}
            >
              <Text style={{fontSize: 30}}>Hello World</Text>
            </Box> */}
            {/* <Box
              id="asteroid"
              width={30}
              height={30}
              outline={true}
              position={{x: 200, y: 0}}
              bounce={{x: 0.9, y: 0.9}}
              velocity={{y: 10, x: 0}}
            /> */}
            <Box
              id="platform"
              width={310}
              height={10}
              outline={true}
              position={{x: 50, y: 650}}
            />
            <Box
              id="platform1"
              width={310}
              height={10}
              outline={true}
              position={{x: 50, y: 650}}
            />
          </Container>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  componentWillMount() {
    this.createBoxes();
  }

  componentDidMount() {
    // console.log('refs', this.refs.platform);
  }

  reset() {
    // this.setState({
    //   boxes: null
    // }, this.createBoxes);
  }

  createBoxes() {
    this.setState({
      boxes: new Array(10).fill(0).map((v, i) => {
        return (
          <Box
            key={i}
            width={Math.round(25 + 75 * Math.random())}
            height={Math.round(25 + 75 * Math.random())}
            outline={"#" + Math.random().toString(16).slice(2, 8)}
            position={{x: Math.round(width * Math.random()), y: Math.round(height * Math.random())}}
            gravity={{x: 100 - Math.round(200 * Math.random()), y: 100 - Math.round(200 * Math.random())}}
            bounce={{x: Math.random(), y: Math.random()}}
            collideWithContainer={true}
          >
            {/*<Text style={{fontSize: 40 * Math.random() + 10}}>Hello</Text>*/}
          </Box>
        );
      })
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
