import getAllGroups from '../getAllGroups';
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

const mockNextFunction = jest.fn();

jest.mock('../../../services/groupsServices');

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockImplementation((r) => r),
};

describe('getAllGroups', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should getAllGroups', async () => {
    jest.spyOn(groupService, 'getGroups').mockResolvedValue(groupsMock as any);
    await getAllGroups({} as any, res as any, mockNextFunction);

    expect(res.json).toBeCalledWith(groupsMock);
  });

  it('should not getAllGroups', async () => {
    const error = new Error('Bad request');
    jest.spyOn(groupService, 'getGroups').mockRejectedValue('Bad request');
    await getAllGroups(
      {
        body: {},
      } as any,
      res as any,
      mockNextFunction
    );

    expect(mockNextFunction).toBeCalledWith(error);
  });
});
