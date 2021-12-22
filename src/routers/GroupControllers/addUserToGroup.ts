import { connectUserAndGroup } from '../../services/groupsServices';
import { Response, Request, NextFunction } from 'express';

const addUserToGroup = async (req: Request, res: Response, next: NextFunction) => {
  const { groupId } = req.params;
  const { userIds } = req.body;
  if (!groupId && !userIds) return res.status(404).json();
  try {
    const connection = await connectUserAndGroup(groupId, userIds);
    return res.status(201).send(connection);
  } catch (error) {
    next(new Error(`Cannot found ${groupId} or ${userIds}`));
  }
};

export default addUserToGroup;
