import { DB } from '../db';
import { checkAttack } from '../helpers';
import { AttackRequest, ExtendedWS } from '../types';
import { finish } from './finish';
import { turn } from './turn';

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
    players.forEach((player) => {
      const connection = db.getConnectionByUserId(player.playerId);

      result.attackResult.forEach((r) => {
        connection.send(
          JSON.stringify({
            type: 'attack',
            data: JSON.stringify({
              position: {
                x: r.x,
                y: r.y,
              },
              currentPlayer: data.indexPlayer,
              status: r.state,
            }),
            id: 0,
          })
        );
      });
    });

    finish(data.gameId, data.indexPlayer, db);
  } else {
    db.setCurrentPlayer(data.gameId, enemy.playerId);

    players.forEach((player) => {
      const connection = db.getConnectionByUserId(player.playerId);

      result.attackResult.forEach((r) => {
        connection.send(
          JSON.stringify({
            type: 'attack',
            data: JSON.stringify({
              position: {
                x: r.x,
                y: r.y,
              },
              currentPlayer: data.indexPlayer,
              status: r.state,
            }),
            id: 0,
          })
        );
      });
    });

    turn(data.gameId, db);
  }
};
