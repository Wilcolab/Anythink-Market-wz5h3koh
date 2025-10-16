# GitHub Copilot Workshop

## Enhance a Node Calculator app using GitHub Copilot

<img width="400" alt="Node Calculator image" src="./assets/Node%20calculator%20image.png">

The project contains a simple node.js application that exposes REST APIs to perform arithmetic on integers, and provides a test suite with mocha and chai.

## Instructions

### Development
In order to run the app use `npm start`

### Production
To run in production mode: `npm run prod`

### Testing
Run tests with `npm test`

### Docker
Build the Docker image: `docker build -t calculator-app .`
Run the container: `docker run -p 3000:3000 calculator-app`

## API Endpoints

- `GET /arithmetic?operation=add&operand1=1&operand2=2` - Perform arithmetic operations
- `GET /history?limit=10&offset=0` - Get calculation history
- `DELETE /history` - Clear calculation history

## Supported Operations

### Binary Operations (require operand1 and operand2):
- `add`, `subtract`, `multiply`, `divide`, `power`

### Unary Operations (require only operand1):
- `sin`, `cos`, `tan` - Trigonometric functions (input in degrees)
- `log` - Base-10 logarithm
- `ln` - Natural logarithm
- `sqrt` - Square root
- `factorial` - Factorial (requires non-negative integer)

## Deployment

The application is containerized with Docker and ready for deployment to any container platform.

## Acknowledgements

A special thanks to the following awesome Hubbers who have contributed in many different ways to this repository.
[pierluigi](https://github.com/pierluigi), [parroty](https://github.com/yuichielectric), [yuichielectric](https://github.com/yuichielectric), [dchomh](https://github.com/dchomh), [nolecram](https://github.com/nolecram), [rsymo](https://github.com/rsymo), [damovisa](https://github.com/damovisa) and anyone else I've inadvertently missed.

_v1.0 Released June, 2023_
