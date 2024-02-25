import { ExtendedWS, RegistrationRequest } from '../types';
import { DB } from '../db';
import { generateRandomNumber } from '../helpers/generateRandomNumber';
import { updateRooms } from './updateRooms';
import { updateWinners } from './updateWinners';

export const registerUser = (userData: RegistrationRequest['data'], ws: ExtendedWS, db: DB) => {
  if (db.getUserByName(userData.name)) {
    const responseData = {
      name: userData.name,
      index: -1,
      error: true,
      errorText: `User with name ${userData.name} is already authorized`,
    };

    ws.send(
      JSON.stringify({
        type: 'reg',
        data: JSON.stringify(responseData),
        id: 0,
      })
    );

    console.log('sent command: reg');
    console.log('sent data:', responseData);
    return;
  }

  const newUser = {
    userId: generateRandomNumber(),
    name: userData.name,
    password: userData.password,
    connectionId: ws.connectionId,
  };
  const responseData = {
    name: newUser.name,
    index: newUser.userId,
    error: false,
    errorText: '',
  };

  db.addUser(newUser);
  ws.send(
    JSON.stringify({
      type: 'reg',
      data: JSON.stringify(responseData),
      id: 0,
    })
  );

  console.log('sent command: reg');
  console.log('sent data:', responseData);

  updateRooms(db);
  updateWinners(db);
};
