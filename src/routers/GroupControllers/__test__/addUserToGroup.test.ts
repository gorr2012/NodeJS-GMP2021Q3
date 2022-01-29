import addUserToGroup from '../addUserToGroup';
import { Response } from 'express';
import { v4 as uuid } from 'uuid';
import * as groupService from '../../../services/groupsServices';

const groupsMock = [
  {
    id: uuid(),
    name: 'nameMock',
    permissions: ['READ'],
  },
  {
    id: uuid(),
    name: 'nameMock1',
    permissions: ['WRITE'],
  },
];

const userIds = [uuid(), uuid()];

const mockNextFunction = jest.fn();

jest.mock('../../../services/groupsServices');

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockImplementation((r) => r),
};

describe('addUserToGroup', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should addUserToGroup', async () => {
    const { id: groupId } = groupsMock[0];
    jest.spyOn(groupService, 'connectUserAndGroup').mockResolvedValue(groupId as any);
    await addUserToGroup(
      {
        params: {
          groupId,
        },
        body: {
          userIds,
        },
      } as any,
      res as any,
      mockNextFunction
    );

    expect(res.json).toBeCalledWith(`Group with id ${groupId} was successfully connected with userIds ${userIds}`);
  });

  it('should not addUserToGroup with incorrect groupId', async () => {
    const id = uuid();
    const error = new Error(`Cannot found ${id} or ${userIds}`);
    jest.spyOn(groupService, 'connectUserAndGroup').mockRejectedValue(id);
    await addUserToGroup(
      {
        params: {
          groupId: id,
        },
        body: {
          userIds,
        },
      } as any,
      res as any,
      mockNextFunction
    );

    expect(mockNextFunction).toBeCalledWith(error);
  });
});
