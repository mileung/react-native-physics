# react-native-physics

A physics library for React Native

![](https://media.giphy.com/media/26xBwGyAcyRNvtPgI/giphy.gif)

### Installation

`npm install --save react-native-physics`

### Importation

`import { Container, Box } from 'react-native-physics';`

### Usagation
`Container` lays out just like a `View`. `Container` holds the state of each box.  Put `Box`es inside the `Container`.

### Examplelation
```javascript
render() {
    return (
      <Container
        style={{ flex: 1, backgroundColor: '#fff' }}
        delay={500}
        >
        <Box
          position={{ x: 20, y: 150 }}
          velocity={{ x: 5, y: -7 }}
          bounce={{ x: 1, y: 1 }}
          collideWithContainer={true}
          id="a"
          >
          <Text style={{ fontSize: 35 }}>Hello World</Text>
        </Box>
      </Container>
    );
  }
```

### Props
Container
```javascript
height: React.PropTypes.number,
width: React.PropTypes.number,
fps: React.PropTypes.number,
delay: React.PropTypes.number,
collide: React.PropTypes.arrayOf(React.PropTypes.object),
overlap: React.PropTypes.arrayOf(React.PropTypes.object)
```
Note: collide and overlap array objects must follow this protocol
```javascript
{
  boxes: [/* strings of box IDs */],
  callback: () => {} // box1, box2 are passed as arguments
}
```

Box
```javascript
position: React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number
  }),
  gravity: React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number
  }),
  velocity: React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number
  }),
  acceleration: React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number
  }),
  drag: React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number
  }),
  collideWithContainer: React.PropTypes.bool,
  height: React.PropTypes.number,
  width: React.PropTypes.number,
  id: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]).isRequired
```

### Contributing
Please do so.  School and other projects have shifted my focus away from this one.
Note: The developer experience was intended to be similar to [Phaser](http://phaser.io/) and the logic of physics is loosely based on [this article](https://www.ibm.com/developerworks/library/wa-build2dphysicsengine/).
