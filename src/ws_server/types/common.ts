import { WebSocket } from 'ws';

export type ExtendedWS = WebSocket & { connectionId: number };
