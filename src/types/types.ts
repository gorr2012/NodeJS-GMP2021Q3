import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';

export type User = {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
};
export interface IUserSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    login: string;
    password: string;
    age: number;
  };
}
