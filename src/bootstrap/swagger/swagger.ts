import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { SwaggerDocumentOptions } from './types';

import { RequestHeader } from '@/common';

export class Swagger {
  public static setup(app: INestApplication, swaggerDocumentOptions: SwaggerDocumentOptions) {
    const builder = new DocumentBuilder();

    if (swaggerDocumentOptions?.title) {
      builder.setTitle(swaggerDocumentOptions?.title);
    }

    if (swaggerDocumentOptions?.description) {
      builder.setDescription(swaggerDocumentOptions?.description);
    }

    if (swaggerDocumentOptions?.version) {
      builder.setVersion(swaggerDocumentOptions?.version);
    }

    if (swaggerDocumentOptions?.server?.url) {
      builder.addServer(
        swaggerDocumentOptions?.server?.url,
        swaggerDocumentOptions?.server?.description,
        swaggerDocumentOptions?.server?.variables,
      );
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

    const swaggerCustomOptions = {
      swaggerOptions: {
        docExpansion: 'none',
        authAction: {},
      },
    };

    if (swaggerDocumentOptions?.authOption?.accessToken) {
      swaggerCustomOptions.swaggerOptions.authAction[RequestHeader.AccessToken] = {
        schema: {
          type: 'http',
          in: 'header',
          schema: 'bearer',
        },
        value: swaggerDocumentOptions.authOption?.accessToken,
      };
    }

    if (swaggerDocumentOptions?.authOption?.refreshToken) {
      swaggerCustomOptions.swaggerOptions.authAction[RequestHeader.RefreshToken] = {
        schema: {
          type: 'apiKey',
          in: 'header',
        },
        value: swaggerDocumentOptions.authOption?.refreshToken,
      };
    }

    SwaggerModule.setup('api-docs', app, SwaggerModule.createDocument(app, builder.build()), swaggerCustomOptions);
  }
}
