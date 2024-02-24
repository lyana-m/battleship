import { RowShip } from './requests';

export type ShipState = 'ship' | 'shot' | 'killed';

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
  gameId: number;
  currentPlayerId?: number;
  players: Player[];
};

export type AttackResult = 'miss' | 'killed' | 'shot';
