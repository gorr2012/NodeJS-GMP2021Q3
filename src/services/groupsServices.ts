import { Group } from '../data-access/database_access';
import { IGroup } from '../types/types';

export const getGroups = async () => await Group.findAll();

export const find = async (id: string) => await Group.findByPk(id);

export const create = async (user: IGroup) => await Group.create(user);

export const update = async (id: string, dataToSave: Partial<Omit<IGroup, 'id'>>) =>
  await Group.update(dataToSave, { where: { id } });

export const deleteHard = async (id: string) => await Group.destroy({ where: { id } });
