const winston = require('winston');
const fs = require('fs');
const rootPath = require('app-root-path').path;
const logPath = `${rootPath}/log`;

function getLogger() {
    if(!fs.existsSync(logPath)) {
        fs.mkdirSync(logPath);
    }

    return winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        transports: [
            new winston.transports.File({
                filename: `${logPath}/error.log`,
                level: 'error'
            }),
            new winston.transports.File({
                filename: `${logPath}/bot.log`,
            }),
            new winston.transports.Console({
                handleExceptions: true,
                colorize: true,
                json: false
            })
        ]
    });
};

module.exports = getLogger();