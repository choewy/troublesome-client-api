import io from 'socket.io-client';

import { config } from './config';

export const socketClient = io(config.API_URL, {});
