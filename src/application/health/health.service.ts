import { Injectable } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Injectable()
export class HealthService {
  constructor(
    private healthCheckService: HealthCheckService,
    private typeOrmHealthIndicator: TypeOrmHealthIndicator,
    private httpHealthIndicator: HttpHealthIndicator,
    private diskHealthIndicator: DiskHealthIndicator,
    private memoryIndicator: MemoryHealthIndicator,
  ) {}

  async healthCheck() {
    const healthCheckResult = await this.healthCheckService
      .check([
        () => this.memoryIndicator.checkHeap('memory_heap', 150 * 1024 * 1024),
        () => this.memoryIndicator.checkRSS('memory_rss', 150 * 1024 * 1024),
        () => this.diskHealthIndicator.checkStorage('storage', { path: '/', threshold: 250 * 1024 * 1024 * 1024 }),
        () => this.typeOrmHealthIndicator.pingCheck('database'),
        () => this.httpHealthIndicator.pingCheck('troublesome_admin_api_server', 'http://localhost:4010'),
      ])
      .then((res) => res.details)
      .catch((e) => {
        const result = e.response;
        const errors = result.error;
        const details = result.details;

        for (const key of Object.keys(errors)) {
          details[key].message = e.message;
        }

        return details;
      });

    return healthCheckResult;
  }
}
