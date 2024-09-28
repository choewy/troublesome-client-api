import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { SwaggerDocumentOptions } from './types';

import { RequestHeader } from '@/common';

export class Swagger {
  public static setup(app: INestApplication, options: SwaggerDocumentOptions) {
    const builder = new DocumentBuilder();

    if (options?.title) {
      builder.setTitle(options?.title);
    }

    if (options?.description) {
      builder.setDescription(options?.description);
    }

    if (options?.version) {
      builder.setVersion(options?.version);
    }

    if (options?.server?.url) {
      builder.addServer(options?.server?.url, options?.server?.description, options?.server?.variables);
    }

    builder.addBearerAuth(
      {
        name: RequestHeader.AccessToken,
        type: 'http',
        in: 'header',
        scheme: 'bearer',
      },
      RequestHeader.AccessToken,
    );

    builder.addApiKey(
      {
        name: RequestHeader.RefreshToken,
        type: 'apiKey',
        in: 'header',
      },
      RequestHeader.RefreshToken,
    );

    SwaggerModule.setup('api-docs', app, SwaggerModule.createDocument(app, builder.build()));
  }
}
