import { AddUserRequest, ExtendedWS } from '../types';
import { DB } from '../db';
import { updateRooms } from './updateRooms';
import { createGame } from './createGame';

export const addUserToRoom = (data: AddUserRequest['data'], ws: ExtendedWS, db: DB) => {
  const roomId = data.indexRoom;
  const user = db.getUserByConnectionId(ws.connectionId);
  const room = db.getRoomById(roomId);

  if (room.users.includes(user.userId)) {
    return;
  }

  db.addUserToRoom(roomId, ws.connectionId);
  updateRooms(db);

  if (db.isRoomReady(roomId)) {
    createGame(roomId, db);
  }
};
