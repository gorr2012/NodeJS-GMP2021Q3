import { Request, Response, NextFunction } from 'express';
import { logger } from '../logger/logger';

const reqLog = async (req: Request, res: Response, next: NextFunction) => {
  const { query, body, method } = req;
  const args = JSON.stringify({ query, body });
  logger.info(`Method: ${method} \n Arguments: ${JSON.stringify(args)}`);
  next();
};

export default reqLog;
