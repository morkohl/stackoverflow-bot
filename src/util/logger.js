const winston = require('winston');

module.exports = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({
            filename: 'error.log',
            level: 'error'
        }),
        new winston.transports.File({
            filename: 'bot.log',
        }),
        new winston.transports.Console({
            handleExceptions: true,
            colorize: true
        })
    ]
});