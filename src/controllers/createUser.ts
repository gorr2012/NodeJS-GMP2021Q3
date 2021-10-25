import { ValidatedRequest } from 'express-joi-validation';
import { add } from '../services/usersServices';
import { IUserSchema } from '../types/types';
import { v4 as uuid } from 'uuid';
import { Response } from 'express';

const createUser = async (req: ValidatedRequest<IUserSchema>, res: Response) => {
  const { body } = req;
  console.log(body);
  await add({ id: uuid(), isDeleted: false, ...body });
  res.status(200).json('User is created');
};

export default createUser;
