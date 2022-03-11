import { isPartiallyEmittedExpression } from 'typescript';
import { addPlayer } from '../action-creators';
import { ActionType } from '../action-types';
import { Action } from '../actions';

import produce from 'immer';

export interface PlayerState {
  idx: number;
  name: null | string;
  sprite: null | string;
}
export interface TeamState {
  players: PlayerState[];
}

const initialState: TeamState = {
  players: [
    { idx: 0, name: null, sprite: null },
    { idx: 1, name: null, sprite: null },
    { idx: 2, name: null, sprite: null },
    { idx: 3, name: null, sprite: null },
    { idx: 4, name: null, sprite: null },
    { idx: 5, name: null, sprite: null },
  ],
};

const reducer = (state: TeamState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.ADD_PLAYER: {
      const { idx, player } = action.payload;

      const playerComplete = {
        idx: idx,
        name: player.name,
        sprite: player.sprite,
      };

      return {
        ...state,
        players: state.players.map((player) => {
          if (player.idx === idx) {
            return playerComplete;
          }
          return player;
        }),
      };
    }

    case ActionType.REMOVE_PLAYER: {
      const { idx } = action.payload;

      const playerCompelte = {
        idx: idx,
        name: null,
        sprite: null,
      };

      return {
        ...state,
        players: state.players.map((player) => {
          if (player.idx === idx) {
            return playerCompelte;
          }
          return player;
        }),
      };
    }

    default:
      return state;
  }
};
export default reducer;
