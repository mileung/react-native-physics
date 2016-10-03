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
      <TouchableWithoutFeedback onPress={() => this.reset()}>
        <View style={styles.container}>
          <Container style={styles.container}>
            {/*{this.state.boxes}*/}
            <Box
              width={100}
              height={100}
              outline={true}
              position={{x: 200, y: 10 || 567}}
              gravity={{y: 10}}
              //velocity={{y: -100}}
              bounce={{y: 0.3}}
              collideWithContainer={true}
              interactWith="platform"
            />
            <Box
              ref="platform"
              width={300}
              height={10}
              outline={true}
              position={{x: 50, y: 500}}
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
