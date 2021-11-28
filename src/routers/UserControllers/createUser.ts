import { ValidatedRequest } from 'express-joi-validation';
import { add } from '../../services/usersServices';
import { IUserSchema } from '../../types/types';
import { v4 as uuid } from 'uuid';
import { Response } from 'express';

const createUser = async (req: ValidatedRequest<IUserSchema>, res: Response) => {
  await add({ id: uuid(), isDeleted: false, ...req.body });
  res.status(200).json('User is created');
};

export default createUser;
