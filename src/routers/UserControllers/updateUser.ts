import { update } from '../../services/usersServices';
import { Response, Request, NextFunction } from 'express';
import { UserNotFoundError } from '../../errors/errors';

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  try {
    const userToSave = await update(body.id, body);
    return res.status(200).json(`User was updated with such id ${(userToSave as any).id}`);
  } catch (error) {
    next(new UserNotFoundError(body.id));
  }
};

export default updateUser;
