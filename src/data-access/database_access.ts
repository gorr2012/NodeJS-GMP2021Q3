import { Sequelize } from 'sequelize';
import { DBGroup } from '../models/DBGroup';
import { DBUser } from '../models/DBUser';
import { IGroupInstance, IUserInstance } from '../types/types';
import { sequelizeConfig } from './config';

const { database, username, password, bdOptions } = sequelizeConfig;
const sequelize = new Sequelize(database, username, password, bdOptions);

export const User = sequelize.define<IUserInstance>('User', DBUser, {
  timestamps: false,
  tableName: 'users',
});

export const Group = sequelize.define<IGroupInstance>('Group', DBGroup, {
  timestamps: false,
  tableName: 'groups',
});

// User.sync({ alter: true });
// Group.sync({ alter: true });
console.log('All models were synchronized successfully.');
// console.log(User === sequelize.models.User);
// console.log(Group === sequelize.models.Group);
