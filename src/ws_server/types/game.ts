import { RowShip } from './requests';

export type ShipState = 'shp' | 'emp' | 'wnd' | 'kld';

export type ShipMatrix = ShipState[][];

export type Player = {
  playerId: number; // userId
  ships: ShipMatrix;
  rowShips: RowShip[];
};

export type Game = {
  gameId: number;
  currentPlayerId?: number;
  players: Player[];
};
