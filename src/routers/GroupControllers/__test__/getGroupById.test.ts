import getGroupById from '../getGroupById';
import { Response } from 'express';
import { v4 as uuid } from 'uuid';
import * as groupService from '../../../services/groupsServices';
import { GroupNotFoundError } from '../../../errors/errors';

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

const mockNextFunction = jest.fn();

jest.mock('../../../services/groupsServices');

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockImplementation((r) => r),
};

describe('findGroup', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should find user with passed id and info', async () => {
    const { id: groupId } = groupsMock[0];
    jest.spyOn(groupService, 'find').mockResolvedValue(groupId as any);
    await getGroupById(
      {
        params: {
          groupId,
        },
      } as any,
      res as any,
      mockNextFunction
    );

    expect(res.json).toBeCalledWith(`Group was successfully found with id ${groupId}`);
  });

  it('should not find group with passed id and info', async () => {
    const id = uuid();
    const error = new GroupNotFoundError(id);
    jest.spyOn(groupService, 'find').mockRejectedValue(id);
    await getGroupById(
      {
        params: {
          groupId: id,
        },
      } as any,
      res as any,
      mockNextFunction
    );

    expect(mockNextFunction).toBeCalledWith(error);
  });
});
