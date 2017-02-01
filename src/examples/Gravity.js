import React from 'react';
import { Text } from 'react-native';
import { Container, Box } from '../../index.js';

export default class Gravity extends React.Component {
  render() {
    return (
      <Container
        style={{ flex: 1, backgroundColor: '#fff' }}
        delay={500}
        >
        <Box
          position={{ x: 70, y: 70 }}
          gravity={{ x: 1.1, y: 0.4 }}
          bounce={{ x: 0.9, y: 0.8 }}
          id="c"
          collideWithContainer={true}
          >
          <Text style={{ fontSize: 30 }}>Gravity</Text>
        </Box>
      </Container>
    );
  }
}
