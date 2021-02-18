import { ActionContext } from 'vuex';
import * as fromActionUtils from './action-utils';
import {
  Board, GameState, Player, Territory,
} from './models';
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
    [fromMutationTypes.CLAIM_TERRITORY](state: GameState, territory: Territory): void {
      const foundItem = state.board?.cellData
      .flat(1)
      .find((item) => item?.id === territory?.id && item.owner === null);

      if (foundItem) {
        foundItem.owner = state.currentPlayer;
        const playerIndex = state.players
          .findIndex((player: Player) => (state.currentPlayer?.name === player.name));
        const nextPlayer = state.players[playerIndex + 1] || state.players[0];
        state.currentPlayer = nextPlayer;
      }
    },
  },
  actions: {
    startGame({ commit }: ActionContext<GameState, {}>): void {
      const newBoard = fromActionUtils.generateBasicBoard();
      const newPlayers = fromActionUtils.generatePlayers();
      const payload: StartGamePayload = { board: newBoard, players: newPlayers };
      commit(fromMutationTypes.STAR_GAME, payload);
    },
    claimTerritory({ commit }: ActionContext<GameState, {}>, territory: Territory): void {
      commit(fromMutationTypes.CLAIM_TERRITORY, territory);
    },
  },
  getters: {
    board: (state: GameState) => state.board,
    territoryItems: (state: GameState) => state.board?.cellData?.flat(1),
    players: (state: GameState) => state.players,
    currentPlayerName: (state: GameState) => state.currentPlayer?.name,
  },
};
