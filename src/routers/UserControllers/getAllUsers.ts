import { getAllUsersNotDeleted, getAutoSuggestUsers } from '../../services/usersServices';
import { Response, Request, NextFunction } from 'express';

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  const { loginSubstring, limit } = req.query;
  try {
    const allUsers = loginSubstring
      ? await getAutoSuggestUsers(<string>loginSubstring, Number(limit))
      : await getAllUsersNotDeleted();
    return res.status(200).json(allUsers);
  } catch (error) {
    next(new Error(`${error}`));
  }
};

export default getAllUsers;
