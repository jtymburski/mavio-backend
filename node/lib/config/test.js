const apiKey = process.env.API_KEY || 'ISUGKjZQgGdYtVQNuoFTUmJm30agAw8jjnRrwLS2';

const dbHost = process.env.DB_HOST || 'mongo';
const dbPort = process.env.DB_PORT || '27017';
const dbDatabase = process.env.DB_DATABASE || 'testapp';
const dbUser = process.env.DB_USER || 'appaccess';
const dbPassword = process.env.DB_PASSWORD || 'supersecret';

const env = 'test';

module.exports = {
  apiKey: apiKey,
  dbHost: dbHost,
  dbPort: dbPort,
  dbDatabase: dbDatabase,
  dbUser: dbUser,
  dbPassword: dbPassword,
  env: env,
};
