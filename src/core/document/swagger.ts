import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { SwaggerDocumentOptions } from './types';

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

    SwaggerModule.setup('api-docs', app, SwaggerModule.createDocument(app, builder.build()));
  }
}
