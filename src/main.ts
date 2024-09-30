import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { AuthGuard } from './domain/auth/auth.guard';
import { UserGuard } from './domain/user/user.guard';

import { ExceptionFilter, SerializeInterceptor, ValidationPipe } from '@/core';
import { Swagger } from '@/document';
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
  app.useGlobalGuards(app.get(AuthGuard), app.get(UserGuard));

  await app.listen(appConfigService.port, appConfigService.host);
}
bootstrap();
