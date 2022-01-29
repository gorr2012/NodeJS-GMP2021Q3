import { find } from '../../services/groupsServices';
import { Response, Request, NextFunction } from 'express';
import { GroupNotFoundError } from '../../errors/errors';

const getGroupById = async (req: Request, res: Response, next: NextFunction) => {
  const { groupId } = req.params;
  try {
    const id = await find(groupId);
    return res.status(200).json(`Group was successfully found with id ${id}`);
  } catch (error) {
    next(new GroupNotFoundError(groupId));
  }
};

export default getGroupById;
