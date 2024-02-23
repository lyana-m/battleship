import { DB } from '../db';
import { ExtendedWS } from '../types';

export const startGame = (gameId: number, ws: ExtendedWS, db: DB) => {
  const players = db.getGamePlayers(gameId);

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
};
