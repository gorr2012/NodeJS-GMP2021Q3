import { Sequelize } from 'sequelize';
import { DBUser } from '../models/DBUser';
import { IUserInstance } from '../types/types';
import { sequelizeConfig } from './config';

const { database, username, password, bdOptions } = sequelizeConfig;
const sequelize = new Sequelize(database, username, password, bdOptions);

export const User = sequelize.define<IUserInstance>('User', DBUser, {
  timestamps: false,
});

// User.sync({ alter: true });
console.log('All models were synchronized successfully.');
console.log(User === sequelize.models.User);
