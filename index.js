import express from 'express';
import router from './routes/testRoutes.js';

const app = express();

const port = process.env.PORT || 5000;

// Use the router for the application routes
app.use('/', router);

app.listen(port, () => {
  console.log(`App runs successfully at port: ${port}`);
});
