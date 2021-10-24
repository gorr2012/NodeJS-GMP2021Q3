import { Router, Request, Response, json } from 'express';
import { v4 as uuid } from 'uuid';

import {
  findUser,
  createUser,
  getAllUsersNotDeleted,
  updateUser,
  deleteUser,
  getAutoSuggestUsers,
} from '../services/usersServices';

export const usersRoutes = Router();

usersRoutes
  .get('/', async (req: Request, res: Response) => {
    const { loginSubstring, limit } = req.query;
    const allUsers = loginSubstring
      ? await getAutoSuggestUsers(<string>loginSubstring, Number(limit))
      : await getAllUsersNotDeleted();
    res.status(200).send(allUsers);
  })
  .get('/:userId', async (req: Request, res: Response) => {
    const { userId } = req.params;
    const user = await findUser(userId);
    res.status(200).json(user);
  })
  .post('/', json(), async (req: Request, res: Response) => {
    const { body } = req;
    await createUser({ id: uuid(), ...body });
    res.status(200).json('User is created');
  })
  .put('/', json(), async (req: Request, res: Response) => {
    const { body } = req;
    const userToSave = await updateUser(body);
    res.status(200).send(userToSave);
  })
  .delete('/:userId', async (req: Request, res: Response) => {
    const { userId } = req.params;
    await deleteUser(userId);
    res.status(200).json('User deleted');
  })
  .get('*', (req: Request, res: Response) => res.status(400).json('Faild'));
