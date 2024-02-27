import { DB } from '../db';

export const turn = (gameId: number, db: DB) => {
  const players = db.getGamePlayers(gameId);
  const currentPlayer = db.getCurrentPlayer(gameId);

  players.forEach((player) => {
    const connection = db.getConnectionByUserId(player.playerId);
    const responseData = {
      currentPlayer,
    }

    connection.send(
      JSON.stringify({
        type: 'turn',
        data: JSON.stringify(responseData),
        id: 0,
      })
    );

    console.log('sent command: turn');
    console.log('sent data:', responseData);
  });
};
