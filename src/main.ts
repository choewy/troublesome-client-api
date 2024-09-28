import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import { ExceptionFilter, SerializeInterceptor, ValidationPipe, Swagger } from '@/core';
import { AppConfigService, ContextInterceptor } from '@/global';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const appConfigService = app.get(AppConfigService);

  if (appConfigService.isProduction === false) {
    Swagger.setup(app, {
      title: appConfigService.name,
      version: appConfigService.version,
      server: { url: appConfigService.httpUrl },
    });
  }

  app.enableShutdownHooks();
  app.enableCors(appConfigService.corsOptions);
  app.useGlobalInterceptors(app.get(SerializeInterceptor), app.get(ContextInterceptor));
  app.useGlobalPipes(app.get(ValidationPipe));
  app.useGlobalFilters(app.get(ExceptionFilter));

  await app.listen(appConfigService.port, appConfigService.host);
}
bootstrap();
