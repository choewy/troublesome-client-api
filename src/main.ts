import { GloablSerializeInterceptor, GlobalValidationPipe, GlobalExceptionFilter, ServerConfigService } from '@core';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverConfigService = app.get(ServerConfigService);

  app.enableCors(serverConfigService.corsOptions);
  app.useGlobalInterceptors(app.get(GloablSerializeInterceptor));
  app.useGlobalPipes(app.get(GlobalValidationPipe));
  app.useGlobalFilters(app.get(GlobalExceptionFilter));

  await app.listen(serverConfigService.port, serverConfigService.host);
}
bootstrap();
