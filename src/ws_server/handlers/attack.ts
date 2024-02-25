import { DB } from '../db';
import { checkAttack } from '../helpers';
import { AttackRequest, ExtendedWS } from '../types';
import { finish } from './finish';
import { turn } from './turn';
import { updateWinners } from './updateWinners';

export const attack = (data: AttackRequest['data'], ws: ExtendedWS, db: DB) => {
  const currentPlayer = db.getCurrentPlayer(data.gameId);

  if (currentPlayer !== data.indexPlayer) {
    return;
  }

  const players = db.getGamePlayers(data.gameId);

  const enemy = players.find((p) => p.playerId !== data.indexPlayer);

  const result = checkAttack(enemy.ships, data.x, data.y);

  db.addPlayerShips(data.gameId, enemy.playerId, result.ships);

  if (db.isGameFinished(data.gameId, enemy.playerId)) {
    const winner = db.getUserById(data.indexPlayer);
    db.addWinner(winner.name);

    players.forEach((player) => {
      const connection = db.getConnectionByUserId(player.playerId);

      result.cells.forEach((cell) => {
        connection.send(
          JSON.stringify({
            type: 'attack',
            data: JSON.stringify({
              position: {
                x: cell.x,
                y: cell.y,
              },
              currentPlayer: data.indexPlayer,
              status: cell.state,
            }),
            id: 0,
          })
        );
      });
    });

    finish(data.gameId, data.indexPlayer, db);
    updateWinners(db);
  } else {
    db.setCurrentPlayer(data.gameId, result.oneMoreAttack ? data.indexPlayer : enemy.playerId);

    players.forEach((player) => {
      const connection = db.getConnectionByUserId(player.playerId);

      result.cells.forEach((cell) => {
        connection.send(
          JSON.stringify({
            type: 'attack',
            data: JSON.stringify({
              position: {
                x: cell.x,
                y: cell.y,
              },
              currentPlayer: data.indexPlayer,
              status: cell.state,
            }),
            id: 0,
          })
        );
      });
    });

    turn(data.gameId, db);
  }
};
