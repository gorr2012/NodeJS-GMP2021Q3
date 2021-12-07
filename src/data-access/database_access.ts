import { Sequelize } from 'sequelize';
import { DBGroup } from '../models/DBGroup';
import { DBUser } from '../models/DBUser';
import { IGroupInstance, IUserGroupInstance, IUserInstance } from '../types/types';
import { sequelizeConfig } from './config';

const { database, username, password, bdOptions } = sequelizeConfig;
export const sequelize = new Sequelize(database, username, password, bdOptions);

export const User = sequelize.define<IUserInstance>('User', DBUser, {
  timestamps: false,
  tableName: 'users',
});

export const Group = sequelize.define<IGroupInstance>('Group', DBGroup, {
  timestamps: false,
  tableName: 'groups',
});

export const UserGroup = sequelize.define<IUserGroupInstance>(
  'UserGroup',
  {},
  {
    timestamps: false,
    tableName: 'userGroups',
  }
);

User.belongsToMany(Group, { through: UserGroup });
Group.belongsToMany(User, { through: UserGroup });

export const transaction = sequelize.transaction.bind(sequelize);

// User.sync({ alter: true }).catch((e) => console.log(e));
// Group.sync({ alter: true }).catch((e) => console.log(e));
// UserGroup.sync({ alter: true });
console.log('All models were synchronized successfully.');
// console.log(User === sequelize.models.User);
// console.log(Group === sequelize.models.Group);
// console.log(UserGroup === sequelize.models.UserGroup);
