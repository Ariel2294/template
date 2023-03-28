import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { WinstonModule } from 'nest-winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationServiceValidate } from './config/services/configuration.validate';
import { loggerOptions } from './utils/logger.util';
import { PrismaService } from './database/prisma.service';
import { ConfigurationModule } from './config/config.module';

@Module({
  imports: [
    TerminusModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate: ConfigurationServiceValidate,
    }),
    WinstonModule.forRoot(loggerOptions(process.env.APPLICATION_NAME || 'app')),
    ConfigurationModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
