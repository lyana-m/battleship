import { ExtendedWS } from '../types';
import { DB } from '../db';
import { generateRandomNumber } from '../helpers/generateRandomNumber';
import { updateRooms } from './updateRooms';

export const createRoom = (ws: ExtendedWS, db: DB) => {
  const user = db.getUserByConnectionId(ws.connectionId);
  const rooms = db.getRooms();

  const isUserAlreadyInRoom = rooms.some((room) => room.users.includes(user.userId));

  if (isUserAlreadyInRoom) {
    return;
  }

  const roomId = generateRandomNumber();
  db.createRoom(roomId);
  db.addUserToRoom(roomId, ws.connectionId);
  updateRooms(db);
};
