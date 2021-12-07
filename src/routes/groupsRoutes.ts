import { Router } from 'express';
import {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
  addUserToGroup,
} from '../routers/GroupControllers';
import { groupSchema } from '../validate/validate';
import { createValidator } from 'express-joi-validation';

export const groupsRoutes = Router();
const validator = createValidator();

groupsRoutes
  .get('/', getAllGroups)
  .get('/:groupId', getGroupById)
  .post('/', validator.body(groupSchema), createGroup)
  .post('/:groupId/user-group', addUserToGroup)
  .put('/', validator.body(groupSchema), updateGroup)
  .delete('/:groupId', deleteGroup);
