import deleteGroup from '../deleteGroup';
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

describe('deleteGroup', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete new group with passed id and info', async () => {
    const { id: groupId } = groupsMock[0];
    jest.spyOn(groupService, 'deleteHard').mockResolvedValue(groupId as any);
    await deleteGroup(
      {
        params: {
          groupId,
        },
      } as any,
      res as any,
      mockNextFunction
    );

    expect(res.json).toBeCalledWith(`Group was successfully deleted with id ${groupId}`);
  });

  it('should not delete group with passed id and info', async () => {
    const id = uuid();
    const error = new GroupNotFoundError(id);
    jest.spyOn(groupService, 'deleteHard').mockRejectedValue(id);
    await deleteGroup(
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
