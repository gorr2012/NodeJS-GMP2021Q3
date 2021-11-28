import { findUser } from '../../services/usersServices';
import { Response, Request } from 'express';

const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await findUser(userId);
  res.status(200).json(user);
};

export default getUserById;
