import express, { json, Response, Request } from 'express';
import { createLogger, format, transports } from 'winston';
import cors from 'cors';
import { PORT } from './config';
import routes from './routes/routes';
import { NextFunction } from 'express-serve-static-core';

const app = express();
export const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'combined.log',
      format: format.combine(
        format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
        format.align(),
        format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message}`)
      ),
    }),
  ],
});

app.use(cors());
app.use(json());
app.use(routes);
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`Response status ${res.statusCode}`);
});

app.listen(PORT, () => {
  console.log('Server started...');
  logger.info(`Server started and running on http://localhost:${PORT}`);
});
