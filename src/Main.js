import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Animated
} from 'react-native'
import Container from './components/Container';
import Box from './components/Box';

let { width, height } = Dimensions.get('window');

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => {/*this.reset()*/}}>
        <View style={styles.container}>
          {/* {this.state.boxes} */}
          <Container
            style={styles.container}
            collisions={[
              {
                boxes: ['ball1', 'ball2', 'ball3', 'ball4'],
                callback: () => console.log('ouch!')
              }
            ]}
            >
            <Box
              id="ball1"
              width={50}
              height={50}
              outline={true}
              mass={2}
              velocity={{x: 20 * Math.random() + 5, y: 20 * Math.random() + 5}}
              // gravity={{x: 1, y: 0}}
              bounce={{x: 1, y: 1}}
              position={{x: 10, y: 10}}
              collideWithContainer={true}
            />
            <Box
              id="ball2"
              width={50}
              height={50}
              outline={'green'}
              mass={2}
              velocity={{x: 20 * Math.random() + 5, y: 20 * Math.random() + 5}}
              // gravity={{x: -1, y: 0}}
              bounce={{x: 1, y: 1}}
              position={{x: 300, y: 20}}
              collideWithContainer={true}
            />
            <Box
              id="ball3"
              width={50}
              height={50}
              outline={'yellow'}
              mass={2}
              velocity={{x: 20 * Math.random() + 5, y: 20 * Math.random() + 5}}
              // gravity={{x: -1, y: 0}}
              bounce={{x: 1, y: 1}}
              position={{x: 200, y: 120}}
              collideWithContainer={true}
            />
            <Box
              id="ball4"
              width={50}
              height={50}
              outline={'blue'}
              mass={2}
              velocity={{x: 20 * Math.random() + 5, y: 20 * Math.random() + 5}}
              // gravity={{x: -1, y: 0}}
              bounce={{x: 1, y: 1}}
              position={{x: 0, y: 0}}
              collideWithContainer={true}
            />
          </Container>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  componentWillMount() {
    // this.createBoxes();
  }

  componentDidMount() {

  }

  reset() {
    console.log('reset called');
    this.setState({
      boxes: null
    }, this.createBoxes);
  }

  // createBoxes() {
  //   console.log('state before', this.state);
  //   this.setState({
  //     boxes: (
  //       <Container
  //         style={styles.container}
  //         collide={[
  //           {
  //             boxes: ['platform', 'ball'],
  //             callback: () => console.log('hit!')
  //           }
  //         ]}
  //         >
  //         <Box
  //           id="ball"
  //           width={30}
  //           height={30}
  //           outline={true}
  //           gravity={{x: 0, y: 1}}
  //           bounce={{x: 1, y: 1}}
  //           position={{x: 150, y: 30}}
  //           collideWithContainer={true}
  //         />
  //         {/* <Box
  //           id="platform"
  //           width={310}
  //           height={40}
  //           outline={true}
  //           gravity={{x: 0, y: -1}}
  //           bounce={{x: 1, y: 0.1}}
  //           position={{x: 20, y: 555}}
  //           collideWithContainer={true}
  //         /> */}
  //       </Container>
  //     )
  //   }, () => console.log('state after', this.state));
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  }
});
