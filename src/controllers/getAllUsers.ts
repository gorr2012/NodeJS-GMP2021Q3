import { getAllUsersNotDeleted, getAutoSuggestUsers } from '../services/usersServices';
import { Response, Request } from 'express';

const getAllUsers = async (req: Request, res: Response) => {
  const { loginSubstring, limit } = req.query;
  const allUsers = loginSubstring
    ? await getAutoSuggestUsers(<string>loginSubstring, Number(limit))
    : await getAllUsersNotDeleted();
  res.status(200).send(allUsers);
};
export default getAllUsers;
