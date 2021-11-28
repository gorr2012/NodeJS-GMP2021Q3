import { Response, Request } from 'express';
import { findAndDelete } from '../../services/usersServices';

const deleteUser = async (req: Request, res: Response) =>
  (await findAndDelete(req.params.userId))
    ? res.status(200).json('User deleted')
    : res.status(404).json('Can not find such id');

export default deleteUser;
