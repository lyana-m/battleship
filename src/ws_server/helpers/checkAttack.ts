import { ShipMatrix, ShipState } from '../types';

export const checkAttack = (matrix: ShipMatrix, x: number, y: number) => {
  const ships = [...matrix];
  const index = ships.findIndex((ship) => ship.some((cell) => cell.x === x && cell.y === y));

  if (index === -1) {
    return {
      attackResult: [{ x, y, state: 'miss' as ShipState }],
      ships,
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
      attackResult: updatedShip,
      ships,
    };
  } else {
    ships[index] = targetShipAfterAttack;

    return {
      attackResult: [{ x, y, state: 'shot' }],
      ships,
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
