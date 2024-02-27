import { Ship } from '../types';

export const getMissedCells = (ship: Ship[]) => {
  const length = ship.length;
  const missedCells: Ship[] = [];

  for (let i = 0; i < length; i++) {
    const x = ship[i].x;
    const y = ship[i].y;

    const roundCells = [
      { x: x, y: y - 1 },
      { x: x + 1, y: y - 1 },
      { x: x + 1, y: y },
      { x: x + 1, y: y + 1 },
      { x: x, y: y + 1 },
      { x: x - 1, y: y + 1 },
      { x: x - 1, y: y },
      { x: x - 1, y: y - 1 },
    ];

    for (let j = 0; j < roundCells.length; j++) {
      const cell = roundCells[j];

      if (cell.x < 0 || cell.x > 9) continue;

      if (cell.y < 0 || cell.y > 9) continue;

      if (ship.some((deck) => deck.x === cell.x && deck.y === cell.y)) continue;

      if (missedCells.some((missCell) => missCell.x === cell.x && missCell.y === cell.y)) continue;

      missedCells.push({ x: cell.x, y: cell.y, state: 'miss' });
    }
  }

  return missedCells;
};
