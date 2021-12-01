import { getGroups } from '../../services/groupsServices';
import { Response, Request } from 'express';

const getAllGroups = async (_req: Request, res: Response) => {
  const allGroups = await getGroups();
  res.status(200).send(allGroups);
};

export default getAllGroups;
