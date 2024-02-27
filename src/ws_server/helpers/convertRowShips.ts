import { RowShip, Ship, ShipMatrix } from '../types';

export const convertRowShips = (ships: RowShip[]) => {
  const shipMatrix: ShipMatrix = [];

  for (let i = 0; i < ships.length; i++) {
    const ship = ships[i];
    const start = ship.position;
    const length = ship.length;

    if (ship.direction) {
      const shipArr: Ship[] = [];
      let y = start.y;
      while (y < start.y + length) {
        shipArr.push({
          x: start.x,
          y,
          state: 'ship',
        });
        y++;
      }
      shipMatrix.push(shipArr);
    } else {
      const shipArr: Ship[] = [];
      let x = start.x;
      while (x < start.x + length) {
        shipArr.push({
          x,
          y: start.y,
          state: 'ship',
        });
        x++;
      }
      shipMatrix.push(shipArr);
    }
  }

  return shipMatrix;
};
