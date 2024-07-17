import { ServerConfigService } from '@core';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverConfigService = app.get(ServerConfigService);

  app.enableCors(serverConfigService.corsOptions);

  await app.listen(serverConfigService.port, serverConfigService.host);
}
bootstrap();
