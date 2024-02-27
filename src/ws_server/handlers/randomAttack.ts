import { DB } from '../db';
import {generateRandomNumber} from '../helpers';
import { ExtendedWS, RandomAttackRequest } from '../types';
import {attack} from './attack';

export const randomAttack = (data: RandomAttackRequest['data'], ws: ExtendedWS, db: DB) => {
  const x = generateRandomNumber(10);
  const y = generateRandomNumber(10);

  attack({gameId: data.gameId, x, y, indexPlayer: data.indexPlayer}, ws, db)
};
