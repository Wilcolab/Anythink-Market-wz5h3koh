````markdown
# Node.js Express Server

An Express server running on port 8001 with migrated endpoints from the Python FastAPI server. This server provides a complete task management API.

## Features
- Express.js server with full REST API
- Task management endpoints (GET and POST)
- JSON body parsing with body-parser
- Nodemon for auto-reload on code changes
- Dockerized for easy deployment
- Feature parity with Python FastAPI server

## API Endpoints

### GET `/`
Returns a welcome message.

**Response:**
```
Hello World
```

**Example:**
```bash
curl http://localhost:8001/
```

### GET `/tasks`
Retrieves the complete list of tasks.

**Response:**
```json
{
  "tasks": [
    "Write a diary entry from the future",
    "Create a time machine from a cardboard box",
    "Plan a trip to the dinosaurs",
    "Draw a futuristic city",
    "List items to bring on a time-travel adventure"
  ]
}
```

**Example:**
```bash
curl http://localhost:8001/tasks
```

### POST `/tasks`
Adds a new task to the task list.

**Request Body:**
```json
{
  "text": "Your task description"
}
```

**Response:**
```json
{
  "message": "Task added successfully"
}
```

**Example:**
```bash
curl -X POST http://localhost:8001/tasks \
  -H "Content-Type: application/json" \
  -d '{"text":"Build a flux capacitor"}'
```

## Running the Server

### Using Docker Compose
```bash
docker compose up
```

The server will be available at http://localhost:8001

### Using npm (Development)
```bash
npm install
npm start
```

### Using Node directly
```bash
npm install
node src/app.js
```

## Development
The server uses nodemon, so any changes to the code will automatically reload the server when running with `npm start`.

## Dependencies
- **express**: Web framework for Node.js
- **body-parser**: Middleware for parsing JSON request bodies
- **nodemon** (dev): Auto-reloads server on file changes

## Migration Notes
This server was migrated from a Python FastAPI implementation. All endpoints maintain the same:
- URL paths
- Request/response formats
- Business logic
- Initial data

The migration ensures complete feature parity with the original Python server.

````
