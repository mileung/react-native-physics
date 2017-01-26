import React from 'react';
import { Text } from 'react-native';
import Container from '../Container';
import Box from '../Box';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  render() {
    return (
        <Container
          delay={500}
          style={{ flex: 1, backgroundColor: '#fff' }}
          overlap={[
            {
              boxes: ['red', 'blue'],
              callback: (box1, box2) => this.setState({ count: ++this.state.count })
            }
          ]}
          >
          <Text style={{ fontSize: 35 }}>{`counter: ${this.state.count}`}</Text>
          <Box
            id="blue"
            width={150}
            height={50}
            outline="blue"
            velocity={{x: 23, y: 16}}
            bounce={{x: 1, y: 1}}
            position={{x: 100, y: 0}}
            collideWithContainer={true}
          />
          <Box
            id="red"
            width={150}
            height={50}
            outline={true}
            velocity={{x: 5, y: -9}}
            bounce={{x: 1, y: 1}}
            position={{x: 100, y: 500}}
            collideWithContainer={true}
          />
        </Container>

    );
  }
}
