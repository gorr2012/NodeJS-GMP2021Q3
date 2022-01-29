import createGroup from '../createGroup';
import { Response } from 'express';
import { v4 as uuid } from 'uuid';
import * as groupService from '../../../services/groupsServices';

const groupMock = {
  name: 'nameMock',
  permissions: ['READ'],
};

const mockNextFunction = jest.fn();

jest.mock('../../../services/groupsServices');

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockImplementation((r) => r),
};

describe('createGroup', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const id = uuid();

  it('should create new user with passed id and info', async () => {
    jest.spyOn(groupService, 'create').mockResolvedValue({
      id,
      ...groupMock,
    } as any);
    await createGroup(
      {
        body: {
          ...groupMock,
        },
      } as any,
      res as any,
      mockNextFunction
    );

    expect(res.json).toBeCalledWith(`Group ${groupMock.name} successfully created with id ${id}`);
  });

  it('should not create new group with passed id and info', async () => {
    const error = new Error('Cannot create group');
    jest.spyOn(groupService, 'create').mockRejectedValue('Big fat error');
    await createGroup({} as any, res as any, mockNextFunction);

    expect(mockNextFunction).toBeCalledWith(error);
  });
});
