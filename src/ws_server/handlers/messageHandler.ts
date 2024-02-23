import { AddShipsRequest, AddUserRequest, ExtendedWS, RegistrationRequest, Request } from '../types';
import { registerUser } from './registration';
import { DB } from '../db';
import { createRoom } from './createRoom';
import { addUserToRoom } from './addUserToRoom';
import { addShips } from './addShips';

export const messageHandler = (req: Request, ws: ExtendedWS, db: DB) => {
  switch (req.type) {
    case 'reg':
      registerUser(JSON.parse(req.data) as RegistrationRequest['data'], ws, db);
      break;

    case 'create_room':
      createRoom(ws, db);
      break;

    case 'add_user_to_room':
      addUserToRoom(JSON.parse(req.data) as AddUserRequest['data'], ws, db);
      break;

    case 'add_ships':
      addShips(JSON.parse(req.data) as AddShipsRequest['data'], ws, db);
      break;
  }
};
