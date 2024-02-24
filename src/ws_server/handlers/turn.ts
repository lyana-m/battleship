import { DB } from '../db';

export const turn = (gameId: number, db: DB) => {
  const players = db.getGamePlayers(gameId);
  const currentPlayer = db.getCurrentPlayer(gameId);

  players.forEach((player) => {
    const connection = db.getConnectionByUserId(player.playerId);

    connection.send(
      JSON.stringify({
        type: 'turn',
        data: JSON.stringify({
          currentPlayer,
        }),
        id: 0,
      })
    );
  });
};
