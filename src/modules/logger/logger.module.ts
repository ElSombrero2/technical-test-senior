import winston from 'winston'

export const logger = winston.createLogger({ 
    level: 'warn',
    format: winston.format.simple(),
    transports: [
        new winston.transports.File({filename: './logs/server.log', level: 'warn'})
    ]
});