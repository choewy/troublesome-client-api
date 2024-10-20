import { NodeEnv } from '../enums';

export const getEnv = (): NodeEnv => (process.env.NODE_ENV ?? NodeEnv.Local) as NodeEnv;
export const isLocal = () => getEnv() === NodeEnv.Local;
export const isTest = () => getEnv() === NodeEnv.Test;
export const isDevelopment = () => getEnv() === NodeEnv.Development;
export const isProduction = () => getEnv() === NodeEnv.Production;
