import { Response, Request, NextFunction } from 'express';
import { UserNotFoundError } from '../../errors/errors';
import { findAndDelete } from '../../services/usersServices';

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await findAndDelete(req.params.userId);
    return res.status(200).json(`User was deleted with such id ${req.params.userId}`);
  } catch (error) {
    next(new UserNotFoundError(req.params.userId));
  }
};

export default deleteUser;
