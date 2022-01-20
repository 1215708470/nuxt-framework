import * as configEntity from './config.json';
const config = configEntity.default[process.env.SERVER_ENV];

export default config;