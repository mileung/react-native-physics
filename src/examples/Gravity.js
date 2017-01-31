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
          outline="blue"
          position={{ x: 70, y: 70 }}
          gravity={{ x: 1.1, y: 0.4 }}
          bounce={{ x: 0.9, y: 0.8 }}
          collideWithContainer={true}
          id="c"
          width={100}
          height={100}
        />
      </Container>
    );
  }
}
