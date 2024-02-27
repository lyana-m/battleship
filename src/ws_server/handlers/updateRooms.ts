import { DB } from '../db';

export const updateRooms = (db: DB) => {
  const availableRooms = db.getAvailableRooms();
  const connections = db.getConnections();

  const responseData = availableRooms.map((room) => ({
    roomId: room.roomId,
    roomUsers: room.users.map((userId) => {
      const user = db.getUserById(userId);
      return { name: user.name, index: user.userId };
    }),
  }));

  connections.forEach((connection) => {
    connection.send(
      JSON.stringify({
        type: 'update_room',
        data: JSON.stringify(responseData),
        id: 0,
      })
    );

    console.log('sent command: update_room');
    console.log('sent data:', responseData);
  });
};
