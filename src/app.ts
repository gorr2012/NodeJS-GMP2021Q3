import express, { json } from 'express';
import cors from 'cors';
import { PORT } from './config';
import routes from './routes/routes';
import reqLog from './middleware/reqLog';
import { errorHandler } from './errors/errorHandler';
import { logger } from './logger/logger';
import auth from './middleware/auth';

const app = express();

app.use(cors());
app.use(json());
app.use(reqLog);
app.use(auth);
app.use(routes);
app.use(errorHandler);

process
  .on('unhandledRejection', (reason, promise) => {
    logger.error(`${reason} Unhandled Rejection at Promise ${promise}`);
  })
  .on('uncaughtException', (err) => {
    logger.error(`${err} Uncaught Exception thrown`);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log('Server started...');
  logger.info(`Server started and running on http://localhost:${PORT}`);
});
