import { ExtendedWS } from '../types';
import { DB } from '../db';
import { generateRandomNumber } from '../helpers/generateRandomNumber';
import { updateRooms } from './updateRooms';

export const createRoom = (ws: ExtendedWS, db: DB) => {
  const roomId = generateRandomNumber();
  db.createRoom(roomId);
  db.addUserToRoom(roomId, ws.connectionId);
  updateRooms(db);
};
