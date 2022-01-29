import updateUser from '../updateUser';
import { Response } from 'express';
import { v4 as uuid } from 'uuid';
import * as userService from '../../../services/usersServices';
import { UserNotFoundError } from '../../../errors/errors';

const usersMock = [
  {
    login: 'loginMock',
    password: 'qwerty123456',
    age: 12,
    isDeleted: false,
    id: uuid(),
  },
  {
    login: 'loginMock1',
    password: 'qwerty123456',
    age: 12,
    isDeleted: false,
    id: uuid(),
  },
];

const userToUpdate = {
  id: usersMock[0].id,
  login: 'loginAfterUpdate',
};

const mockNextFunction = jest.fn();

jest.mock('../../../services/usersServices');

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockImplementation((r) => r),
};

describe('updateUser', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update user with passed id and info', async () => {
    const updateSpy = jest.spyOn(userService, 'update').mockResolvedValue({ ...usersMock[0], ...userToUpdate } as any);
    await updateUser(
      {
        body: {
          ...userToUpdate,
        },
      } as any,
      res as any,
      mockNextFunction
    );

    expect(updateSpy).toBeCalledWith(userToUpdate.id, userToUpdate);
    expect(res.json).toBeCalledWith(`User was updated with such id ${usersMock[0].id}`);
  });

  it('should not update user with passed id and info', async () => {
    const id = uuid();
    const error = new UserNotFoundError(id);
    jest.spyOn(userService, 'update').mockRejectedValue(id as any);
    await updateUser(
      {
        body: {
          ...userToUpdate,
          id,
        },
      } as any,
      res as any,
      mockNextFunction
    );

    expect(mockNextFunction).toBeCalledWith(error);
  });
});
