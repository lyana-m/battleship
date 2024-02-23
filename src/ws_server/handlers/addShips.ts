import { DB } from '../db';
import { convertShipsToMatrix } from '../helpers/convertShipsToMatrix';
import { AddShipsRequest, ExtendedWS } from '../types';
import { startGame } from './startGame';

export const addShips = (data: AddShipsRequest['data'], ws: ExtendedWS, db: DB) => {
  const gameId = data.gameId;
  const shipMatrix = convertShipsToMatrix(data.ships);
  const playerId = db.getUserByConnectionId(ws.connectionId).userId;

  db.addPlayerShips(gameId, playerId, shipMatrix);
  db.addPlayerRowShips(gameId, playerId, data.ships);

  if (db.isGameReady(gameId)) {
    startGame(gameId, ws, db);
  }
};
