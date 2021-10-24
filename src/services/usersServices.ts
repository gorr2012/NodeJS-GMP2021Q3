import { User } from '../types/types';
import { memory } from './memory';

export const getAllUsersNotDeleted = async () => memory.filter((user) => !user.isDeleted);

export const findUser = async (id: string) => memory.find((user) => user.id === id);

export const createUser = async (user: User) => memory.push(user);

export const updateUser = async (userToSave: User) => {
  const userIdToUpdate = memory.findIndex((user) => user.id === userToSave.id);
  const userToUpdete = memory[userIdToUpdate];
  memory[memory.findIndex((user) => user.id === userToSave.id)] = {
    ...userToUpdete,
    ...userToSave,
  };
};

export const deleteUser = async (id: string) => {
  const userId = memory.findIndex((user) => user.id === id);
  memory[userId].isDeleted = true;
};

export const getAutoSuggestUsers = async (loginSubstring: string, limit?: number) => {
  const usersAllNotDeleted = await getAllUsersNotDeleted();
  const filteredUsers = usersAllNotDeleted
    .sort((a, b) => a.login.localeCompare(b.login))
    .filter((user) => user.login.includes(loginSubstring));
  return limit ? filteredUsers.slice(0, limit) : filteredUsers;
};
