import { getAllUsersNotDeleted, getAutoSuggestUsers } from '../../services/usersServices';
import { Response, Request, NextFunction } from 'express';
import { UserNotFoundError } from '../../errors/errors';

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  const { loginSubstring, limit } = req.query;
  try {
    const allUsers = loginSubstring
      ? await getAutoSuggestUsers(<string>loginSubstring, Number(limit))
      : await getAllUsersNotDeleted();
    return res.status(200).send(allUsers);
  } catch (error) {
    next(new Error());
  }
};

export default getAllUsers;
