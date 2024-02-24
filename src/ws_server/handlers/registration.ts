import { ExtendedWS, RegistrationRequest } from '../types';
import { DB } from '../db';
import { generateRandomNumber } from '../helpers/generateRandomNumber';
import { updateRooms } from './updateRooms';

export const registerUser = (userData: RegistrationRequest['data'], ws: ExtendedWS, db: DB) => {
  if (db.getUserByName(userData.name)) {
    ws.send(
      JSON.stringify({
        type: 'reg',
        data: JSON.stringify({
          name: userData.name,
          index: -1,
          error: true,
          errorText: `User with name ${userData.name} is already authorized`,
        }),
        id: 0,
      })
    );
    return;
  }

  const newUser = {
    userId: generateRandomNumber(),
    name: userData.name,
    password: userData.password,
    connectionId: ws.connectionId,
  };

  db.addUser(newUser);
  ws.send(
    JSON.stringify({
      type: 'reg',
      data: JSON.stringify({
        name: newUser.name,
        index: newUser.userId,
        error: false,
        errorText: '',
      }),
      id: 0,
    })
  );
  console.log({type: 'reg', data: {
    name: newUser.name,
    index: newUser.userId,
    error: false,
    errorText: '',
  }})
  updateRooms(db);
};
