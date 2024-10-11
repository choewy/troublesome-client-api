import { NestFactory } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { AppModule } from './app.module';
import { AuthGuard } from './application/auth/auth.guard';
import { PermissionGuard } from './application/permission/permission.guard';

import { ExceptionFilter, SerializeInterceptor, ValidationPipe } from '@/core';
import { Swagger, SwaggerDocumentOptions } from '@/document';
import { AppConfigService, ContextInterceptor, JwtConfigService } from '@/global';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const appConfigService = app.get(AppConfigService);
  const jwtConfigService = app.get(JwtConfigService);
  const jwtService = app.get(JwtService);

  if (appConfigService.isProduction === false) {
    const swaggerOptions: SwaggerDocumentOptions = {
      title: appConfigService.name,
      version: appConfigService.version,
      server: { url: appConfigService.httpUrl },
    };

    if (appConfigService.isLocal) {
      swaggerOptions.authOption = {
        accessToken: jwtService.sign({ id: 1 }, jwtConfigService.accessTokenSignOptions),
        refreshToken: jwtService.sign({ id: 1 }, jwtConfigService.refreshTokenSignOptions),
      };
    }

    Swagger.setup(app, swaggerOptions);
  }

  app.enableShutdownHooks();
  app.enableCors(appConfigService.corsOptions);
  app.useGlobalInterceptors(app.get(SerializeInterceptor), app.get(ContextInterceptor));
  app.useGlobalPipes(app.get(ValidationPipe));
  app.useGlobalFilters(app.get(ExceptionFilter));
  app.useGlobalGuards(app.get(AuthGuard), app.get(PermissionGuard));

  await app.listen(appConfigService.port, appConfigService.host);
}
bootstrap();
