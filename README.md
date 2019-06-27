# Node.js API Backend Template

## Description

A template ready boilerplate of a node.js backend API with sample endpoints and NoSQL MongoDB connection.
It is built to be run inside a docker container for development, testing and continuous integration

## Getting Started

### Prerequisites

* [Docker Desktop with Compose](https://www.docker.com/products/docker-desktop/)
* [NPM Package Manager](https://www.npmjs.com/)

### Development

#### To start
1. Open a terminal in the root directory of the project
1. `cd node`
1. `npm install`
1. `cd ..`
1. `./run.sh dev up`

Once complete, the project will now be running in the docker container and accessible on the localhost.
The design is viewable in Swagger on [port 8081](http://localhost:8081).
The MongoDB express admin interface can be accessed on [port 8082](http://localhost:8082)

Any code changes are monitored using `nodemon` and will cause the node server to restart automatically

#### To stop
1. `./run.sh dev down`

### Testing

Make sure that is successfully runs on development before testing

#### To run
1. Open a terminal in the root directory of the project
1. `./run.sh test upsync`

#### To clean up
1. `./run.sh test down`

## Libraries

#### Runtime
* [Node.js](https://nodejs.org/) - JavaScript Runtime Environment
* [NPM](https://www.npmjs.com/) - JavaScript Package Manager
* [Express](https://expressjs.com/) - Minimalist Web Framework
* [MongoDB](https://www.mongodb.com/) - NoSQL General Document Database
* [Swagger](https://swagger.io/) - API Design Framework

#### Testing
* [Chai](https://www.chaijs.com/) - TDD Assertion Library
* [Mocha](https://mochajs.org/) - Asynchronous Test Framework

## Authors

* **Jordan Tymburski** - [Portfolio](https://jordantymburski.com/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
