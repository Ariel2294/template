import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import { loggerOptions } from './utils/logger.util';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger(
      loggerOptions(process.env.APPLICATION_NAME || 'app'),
    ),
  });
  const configService = app.get(ConfigService);
  const environment =
    configService.get<string>('NODE_ENV') || process.env.NODE_ENV;
  const port = configService.get<number>('PORT') || 8000;

  const globalPrefix = configService.get<string>('GLOBAL_PREFIX');
  //let globalDocPrefix = `${globalPrefix}/docs`;

  app.setGlobalPrefix(globalPrefix);
  const config = new DocumentBuilder()

    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .setTitle('Gestion House Service')
    .setDescription('This is the api doc for Gestion House service')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  if (environment !== 'production') {
    SwaggerModule.setup('docs', app, document, {
      swaggerOptions: { defaultModelsExpandDepth: -1, docExpansion: 'none' },
    });
  }
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}
bootstrap();
