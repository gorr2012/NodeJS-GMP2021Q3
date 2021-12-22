import { ValidatedRequest } from 'express-joi-validation';
import { add } from '../../services/usersServices';
import { IUserSchema } from '../../types/types';
import { v4 as uuid } from 'uuid';
import { NextFunction, Response } from 'express';

const createUser = async (req: ValidatedRequest<IUserSchema>, res: Response, next: NextFunction) => {
  try {
    await add({ id: uuid(), isDeleted: false, ...req.body });
    return res.status(200).json(`User is created`);
  } catch (error) {
    next(new Error());
  }
};

export default createUser;
