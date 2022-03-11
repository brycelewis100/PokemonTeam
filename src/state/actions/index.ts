import { ActionType } from '../action-types';

export interface AddPlayerAction {
  type: ActionType.ADD_PLAYER;
  payload: {
    idx: number;
    player: {
      name: string | null;
      sprite: string | null;
    };
  };
}

export interface RemovePlayerAction {
  type: ActionType.REMOVE_PLAYER;
  payload: {
    idx: number;
  };
}

export type Action = AddPlayerAction | RemovePlayerAction;
