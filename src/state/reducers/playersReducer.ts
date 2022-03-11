import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Team } from '../../types';

const initialState: Team = {
  players: [
    { idx: 0, name: null, sprite: null },
    { idx: 1, name: null, sprite: null },
    { idx: 2, name: null, sprite: null },
    { idx: 3, name: null, sprite: null },
    { idx: 4, name: null, sprite: null },
    { idx: 5, name: null, sprite: null },
  ],
};

const reducer = (state: Team = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.ADD_PLAYER: {
      const { idx, player } = action.payload;
      const playerObj = {
        idx: idx,
        name: player.name,
        sprite: player.sprite,
      };
      return {
        ...state,
        players: state.players.map((player) => {
          if (player.idx === idx) {
            return playerObj;
          }
          return player;
        }),
      };
    }
    case ActionType.REMOVE_PLAYER: {
      const { idx } = action.payload;

      const playerObj = {
        idx: idx,
        name: null,
        sprite: null,
      };
      return {
        ...state,
        players: state.players.map((player) => {
          if (player.idx === idx) {
            return playerObj;
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
