import { RowShip, ShipMatrix } from '../types';

export const convertShipsToMatrix = (ships: RowShip[]) => {
  const matrix: ShipMatrix = new Array(10).fill('emp').map(() => new Array(10).fill('emp'));

  for (let i = 0; i < ships.length; i++) {
    const ship = ships[i];
    const start = ship.position;
    const length = ship.length;

    matrix[start.y][start.x] = 'shp';

    if (length === 1) continue;

    if (ship.direction) {
      let y = start.y + 1;
      while (y < start.y + length) {
        matrix[y][start.x] = 'shp';
        y++;
      }
    } else {
      let x = start.x + 1;
      while (x < start.x + length) {
        matrix[start.y][x] = 'shp';
        x++;
      }
    }
  }

  return matrix;
};
