import { RowShip, ShipMatrix } from '../types';

export const convertRowShips = (ships: RowShip[]): ShipMatrix => {
  const shipMatrix = [];

  for (let i = 0; i < ships.length; i++) {
    const ship = ships[i];
    const start = ship.position;
    const length = ship.length;

    if (ship.direction) {
      const ship = [];
      let y = start.y;
      while (y < start.y + length) {
        ship.push({
          x: start.x,
          y,
          state: 'ship',
        });
        y++;
      }
      shipMatrix.push(ship);
    } else {
      const ship = [];
      let x = start.x;
      while (x < start.x + length) {
        ship.push({
          x,
          y: start.y,
          state: 'ship',
        });
        x++;
      }
      shipMatrix.push(ship);
    }
  }

  return shipMatrix;
};
