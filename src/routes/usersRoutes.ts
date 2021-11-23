import { Router } from 'express';
import { userSchema } from '../validate/validate';
import { createValidator } from 'express-joi-validation';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers';

export const usersRoutes = Router();
const validator = createValidator();

usersRoutes
  .get('/', getAllUsers)
  .get('/:userId', getUserById)
  .post('/', validator.body(userSchema), createUser)
  .put('/', validator.body(userSchema), updateUser)
  .delete('/:userId', deleteUser);
