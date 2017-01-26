import React from 'react';
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
          outline={true}
          position={{ x: 120, y: 0 }}
          acceleration={{ x: 0, y: 5 }}
          bounce={{ x: 0, y: 0.3 }}
          collideWithContainer={true}
          id="a"
          width={100}
          height={100}
        />
      </Container>
    );
  }
}
