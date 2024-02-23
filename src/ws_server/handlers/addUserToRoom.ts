import { AddUserRequest, ExtendedWS } from '../types';
import { DB } from '../db';
import { updateRooms } from './updateRooms';
import { generateRandomNumber } from '../helpers/generateRandomNumber';

export const addUserToRoom = (data: AddUserRequest['data'], ws: ExtendedWS, db: DB) => {
  const roomId = data.indexRoom;
  db.addUserToRoom(roomId, ws.connectionId);
  updateRooms(db);

  if (db.isRoomReady(roomId)) {
    const roomUsers = db.getUsersInRoom(roomId);
    const gameId = generateRandomNumber();

    roomUsers.forEach((user) => {
      const connection = db.getConnectionById(user.connectionId);
      connection.send(
        JSON.stringify({
          type: 'create_game',
          data: JSON.stringify({ idGame: gameId, idPlayer: user.userId }),
          id: 0,
        })
      );
    });
  }
};
