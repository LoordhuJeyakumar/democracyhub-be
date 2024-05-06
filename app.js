// Import the Express framework for creating a server
const express = require("express");

// Import the cors middleware to enable cross-origin requests
const cors = require("cors");
// Custom routes for the application
const appRouter = require("./routes");

// Create an Express application instance
const app = express();

// Enable CORS middleware (Cross-Origin Resource Sharing) for all requests
app.use(cors());

// Using built-in middleware function in Express to parse incoming requests with JSON payloads
app.use(express.json());

// Define a middleware function to handle unknown endpoints
const unknownEndpoint = (request, response) => {
  // Send a 404 Not Found response with an error message
  response.status(404).send({ error: "unknown endpoint" });
};

// Use the application routes defined in appRouter
app.use(appRouter);

// Register the unknownEndpoint middleware as the last app-level middleware
// This ensures it only gets called if no other middleware handles the request
app.use(unknownEndpoint);

// Export the Express.js application instance
module.exports = app;
