import { connectUserAndGroup } from '../../services/groupsServices';
import { Response, Request } from 'express';

const addUserToGroup = async (req: Request, res: Response) => {
  const { groupId } = req.params;
  const { userIds } = req.body;

  if (groupId && userIds) {
    const connection = await connectUserAndGroup(groupId, userIds);
    return res.status(201).send(connection);
  } else {
    return res.status(404).json();
  }
};

export default addUserToGroup;
