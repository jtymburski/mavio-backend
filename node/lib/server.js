const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const winston = require('winston');

const app = require('express')();
const { combine, timestamp, printf, splat } = winston.format;

global.__root = __dirname + '/';
global.HttpError = require('./helper/HttpError');
global.HttpHelper = require('./helper/HttpHelper');
global.LogRequest = require('./helper/LogRequest');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(LogRequest.start);

if (!fs.existsSync('logs')) fs.mkdirSync('logs');

global.logger = winston.createLogger({
  format: combine(
    timestamp(),
    printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
    splat()
  ),
  transports: [
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
      maxsize: 102400,
      maxFiles: 10,
      tailable: true,
    }),
  ],
});

module.exports = {
  serve(env) {
    app.config = require('./config')(env);
    app.disable('x-powered-by');

    // console logging in all modes except test
    if (app.config.env !== 'test') {
      let consoleLogLevel = 'info';
      if (app.config.env == 'dev')
        consoleLogLevel = 'debug';
      logger.add(new winston.transports.Console(
                          { prettyPrint: true, level: consoleLogLevel }));
    }

    // auth middleware used throughout
    app.auth = require('./auth/verify')(app);

    // set up the db
    return require('./db/connect')(app)
      .then(() => {
        // configure API routes
        require('./routes')(app);
        app.port = process.env.PORT || 3000;

        // try to find ssl key and chain
        return Promise.all([ readFile('./ssl/server.key'),
                             readFile('./ssl/server.crt'),
                             readFile('./ssl/server.chain') ]);
      })
      .then((sslInfo) => {
        // decide between HTTPS and HTTP, based on if the ssl key was found
        const key = sslInfo[0];
        const cert = sslInfo[1];
        const chain = sslInfo[2];

        return Promise.resolve(key && cert ?
            require('https').createServer({
              key: key,
              cert: cert + chain
            }, app) :
            require('http').createServer(app));
      })
      .then((http) => {
        // open the port to the express server
        return new Promise((resolve, reject) => {
          http.listen(app.port, () => resolve(app))
              .on('error', (err) => reject(err));
        });
      });
  },
  // FOR TESTING
  app: app
};

/**
 * Creates a promise to read a file and return either the data from the file or nothing if
 * no file is found
 * @param path the relative or absolute path to the file
 * @return the promise execution
 */
function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      resolve(err ? '' : data);
    });
  });
}
