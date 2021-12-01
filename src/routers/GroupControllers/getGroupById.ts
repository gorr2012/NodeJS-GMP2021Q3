import { find } from '../../services/groupsServices';
import { Response, Request } from 'express';

const getGroupById = async (req: Request, res: Response) => {
  const { groupId } = req.params;
  const group = await find(groupId);
  res.status(200).json(group);
};

export default getGroupById;
