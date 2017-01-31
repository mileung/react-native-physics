import React from 'react';
import Box from '../Box';
import Container from '../Container';

export default class Gravity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boxes: null
    };
  }

  componentWillMount() {
    this.setState({
      boxes: Array(Math.round(Math.random() * 3 + 2)).fill(1).map((val, index) => {
        return (
          <Box
            key={index + ''}
            id={index + ''}
            outline={"#" + Math.random().toString(16).slice(2, 8)}
            position={{ x: Math.random() * 200, y: Math.random() * 200 }}
            velocity={{ x: Math.random() * 40, y: Math.random() * 40 }}
            bounce={{ x: Math.random(), y: Math.random() }}
            width={Math.random() * 50 + 50}
            height={Math.random() * 50 + 50}
            collideWithContainer={true}
          />
        );
      })
    });
  }

  render() {
    return (
      <Container
        style={{ flex: 1, backgroundColor: '#fff' }}
        delay={500}
        >
        {this.state.boxes}
      </Container>
    );
  }
}
