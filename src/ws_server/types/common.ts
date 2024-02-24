import { WebSocket } from 'ws';

export type ExtendedWS = WebSocket & { connectionId: number };

export type Winner = {
  name: string;
  wins: number;
}
