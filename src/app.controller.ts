import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { Public } from './decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private health: HealthCheckService) {}

  @Get('health')
  @Public()
  @HealthCheck()
  async check(): Promise<any> {
    const result = await this.health.check([]);
    return {
      'node-version': process.version,
      memory: process.memoryUsage(),
      pid: process.pid,
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      appName: process.env.name,
      appVersion: process.env.npm_package_version,
      hostname: process.env.HOSTNAME,
      ...result,
    };
  }
}
