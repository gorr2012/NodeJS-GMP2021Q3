import { getGroups } from '../../services/groupsServices';
import { Response, Request, NextFunction } from 'express';

const getAllGroups = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const allGroups = await getGroups();
    return res.status(200).send(allGroups);
  } catch (error) {
    next(new Error(`${error}`));
  }
};

export default getAllGroups;
