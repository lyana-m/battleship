import { WebSocket } from 'ws';

export type ExtendedWS = WebSocket & { connectionId: number };

export type User = {
  name: string;
  password: string;
  userId: number;
  connectionId: number;
};

export type ResponseType =
  | 'reg'
  | 'update_winners'
  | 'create_game'
  | 'update_room'
  | 'start_game'
  | 'attack'
  | 'turn'
  | 'finish';

export type Winner = {
  name: string;
  wins: number;
}
