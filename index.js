import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/connection.js'; // Updated import
import categoryRoutes from './routes/categoryRoutes.js';

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json()); // Middleware to parse JSON body

// Use category routes
app.use(categoryRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App runs successfully at port: ${port}`);
});
