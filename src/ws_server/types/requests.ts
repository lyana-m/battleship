export type RequestType = 'reg' | 'create_room' | 'add_user_to_room' | 'add_ships' | 'attack' | 'randomAttack';

export type Request = {
  type: RequestType;
  data: string;
};

export type RegistrationRequest = {
  type: 'reg';
  data: {
    name: string;
    password: string;
  };
  id: number;
};

export type AddUserRequest = {
  type: 'add_user_to_room';
  data: {
    indexRoom: number;
  };
  id: number;
};

export type RowShip = {
  position: {
    x: number;
    y: number;
  };
  direction: boolean;
  length: number;
  type: 'small' | 'medium' | 'large' | 'huge';
};

export type AddShipsRequest = {
  type: 'add_ships';
  data: {
    gameId: number;
    ships: RowShip[];
    indexPlayer: number;
  };
  id: number;
};

export type AttackRequest = {
  type: 'attack';
  data: {
    gameId: number;
    x: number;
    y: number;
    indexPlayer: number;
  };
  id: number;
};
