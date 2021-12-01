import { DataTypes } from 'sequelize';
import { v4 as uuid } from 'uuid';

export const DBGroup = {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    primaryKey: true,
    defaultValue: uuid(),
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  permissions: {
    type: DataTypes.ARRAY(DataTypes.ENUM('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')),
    allowNull: false,
    defaultValue: ['READ'],
  },
};
