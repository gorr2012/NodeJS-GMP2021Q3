import { Response, Request } from 'express';
import { findAndDelete } from '../services/usersServices';

const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  await findAndDelete(userId);
  res.status(200).json('User deleted');
};

export default deleteUser;
