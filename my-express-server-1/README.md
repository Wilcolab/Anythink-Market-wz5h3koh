# My Express Server

This project is a simple Express server that listens on port 8001. It is set up to use nodemon for automatic code reloading during development.

## Project Structure

```
my-express-server
├── src
│   └── app.js          # Entry point of the application
├── package.json        # Configuration file for npm
├── Dockerfile          # Instructions to build the Docker image
└── README.md           # Documentation for the project
```

## Getting Started

To get started with this project, follow the instructions below.

### Prerequisites

Make sure you have `Node.js` and `yarn` installed on your machine.

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd my-express-server
   ```

2. Install the dependencies:
   ```
   yarn install
   ```

### Running the Server

To run the server in development mode with automatic reloading, use the following command:

```
yarn start
```

The server will start and listen on `http://localhost:8001`.

### Building the Docker Image

To build the Docker image for the Express server, run the following command in the project root:

```
docker build -t my-express-server .
```

### Running the Docker Container

After building the image, you can run the Docker container with:

```
docker run -p 8001:8001 my-express-server
```

The server will be accessible at `http://localhost:8001`.