

export type User = {
  name: string;
  password: string;
  userId: number;
  connectionId: number;
};




export type ResponseType =
  | 'reg'
  | 'update_winners'
  | 'create_game'
  | 'update_room'
  | 'start_game'
  | 'attack'
  | 'turn'
  | 'finish';
