import { AddUserRequest, ExtendedWS } from '../types';
import { DB } from '../db';
import { updateRooms } from './updateRooms';
import { createGame } from './createGame';

export const addUserToRoom = (data: AddUserRequest['data'], ws: ExtendedWS, db: DB) => {
  const roomId = data.indexRoom;
  db.addUserToRoom(roomId, ws.connectionId);
  updateRooms(db);

  if (db.isRoomReady(roomId)) {
    createGame(roomId, db);
  }
};
