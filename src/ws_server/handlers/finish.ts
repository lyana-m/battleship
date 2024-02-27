import { DB } from '../db';

export const finish = (gameId: number, winnerId: number, db: DB) => {
  const game = db.getGameById(gameId);
  const players = db.getGamePlayers(gameId);

  db.deleteRoom(game.roomId);

  players.forEach((player) => {
    const connection = db.getConnectionByUserId(player.playerId);
    const responseData = {
      winPlayer: winnerId,
    };

    connection.send(
      JSON.stringify({
        type: 'finish',
        data: JSON.stringify(responseData),
        id: 0,
      })
    );

    console.log('sent command: finish');
    console.log('sent data:', responseData);
  });
};
