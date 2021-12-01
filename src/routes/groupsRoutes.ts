import { Router } from 'express';
import { createGroup, getAllGroups, getGroupById, updateGroup, deleteGroup } from '../routers/GroupControllers';

export const groupsRoutes = Router();

groupsRoutes
  .get('/', getAllGroups)
  .get('/:groupId', getGroupById)
  .post('/', createGroup)
  .put('/', updateGroup)
  .delete('/:groupId', deleteGroup);
