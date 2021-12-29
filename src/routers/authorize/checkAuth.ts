import { Response, Request, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { findUserByLogin } from '../../services/usersServices';
import { UnauthorizedError } from '../../errors/errors';

dotenv.config();
const secret = process.env.SECRET || '';

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { login, password } = req.body;

  try {
    const user = await findUserByLogin(login);
    if (!user || user.password !== password) {
      next(new UnauthorizedError());
    }
    const payload = { login: user.login, id: user.id, isDeleted: user.isDeleted };
    const token = jwt.sign(payload, secret, { expiresIn: 100 });
    res.status(200).json(token);
  } catch (error) {
    next(new UnauthorizedError());
  }
};
