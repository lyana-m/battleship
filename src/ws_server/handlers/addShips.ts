import { DB } from '../db';
import {convertRowShips} from '../helpers';
import { AddShipsRequest, ExtendedWS } from '../types';
import { startGame } from './startGame';

export const addShips = (data: AddShipsRequest['data'], ws: ExtendedWS, db: DB) => {
  const gameId = data.gameId;
  const ships = convertRowShips(data.ships);
  const playerId = db.getUserByConnectionId(ws.connectionId).userId;

  db.addPlayerShips(gameId, playerId, ships);
  db.addPlayerRowShips(gameId, playerId, data.ships);

  if (db.isGameReady(gameId)) {
    startGame(gameId, db);
  }
};
