import React from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native'
import Box from './Box';

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
      <View style={styles.container}
        onLayout={e => {
          let { width, height } = e.nativeEvent.layout;
          this.setState({
            container: {
              width: width,
              height: height
            }
          });
        }}
      >
        <Box
          //height={50}
          //width={50}
          outline={true}
          container={{
            width: this.state.container.width,
            height: this.state.container.height
          }}
          position={{x: 50, y: 100}}
          velocity={{x: 5, y: 1}}
        >
          <Text>Hello World</Text>
        </Box>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
