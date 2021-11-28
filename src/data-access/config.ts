import dotenv from 'dotenv';
import { Options } from 'sequelize';

const result = dotenv.config();

if (result.error) {
  throw result.error;
}

const {
  PG_HOST,
  PG_PORT = '5432',
  PG_DATABASE = 'postgres',
  PG_USERNAME = 'postgres',
  PG_PASSWORD,
  PG_DIALECT,
} = process.env;

export const bdOptions: Options = {
  host: PG_HOST,
  username: PG_USERNAME,
  password: PG_PASSWORD,
  database: PG_DATABASE,
  port: +PG_PORT,
  dialect: <Options['dialect']>PG_DIALECT,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

export const sequelizeConfig = {
  database: PG_DATABASE,
  username: PG_USERNAME,
  password: PG_PASSWORD,
  bdOptions,
};
