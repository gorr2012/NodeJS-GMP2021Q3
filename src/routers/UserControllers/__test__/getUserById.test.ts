import getUserById from '../getUserById';
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
    id: '59011ab5-658c-4ef4-a658-0a76ff34739b',
  },
  {
    login: 'loginMock1',
    password: 'qwerty123456',
    age: 12,
    isDeleted: false,
    id: '59011ab5-658c-4ef4-a658-0a76ff34739c',
  },
];

const mockNextFunction = jest.fn();

jest.mock('../../../services/usersServices');

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockImplementation((r) => r),
};

describe('findUser', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const { id: userId, login } = usersMock[0];
  it('should find user with passed id', async () => {
    jest.spyOn(userService, 'findUser').mockResolvedValue(usersMock[0] as any);
    await getUserById(
      {
        params: {
          userId,
        },
      } as any,
      res as any,
      mockNextFunction
    );

    expect(res.json).toBeCalledWith(`User login ${login} was find with such id ${userId}`);
  });

  it('should not find user with passed id', async () => {
    const failedUserId = uuid();
    const error = new UserNotFoundError(failedUserId);
    jest.spyOn(userService, 'findUser').mockRejectedValue(failedUserId as any);
    await getUserById(
      {
        params: {
          userId: failedUserId,
        },
      } as any,
      res as any,
      mockNextFunction
    );

    expect(mockNextFunction).toBeCalledWith(error);
  });
});
