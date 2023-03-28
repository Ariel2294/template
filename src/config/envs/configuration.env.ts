import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ConfigServiceEnv {
  @IsString()
  @IsNotEmpty()
  NODE_ENV: string;

  @IsString()
  @IsNotEmpty()
  GLOBAL_PREFIX: string;

  @IsNumber()
  @IsOptional()
  PORT: number;
}
