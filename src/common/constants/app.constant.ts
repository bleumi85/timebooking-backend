export enum NODE_ENV {
  DEVELOPMENT = 'development',
  TEST = 'test',
  PRODUCTION = 'production',
  PROVISION = 'provision',
}

export const IS_DEVELOPMENT = process.env.NODE_ENV === NODE_ENV.DEVELOPMENT;
