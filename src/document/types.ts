import { ServerVariableObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export type SwaggerDocumentOptions = {
  title?: string;
  description?: string;
  version?: string;
  server?: {
    url: string;
    description?: string;
    variables?: Record<string, ServerVariableObject>;
  };
  authOption?: {
    accessToken?: string;
    refreshToken?: string;
  };
};
