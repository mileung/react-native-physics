import React from 'react';
import { Text } from 'react-native';
import Box from '../Box';
import Container from '../Container';

export default class Gravity extends React.Component {
  render() {
    return (
      <Container
        style={{ flex: 1, backgroundColor: '#fff' }}
        delay={500}
        >
        <Box
          position={{ x: 20, y: 50 }}
          velocity={{ x: 34, y: 17 }}
          bounce={{ x: 1, y: 1 }}
          collideWithContainer={true}
          id="a"
          >
          <Text style={{ fontSize: 35 }}>Hello World</Text>
        </Box>
      </Container>
    );
  }
}
