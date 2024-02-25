import { ShipMatrix, ShipState } from '../types';

export const checkAttack = (matrix: ShipMatrix, x: number, y: number) => {
  const ships = [...matrix];
  const index = ships.findIndex((ship) => ship.some((cell) => cell.x === x && cell.y === y));

  if (index === -1) {
    return {
      cells: [{ x, y, state: 'miss' as ShipState }],
      ships,
      oneMoreAttack: false,
    };
  }

  const targetShip = ships[index];
  const targetShipAfterAttack = targetShip.map((deck) => {
    if (deck.x === x && deck.y === y) {
      return { ...deck, state: 'shot' as ShipState };
    }
    return deck;
  });

  const allDeckKilled = targetShipAfterAttack.every((deck) => deck.state === 'shot');

  if (allDeckKilled) {
    const updatedShip = targetShipAfterAttack.map((deck) => ({ ...deck, state: 'killed' as ShipState }));
    ships[index] = updatedShip;

    return {
      cells: updatedShip,
      ships,
      oneMoreAttack: true,
    };
  } else {
    ships[index] = targetShipAfterAttack;

    return {
      cells: [{ x, y, state: 'shot' }],
      ships,
      oneMoreAttack: true,
    };
  }

  // const roundCells = [
  //   {x: x, y: y - 1},
  //   {x: x + 1, y: y - 1},
  //   {x: x + 1, y: y},
  //   {x: x + 1, y: y + 1},
  //   {x: x, y: y + 1},
  //   {x: x - 1, y: y + 1},
  //   {x: x - 1, y: y},
  //   {x: x - 1, y: y - 1},
  // ]
};
