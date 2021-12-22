import { Response, Request } from 'express';
import { logger } from '../logger/logger';
import { CustomError } from './errors';

export const errorHandler = (err: Error, req: Request, res: Response) => {
  let statusCode: number;
  let message: string;

  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    message = err.message;
  } else {
    statusCode = 500;
    message = 'Something went wrong';
  }

  logger.error(
    `Method: ${req.method} \n Arguments: ${JSON.stringify(req.query)} \n Error: ${err.message} \n Stack: ${err.stack}`
  );
  res.status(statusCode).send({ message });
};
