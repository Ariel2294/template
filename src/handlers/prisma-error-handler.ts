import { Prisma } from '@prisma/client';
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import {
  extractionForeignConstrainErrorPrismaMessage,
  extractionUniqueConstrainErrorPrismaMessage,
} from '../utils/prisma-error.util';
import { ExceptionType } from '../common/exception.types';

@Injectable()
export class PrismaErrorHandler {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  handlePrismaErrors(error, context) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      this.logger.error(
        'Known error of Prisma. Request to the database failed',
        {
          ...context,
          errorCode: error.code,
          errorMessage: error.message,
        },
      );
      this._codeError(error);
    } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      this.logger.error(
        'Unknown error of Prisma. Request to the database failed',
        {
          ...context,
          errorMessage: error.message,
        },
      );
      throw new BadRequestException({
        message: ExceptionType.BadRequest,
        errorCode: error.name,
      });
    } else {
      this.logger.error(ExceptionType.InternalServerErrorMessage, {
        ...context,
        errorMessage: error.message,
        errorCode: error?.errorCode,
      });
      throw new InternalServerErrorException({
        message: ExceptionType.InternalServerErrorMessage,
        errorCode: error?.errorCode,
      });
    }
  }

  _codeError(error) {
    switch (error.code) {
      case 'P2002':
        throw new BadRequestException({
          message: extractionUniqueConstrainErrorPrismaMessage(error.message),
          errorCode: error.code,
        });

      case 'P2003':
        throw new BadRequestException({
          message: extractionForeignConstrainErrorPrismaMessage(error.message),
          errorCode: error.code,
        });
      case 'P2025':
        throw new NotFoundException({
          message: ExceptionType.RecordNotFound,
          errorCode: error.code,
        });
      default:
        throw new BadRequestException({
          message: ExceptionType.BadRequest,
          errorCode: error.code,
        });
    }
  }
}
