import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { ForbiddenError, UnauthorizedError } from '../errors/errors';

dotenv.config();
const secret = process.env.SECRET || '';

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (req.url === '/login') return next();
  if (!token) next(new UnauthorizedError());
  if (token) jwt.verify(token.split(' ')[1], secret, (err) => (err ? next(new ForbiddenError()) : next()));
};

export default auth;
