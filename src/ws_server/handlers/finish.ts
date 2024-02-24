import { DB } from '../db';

export const finish = (gameId: number, winnerId: number, db: DB) => {
  const game = db.getGameById(gameId);
  const players = db.getGamePlayers(gameId);

  db.deleteRoom(game.roomId);

  players.forEach((player) => {
    const connection = db.getConnectionByUserId(player.playerId);

    connection.send(
      JSON.stringify({
        type: 'finish',
        data: JSON.stringify({
          winPlayer: winnerId,
        }),
        id: 0,
      })
    );
  });
};
