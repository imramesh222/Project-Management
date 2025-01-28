const express = require('express');
require('dotenv').config();
const connectDB = require('./database/connection.js');
const categoryRouter = require('./routes/categoryRoutes.js');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON body
app.use(express.json());

// Use category routes (no prefix)
app.use('/', categoryRouter);

// Handle 404 routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Error-handling middleware
app.use((error, req, res, next) => {
  res.status(500).json({ error: error.message });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App runs successfully at port: ${port}`);
});
