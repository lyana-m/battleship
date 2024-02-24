import { ExtendedWS, Game, Room, RowShip, ShipMatrix, User } from './types';

export class DB {
  constructor(
    private _connections: ExtendedWS[] = [],
    private _users: User[] = [],
    private _rooms: Room[] = [],
    private _games: Game[] = []
  ) {}

  // USERS
  addUser(user: User) {
    this._users.push(user);
  }

  getUsers() {
    return this._users;
  }

  getUserById(userId: number) {
    return this._users.find((u) => u.userId === userId);
  }

  getUserByName(name: string) {
    return this._users.find((u) => u.name === name);
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
    const connectionId = this._users.find((u) => u.userId === userId).connectionId;

    return this.getConnectionById(connectionId);
  }

  // ROOMS
  createRoom(roomId: number) {
    this._rooms.push({ roomId, users: [] });
  }

  getRooms() {
    return this._rooms;
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

  deleteRoom(roomId: number) {
    this._rooms = this._rooms.filter((room) => room.roomId !== roomId);
  }

  // GAMES
  addGame(gameId: number, roomId: number) {
    this._games.push({
      roomId,
      gameId,
      players: [],
    });
  }

  getGames() {
    return this._games;
  }

  getGameById(gameId: number) {
    return this._games.find((game) => game.gameId === gameId);
  }

  getGamePlayers(gameId: number) {
    return this.getGameById(gameId).players;
  }

  getPlayerById(gameId: number, playerId: number) {
    const game = this.getGameById(gameId);

    return game.players.find((player) => player.playerId === playerId);
  }

  addPlayerToGame(gameId: number, playerId: number) {
    const game = this.getGameById(gameId);

    game.players.push({
      playerId,
      ships: [],
      rowShips: [],
    });
  }

  addPlayerShips(gameId: number, playerId: number, shipMatrix: ShipMatrix) {
    const game = this.getGameById(gameId);

    game.players.forEach((player) => {
      if (player.playerId === playerId) {
        player.ships = shipMatrix;
      }
    });
  }

  addPlayerRowShips(gameId: number, playerId: number, rowShips: RowShip[]) {
    const game = this.getGameById(gameId);

    game.players.forEach((player) => {
      if (player.playerId === playerId) {
        player.rowShips = rowShips;
      }
    });
  }

  isGameReady(gameId: number) {
    const game = this.getGameById(gameId);

    return game.players.every((player) => player.ships.length);
  }

  isGameFinished(gameId: number, enemyId: number) {
    const player = this.getPlayerById(gameId, enemyId);

    return player.ships.every((ship) => ship.every((deck) => deck.state === 'killed'));
  }

  setCurrentPlayer(gameId: number, currentPlayerId: number) {
    const game = this.getGameById(gameId);

    game.currentPlayerId = currentPlayerId;
  }

  getCurrentPlayer(gameId: number) {
    const game = this.getGameById(gameId);

    return game.currentPlayerId;
  }
}
