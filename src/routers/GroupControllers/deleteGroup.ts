import { Response, Request, NextFunction } from 'express';
import { GroupNotFoundError } from '../../errors/errors';
import { deleteHard } from '../../services/groupsServices';

const deleteGroup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteHard(req.params.groupId);
    return res.status(200).json('Group deleted');
  } catch (error) {
    next(new GroupNotFoundError(`${req.params.groupId}`));
  }
};

export default deleteGroup;
