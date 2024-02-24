import { DB } from '../db';
import { turn } from './turn';

export const startGame = (gameId: number, db: DB) => {
  const players = db.getGamePlayers(gameId);
  const currentPlayer = players[0].playerId;

  db.setCurrentPlayer(gameId, currentPlayer);

  players.forEach((player) => {
    const connection = db.getConnectionByUserId(player.playerId);

    connection.send(
      JSON.stringify({
        type: 'start_game',
        data: JSON.stringify({
          ships: player.rowShips,
          currentPlayerIndex: player.playerId,
        }),
        id: 0,
      })
    );
  });

  turn(gameId, db);
};
