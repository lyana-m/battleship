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

export type Ship = {
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
    ships: Ship[];
    indexPlayer: number;
  };
  id: number;
};
