import { NestFactory, Reflector } from '@nestjs/core';

import { AppModule } from './app.module';
import { ExceptionFilter, SerializeInterceptor, Swagger, SwaggerDocumentOptions, ValidationPipe } from './bootstrap';
import { AppConfigFactory, isLocal } from './common';
import { ContextInterceptor } from './core';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const appConfigFactory = app.get(AppConfigFactory);
  const packageProfile = appConfigFactory.packageProfile;

  if (isLocal()) {
    const swaggerOptions: SwaggerDocumentOptions = {
      title: packageProfile.name,
      version: packageProfile.version,
    };

    Swagger.setup(app, swaggerOptions);
  }

  const corsOptions = appConfigFactory.corsOptions;
  const { port, host } = appConfigFactory.listenOptions;

  app.enableShutdownHooks();
  app.enableCors(corsOptions);
  app.useGlobalInterceptors(new SerializeInterceptor(app.get(Reflector)), app.get(ContextInterceptor));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ExceptionFilter());
  // app.useGlobalGuards(app.get(JwtGuard), app.get(RootGuard));

  await app.listen(port, host);
};

bootstrap();
