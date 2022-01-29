import { update } from '../../services/groupsServices';
import { Response, Request, NextFunction } from 'express';
import { GroupNotFoundError } from '../../errors/errors';

const updateGroup = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  try {
    const groupToSave = await update(body.id, body);
    console.log(groupToSave);

    return res.status(200).json(`Group was successfully update with id ${(groupToSave as any).id}`);
  } catch (error) {
    next(new GroupNotFoundError(`${body.id}`));
  }
};

export default updateGroup;
