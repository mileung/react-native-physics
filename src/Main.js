import React from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native'
import Box from './Box';
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
        {/*{new Array(25).fill(0).map((v, i) => <RandomBox key={i} />)}*/}
        <Box
          width={200}
          height={100}
          outline={true}
          collideScreenBounds={true}
          acceleration={{y: 1}}
          position={{x: 10, y: 0}}
          bounce={{x: 0.1, y: 0.1}}
          container={{
            width: this.state.container.width,
            height: this.state.container.height
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
