import { DataTypes } from 'sequelize';
import { v4 as uuid } from 'uuid';

export const DBUser = {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    primaryKey: true,
    defaultValue: uuid(),
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    validate: {
      isAlphanumeric: true,
    },
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    validate: {
      min: 4,
      max: 130,
    },
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
};
