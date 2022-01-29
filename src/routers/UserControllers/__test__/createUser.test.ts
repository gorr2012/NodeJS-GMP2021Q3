import createUser from '../createUser';
import { Response } from 'express';
import { v4 as uuid } from 'uuid';
import * as userService from '../../../services/usersServices';

const userMock = {
  login: 'loginMock',
  password: 'qwerty123456',
  age: 12,
};

const mockNextFunction = jest.fn();

jest.mock('../../../services/usersServices');

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockImplementation((r) => r),
};

describe('createUser', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const id = uuid();

  it('should create new user with passed id and info', async () => {
    jest.spyOn(userService, 'add').mockResolvedValue({
      id,
      isDeleted: false,
      ...userMock,
    } as any);
    await createUser(
      {
        body: {
          ...userMock,
        },
      } as any,
      res as any,
      mockNextFunction
    );

    expect(res.json).toBeCalledWith(`User ${userMock.login} successfully created with id ${id}`);
  });

  it('should not create new user with passed id and info', async () => {
    jest.spyOn(userService, 'add').mockRejectedValue('Big fat error');
    await createUser({} as any, res as any, mockNextFunction);

    expect(mockNextFunction).toBeCalledWith(`Big fat error`);
  });
});
