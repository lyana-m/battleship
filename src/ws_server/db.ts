import { ExtendedWS, Room, User } from './types';

export class DB {
  constructor(private _users: User[] = [], private _rooms: Room[] = [], private _connections: ExtendedWS[] = []) {}

  // USERS
  addUser(user: User) {
    this._users.push(user);
  }

  getUserById(userId: number) {
    return this._users.find((u) => u.userId === userId);
  }

  getUserByConnectionId(connectionId: number) {
    return this._users.find((u) => u.connectionId === connectionId);
  }

  // CONNECTIONS
  addConnection(ws: ExtendedWS) {
    this._connections.push(ws);
  }

  getConnections() {
    return this._connections;
  }

  getConnectionById(connectionId: number) {
    return this._connections.find((connection) => connection.connectionId === connectionId);
  }

  getConnectionByUserId(userId: number) {
    const user = this._users.find((u) => u.userId === userId);

    return this.getConnectionByUserId(user.userId);
  }

  // ROOMS
  createRoom(roomId: number) {
    this._rooms.push({ roomId, users: [] });
  }

  getAvailableRooms() {
    return this._rooms.filter((room) => room.users.length === 1);
  }

  getRoomById(roomId: number) {
    return this._rooms.find((room) => room.roomId === roomId);
  }

  addUserToRoom(roomId: number, connectionId: number) {
    const user = this.getUserByConnectionId(connectionId);

    this._rooms.forEach((room) => {
      if (room.roomId === roomId) {
        room.users.push(user.userId);
      }
    });
  }

  isRoomReady(roomId: number) {
    const room = this.getRoomById(roomId);

    return room.users.length === 2;
  }

  getUsersInRoom(roomId: number) {
    const roomUsers = this.getRoomById(roomId).users;

    return roomUsers.map((userId) => this.getUserById(userId));
  }
}
