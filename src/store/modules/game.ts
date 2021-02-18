import { ActionContext } from 'vuex';
import * as fromActionUtils from './action-utils';
import { Board, GameState, Player } from './models';
import * as fromMutationTypes from './mutation-types';

interface StartGamePayload { board: Board; players: Player[]}

export default {
  strict: true,
  namespaced: true,
  state: {
    players: [],
    currentPlayer: null,
    board: null,
  },
  mutations: {
    [fromMutationTypes.STAR_GAME](state: GameState, payload: StartGamePayload): void {
      state.board = payload.board;
      state.players = payload.players;
      const [player1] = state.players;
      state.currentPlayer = player1;
    },
  },
  actions: {
    startGame({ commit }: ActionContext<GameState, {}>): StartGamePayload {
      const newBoard = fromActionUtils.generateBasicBoard();
      const newPlayers = fromActionUtils.generatePlayers();
      const payload: StartGamePayload = { board: newBoard, players: newPlayers };
      commit(fromMutationTypes.STAR_GAME, payload);
      return payload;
    },
  },
  getters: {
    board: (state: GameState) => state.board,
    territoryItems: (state: GameState) => state.board?.cellData?.flat(1),
    players: (state: GameState) => state.players,
    currentPlayer: (state: GameState) => state.currentPlayer,
  },
};
