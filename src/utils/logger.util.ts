import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';

export const loggerOptions = (applicationName: string) => {
  return {
    transports: [
      new winston.transports.Console({
        level: process.env.LOGGER_LEVEL || 'info',
        format: winston.format.combine(
          winston.format.timestamp(),
          nestWinstonModuleUtilities.format.nestLike(applicationName, {
            prettyPrint: false,
            colors: true,
          }),
        ),
        silent: process.env.NODE_ENV === 'test',
      }),
    ],
  };
};

export function createContextWinston(
  constructorName: string,
  functionName: string,
) {
  return {
    context: `${constructorName}.${functionName}`,
    labels: {
      app: process.env.APPLICATION_NAME,
      module: constructorName,
      function: functionName,
    },
  };
}
