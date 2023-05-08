import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { NODE_ENV } from './common/constants';

import optionsProd from './config/mikro-orm/config.production';
import optionsDev from './config/mikro-orm/config.development';

let options: Options<PostgreSqlDriver>;

switch (process.env.NODE_ENV) {
  case NODE_ENV.PRODUCTION:
    options = optionsProd;
    break;
  case NODE_ENV.DEVELOPMENT:
    options = optionsDev;
    break;
}

export default options;
