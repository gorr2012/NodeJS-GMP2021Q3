import { findUser } from '../../services/usersServices';
import { Response, Request, NextFunction } from 'express';
import { UserNotFoundError } from '../../errors/errors';

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  try {
    const user = await findUser(userId);
    res.status(200).json(user);
  } catch (error) {
    next(new UserNotFoundError(userId));
  }
};

export default getUserById;
