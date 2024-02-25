import { DB } from '../db';
import { generateRandomNumber } from '../helpers/generateRandomNumber';

export const createGame = (roomId: number, db: DB) => {
  const roomUsers = db.getUsersInRoom(roomId);
  const gameId = generateRandomNumber();

  db.addGame(gameId, roomId);

  roomUsers.forEach((user) => {
    db.addPlayerToGame(gameId, user.userId);

    const connection = db.getConnectionById(user.connectionId);
    const responseData = { idGame: gameId, idPlayer: user.userId };

    connection.send(
      JSON.stringify({
        type: 'create_game',
        data: JSON.stringify(responseData),
        id: 0,
      })
    );

    console.log('sent command: create_game');
    console.log('sent data:', responseData);
  });
};
