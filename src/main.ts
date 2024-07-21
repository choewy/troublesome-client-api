import {
  GloablSerializeInterceptor,
  GlobalValidationPipe,
  GlobalExceptionFilter,
  ServerConfigService,
  AppConfigService,
  Swagger,
} from '@core';
import { AuthGuard, UserInterceptor } from '@domain';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const appConfigService = app.get(AppConfigService);
  const serverConfigService = app.get(ServerConfigService);

  if (appConfigService.isProduction === false) {
    Swagger.setup(app, {
      title: appConfigService.name,
      version: appConfigService.version,
      server: { url: serverConfigService.httpUrl },
    });
  }

  app.enableCors(serverConfigService.corsOptions);
  app.useGlobalInterceptors(app.get(GloablSerializeInterceptor), app.get(UserInterceptor));
  app.useGlobalPipes(app.get(GlobalValidationPipe));
  app.useGlobalFilters(app.get(GlobalExceptionFilter));
  app.useGlobalGuards(app.get(AuthGuard));

  await app.listen(serverConfigService.port, serverConfigService.host);
}
bootstrap();
