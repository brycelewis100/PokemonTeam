import { ActionType } from '../action-types';
import { AddPlayerAction, RemovePlayerAction } from '../actions';
import { PlayerInt } from '../player';

export const addPlayer = (idx: number, player: PlayerInt): AddPlayerAction => {
  return {
    type: ActionType.ADD_PLAYER,
    payload: {
      idx,
      player,
    },
  };
};

export const removePlayer = (idx: number): RemovePlayerAction => {
  return {
    type: ActionType.REMOVE_PLAYER,
    payload: {
      idx,
    },
  };
};
