import { DB } from '../db';

export const updateWinners = (db: DB) => {
  const winners = db.getWinners();
  const connections = db.getConnections();

  connections.forEach((connection) => {
    connection.send(JSON.stringify({ type: 'update_winners', data: JSON.stringify(winners), id: 0 }));
  });
};
