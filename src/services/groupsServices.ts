import { Group, transaction, UserGroup } from '../data-access/database_access';
import { IGroup } from '../types/types';

export const getGroups = () => Group.findAll();

export const find = async (id: string) => {
  const group = await Group.findByPk(id);
  if (!group) {
    throw new Error();
  }
  return group;
};

export const create = async (user: IGroup) => await Group.create(user);

export const update = async (id: string, dataToSave: Partial<Omit<IGroup, 'id'>>) =>
  Group.update(dataToSave, { where: { id } });

export const deleteHard = async (id: string) => await Group.destroy({ where: { id } });

export const connectUserAndGroup = async (GroupId: string, userIds: string[]) => {
  const usersAndGroup = userIds.map((UserId) => ({ UserId, GroupId }));
  try {
    return await transaction(async (t) => await UserGroup.bulkCreate(usersAndGroup, { transaction: t }));
  } catch (error) {
    throw new Error();
  }
};
