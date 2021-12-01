import { create } from '../../services/groupsServices';
import { v4 as uuid } from 'uuid';
import { Request, Response } from 'express';

const createGroup = async (req: Request, res: Response) => {
  await create({ id: uuid(), ...req.body });
  res.status(200).json('Group is created');
};

export default createGroup;
