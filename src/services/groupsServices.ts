import { Group, transaction, UserGroup } from '../data-access/database_access';
import { IGroup } from '../types/types';

export const getGroups = async () => await Group.findAll();

export const find = async (id: string) => await Group.findByPk(id);

export const create = async (user: IGroup) => await Group.create(user);

export const update = async (id: string, dataToSave: Partial<Omit<IGroup, 'id'>>) =>
  await Group.update(dataToSave, { where: { id } });

export const deleteHard = async (id: string) => await Group.destroy({ where: { id } });

export const connectUserAndGroup = async (GroupId: string, userIds: string[]) => {
  const usersAndGroup = userIds.map((UserId) => ({ UserId, GroupId }));
  try {
    return await transaction(async (t) => await UserGroup.bulkCreate(usersAndGroup, { transaction: t }));
  } catch (error) {
    console.log({ error });
  }
};
