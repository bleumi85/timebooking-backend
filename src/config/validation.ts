import * as Joi from 'joi';
import { NODE_ENV } from 'src/common/constants';

export const validationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  NODE_ENV: Joi.string()
    .valid(
      NODE_ENV.PRODUCTION,
      NODE_ENV.DEVELOPMENT,
      NODE_ENV.TEST,
      NODE_ENV.PROVISION,
    )
    .default(NODE_ENV.DEVELOPMENT),
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required().allow(''),
  POSTGRES_DB: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required(),
});
