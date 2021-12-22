import { User } from '../data-access/database_access';
import { IUser } from '../types/types';

export const getAllUsersNotDeleted = async () =>
  await User.findAll({
    where: {
      isDeleted: false,
    },
  });

export const findUser = async (id: string) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error();
  }
  return user;
};

export const add = async (user: IUser) => await User.create(user);

export const update = async (id: string, dataToSave: Partial<Omit<IUser, 'id'>>) =>
  await User.update(dataToSave, {
    where: {
      id,
      isDeleted: false,
    },
  });

export const findAndDelete = async (id: string) => await update(id, { isDeleted: true });

export const getAutoSuggestUsers = async (loginSubstring: string, limit?: number) => {
  const loginLowerCase = loginSubstring.toLowerCase();
  const usersAllNotDeleted = await getAllUsersNotDeleted();

  const filteredUsers = usersAllNotDeleted
    .sort((a, b) => a.login.localeCompare(b.login))
    .filter((user) => user.login.toLowerCase().includes(loginLowerCase));
  return limit ? filteredUsers.slice(0, limit) : filteredUsers;
};
