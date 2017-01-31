import React from 'react';
import { Text } from 'react-native';
import Container from '../Container';
import Box from '../Box';

export default class Main extends React.Component {
  render() {
    return (
        <Container
          delay={500}
          style={{ flex: 1, backgroundColor: '#fff' }}
          collide={[
            {
              boxes: ['red', 'blue'],
              callback: (box1, box2) => console.log('collide!', box1.id, box2.id)
            }
          ]}
          >
          <Box
            id="blue"
            width={150}
            height={50}
            outline="blue"
            gravity={{ y: 1 }}
            bounce={{ x: 1, y: 0.3 }}
            position={{ x: 100 }}
            collideWithContainer={true}
          />
          <Box
            id="red"
            width={150}
            height={50}
            outline={true}
            gravity={{ y: -2 }}
            bounce={{ y: 0.8 }}
            position={{ x: 100, y: 500 }}
            collideWithContainer={true}
          />
        </Container>

    );
  }
}
