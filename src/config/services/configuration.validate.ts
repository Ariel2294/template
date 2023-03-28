import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

import { ArgumentInvalidException } from '../../common/argument-invalid.exception';
import { validationErrorsToString } from '../../utils/value-objects';
import { ConfigServiceEnv } from '../envs/configuration.env';

export function ConfigurationServiceValidate(
  config: Record<string, unknown>,
): ConfigServiceEnv {
  const validatedConfig = plainToClass(ConfigServiceEnv, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new ArgumentInvalidException(validationErrorsToString(errors));
  }

  return validatedConfig;
}
