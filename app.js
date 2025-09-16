import express from 'express';
import { router } from './routes/api/index.js';
import { globalErrorHandler } from './middlewares/globalErrorHandler.js';

const app = express();

app.use(express.json());

app.use('/api', router);

app.use((req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found `);
  error.statusCode = 404;
  next(error);
});

app.use(globalErrorHandler);

export default app;
