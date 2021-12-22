import { create } from '../../services/groupsServices';
import { v4 as uuid } from 'uuid';
import { NextFunction, Request, Response } from 'express';

const createGroup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await create({ id: uuid(), ...req.body });
    return res.status(200).json('Group is created');
  } catch (error) {
    next(new Error('Cannot create group'));
  }
};

export default createGroup;
