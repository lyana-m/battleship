import { RowShip } from './requests';

export type ShipState = 'ship' | 'shot' | 'killed' | 'miss';

export type ShipMatrix = Ship[][];

export type Ship = {
  x: number;
  y: number;
  state: ShipState;
}

export type Player = {
  playerId: number; // userId
  ships: ShipMatrix;
  rowShips: RowShip[];
};

export type Game = {
  roomId: number;
  gameId: number;
  currentPlayerId?: number;
  players: Player[];
};
