import React from 'react';
import { Text } from 'react-native';
import { Container, Box } from '../../index.js';

export default class Drag extends React.Component {
  render() {
    return (
      <Container
        style={{ flex: 1, backgroundColor: '#fff' }}
        delay={500}
        >
        <Box
          position={{ x: 120, y: 50 }}
          velocity={{ x: 20, y: 30 }}
          drag={{ x: 2, y: 1 }}
          collideWithContainer={true}
          id="a"
          >
          <Text style={{ fontSize: 35 }}>STOP</Text>
        </Box>
      </Container>
    );
  }
}
