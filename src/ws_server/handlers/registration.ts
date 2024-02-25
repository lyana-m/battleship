import { ExtendedWS, RegistrationRequest } from '../types';
import { DB } from '../db';
import { generateRandomNumber } from '../helpers/generateRandomNumber';
import { updateRooms } from './updateRooms';
import { updateWinners } from './updateWinners';

export const registerUser = (userData: RegistrationRequest['data'], ws: ExtendedWS, db: DB) => {
  const user = db.getUserByName(userData.name);

  if (user) {
    if (user.connectionId === -1) {
      // пользователь зарегистрирован и отключен
      if (user.password === userData.password) {
        // авторизуем
        const responseData = {
          name: user.name,
          index: user.userId,
          error: false,
          errorText: '',
        };

        db.setUserConnectionId(user.userId, ws.connectionId);

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
      } else {
        // введен неверный пароль
        const responseData = {
          name: userData.name,
          index: -1,
          error: true,
          errorText: `Wrong password for user with name ${userData.name}`,
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
      }
    } else {
      // пользователь зарегистрирован и подключен
      const responseData = {
        name: userData.name,
        index: -1,
        error: true,
        errorText: `User with name ${userData.name} has active connection`,
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
    }

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
