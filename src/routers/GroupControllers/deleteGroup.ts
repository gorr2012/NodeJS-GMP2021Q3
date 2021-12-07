import { Response, Request } from 'express';
import { deleteHard } from '../../services/groupsServices';

const deleteGroup = async (req: Request, res: Response) =>
  (await deleteHard(req.params.groupId))
    ? res.status(200).json('Group deleted')
    : res.status(404).json('Can not find such id');

export default deleteGroup;
