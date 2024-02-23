import { DB } from '../db';
import { generateRandomNumber } from '../helpers/generateRandomNumber';

export const createGame = (roomId: number, db: DB) => {
  const roomUsers = db.getUsersInRoom(roomId);
  const gameId = generateRandomNumber();

  db.addGame(gameId);

  roomUsers.forEach((user) => {
    db.addPlayerToGame(gameId, user.userId);

    const connection = db.getConnectionById(user.connectionId);
    connection.send(
      JSON.stringify({
        type: 'create_game',
        data: JSON.stringify({ idGame: gameId, idPlayer: user.userId }),
        id: 0,
      })
    );
  });
};
