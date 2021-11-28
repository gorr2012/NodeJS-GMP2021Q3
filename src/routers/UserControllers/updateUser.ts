import { update } from '../../services/usersServices';
import { Response, Request } from 'express';

const updateUser = async (req: Request, res: Response) => {
  const { body } = req;
  const userToSave = await update(body.id, body);
  res.status(200).send(userToSave);
};

export default updateUser;
