import { Router, json } from 'express';
import { userSchema } from '../validate/validate';
import { createValidator } from 'express-joi-validation';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser, handleOtherPaths } from '../controllers';

export const usersRoutes = Router();
const validator = createValidator();

usersRoutes
  .get('/', getAllUsers)
  .get('/:userId', getUserById)
  .post('/', json(), validator.body(userSchema), createUser)
  .put('/', json(), validator.body(userSchema), updateUser)
  .delete('/:userId', deleteUser)
  .get('*', handleOtherPaths);
