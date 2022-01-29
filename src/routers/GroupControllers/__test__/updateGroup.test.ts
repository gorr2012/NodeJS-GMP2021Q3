import updateGroup from '../updateGroup';
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

const groupToUpdate = {
  id: groupsMock[0].id,
  name: 'nameMockSuper',
  permissions: ['SHAPE'],
};

const mockNextFunction = jest.fn();

jest.mock('../../../services/groupsServices');
// jest.mock('../../../services/groupsServices');

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockImplementation((r) => r),
};

describe('updateGroup', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update group with passed id and info', async () => {
    const { id: groupId } = groupsMock[0];
    const updateSpy = jest
      .spyOn(groupService, 'update')
      .mockResolvedValue({ ...groupsMock[0], ...groupToUpdate } as any);
    await updateGroup(
      {
        body: {
          ...groupToUpdate,
        },
      } as any,
      res as any,
      mockNextFunction
    );

    expect(updateSpy).toBeCalledWith(groupToUpdate.id, groupToUpdate);
    expect(res.json).toBeCalledWith(`Group was successfully update with id ${groupId}`);
  });

  it('should not update group with passed id and info', async () => {
    const id = uuid();
    const error = new GroupNotFoundError(id);
    jest.spyOn(groupService, 'update').mockRejectedValue(id);
    await updateGroup(
      {
        body: {
          ...groupToUpdate,
          id,
        },
      } as any,
      res as any,
      mockNextFunction
    );

    expect(mockNextFunction).toBeCalledWith(error);
  });
});
