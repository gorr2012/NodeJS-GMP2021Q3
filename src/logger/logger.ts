import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'combined.log',
      format: format.combine(
        format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
        format.align(),
        format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message}`)
      ),
    }),
  ],
});
