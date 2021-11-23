import { User } from '../types/types';
import { memory } from './memory';

export const getAllUsersNotDeleted = async () => memory.filter((user) => !user.isDeleted);

export const findUser = async (id: string) => memory.find((user) => user.id === id);

export const add = async (user: User) => memory.push(user);

export const update = async (userToSave: User) => {
  const userIdToUpdate = memory.findIndex((user) => user.id === userToSave.id);
  const userToUpdete = memory[userIdToUpdate];
  memory[userIdToUpdate] = {
    ...userToUpdete,
    ...userToSave,
  };
};

export const findAndDelete = async (id: string) => {
  const userId = memory.findIndex((user) => user.id === id);
  return userId !== -1 ? (memory[userId].isDeleted = true) : false;
};

export const getAutoSuggestUsers = async (loginSubstring: string, limit?: number) => {
  const loginLowerCase = loginSubstring.toLowerCase();
  const usersAllNotDeleted = await getAllUsersNotDeleted();

  const filteredUsers = usersAllNotDeleted
    .sort((a, b) => a.login.localeCompare(b.login))
    .filter((user) => user.login.toLowerCase().includes(loginLowerCase));
  return limit ? filteredUsers.slice(0, limit) : filteredUsers;
};
