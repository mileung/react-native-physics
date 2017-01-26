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
          position={{ x: 20, y: 50 }}
          gravity={{ x: 1, y: 3 }}
          bounce={{ x: 0.6, y: 0.8 }}
          collideWithContainer={true}
          id="a"
          width={100}
          height={100}
        />
        <Box
          outline="green"
          position={{ x: 90, y: 20 }}
          gravity={{ x: 1.1, y: 3.4 }}
          bounce={{ x: 0.6, y: 0.8 }}
          collideWithContainer={true}
          id="b"
          width={100}
          height={100}
        />
        <Box
          outline="blue"
          position={{ x: 70, y: 70 }}
          gravity={{ x: 6.1, y: 3.4 }}
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
