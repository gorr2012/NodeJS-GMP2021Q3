import { update } from '../../services/groupsServices';
import { Response, Request } from 'express';

const updateGroup = async (req: Request, res: Response) => {
  const { body } = req;
  const groupToSave = await update(body.id, body);
  res.status(200).send(groupToSave);
};

export default updateGroup;
