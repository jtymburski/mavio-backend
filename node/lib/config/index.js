module.exports = (env) => {
  const config = getConfig(env);
  return {
    apiKey: config.apiKey,
    dbUri: `mongodb://${config.dbUser}:${config.dbPassword}@${config.dbHost}:${config.dbPort}/${config.dbDatabase}`,
    env: config.env,
  };
};

function getConfig(env) {
  switch (env) {
    case 'test':
      return require('./test');
    case 'prod':
      return require('./prod');
    case 'dev':
      /* falls through */
    default:
      return require('./dev');
  }
}
