import React from 'react';
import { Container, Box } from '../../index.js';

export default class Gravity extends React.Component {
  render() {
    return (
      <Container
        style={{ flex: 1, backgroundColor: '#fff' }}
        delay={500}
        >
        <Box
          outline={true}
          position={{ x: 120 }}
          acceleration={{ y: 0.5 }}
          bounce={{ y: 0.3 }}
          id="a"
          width={100}
          height={100}
          collideWithContainer={true}
        />
      </Container>
    );
  }
}
