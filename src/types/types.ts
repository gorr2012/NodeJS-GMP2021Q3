import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';
import { Model } from 'sequelize';

export interface IUser {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHAPE' | 'UPLOADS_FILES';
export interface IGroup {
  id: string;
  name: string;
  permissions: Permission[];
}

export interface IUserInstance extends Model, IUser {}
export interface IGroupInstance extends Model, IGroup {}
export type IUserGroupInstance = Model;

export interface IUserSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    login: string;
    password: string;
    age: number;
  };
}
