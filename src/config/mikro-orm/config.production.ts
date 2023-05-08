import { defineConfig } from '@mikro-orm/postgresql';
import config from './config';

export default defineConfig({
  ...config,
  dbName: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  debug: true,
  driverOptions: {
    connection: { ssl: true },
  },
});
