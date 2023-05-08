import { defineConfig } from '@mikro-orm/postgresql';
import config from './config';

export default defineConfig({
  ...config,
  dbName: 'timebooking-table-dev',
  user: 'myuser',
  password: 'mypassword',
  host: 'localhost',
  port: 5432,
  debug: true,
});
