import getAllUsers from '../getAllUsers';
import { Response } from 'express';
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

describe('getAllUsers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should getAllUsersNotDeleted', async () => {
    const getAllUsersNotDeletedSpy = jest
      .spyOn(userService, 'getAllUsersNotDeleted')
      .mockResolvedValue(usersMock as any);
    await getAllUsers(
      {
        query: {},
      } as any,
      res as any,
      mockNextFunction
    );

    expect(getAllUsersNotDeletedSpy).toBeCalledWith();
    expect(res.json).toBeCalledWith(usersMock);
  });

  it('should getAutoSuggestUsers', async () => {
    const getAllUsersNotDeletedSpy = jest.spyOn(userService, 'getAutoSuggestUsers').mockResolvedValue(usersMock as any);
    await getAllUsers(
      {
        query: {
          loginSubstring: 'login',
          limit: 1,
        },
      } as any,
      res as any,
      mockNextFunction
    );

    expect(getAllUsersNotDeletedSpy).toBeCalledWith('login', 1);
    expect(res.json).toBeCalledWith(usersMock);
  });

  it('should not deleted user with passed id', async () => {
    const failed = 'faild';
    const error = new Error(failed);
    jest.spyOn(userService, 'getAllUsersNotDeleted').mockRejectedValue(failed as any);
    await getAllUsers(
      {
        query: {},
      } as any,
      res as any,
      mockNextFunction
    );

    expect(mockNextFunction).toBeCalledWith(error);
  });
});
