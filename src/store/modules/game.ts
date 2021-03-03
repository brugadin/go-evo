import { Player, Territory } from '@/core/models';
import { ActionContext } from 'vuex';
import * as fromActionUtils from './action-utils';
import * as fromBoardUtils from './board-utils';
import { GameState } from './models';
import * as fromMutationTypes from './mutation-types';

interface StartGamePayload { territories: Territory[]; players: Player[]}

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
      state.territories = payload.territories;
      state.players = payload.players;
      const [player1] = state.players;
      state.currentPlayer = player1;
    },
    [fromMutationTypes.CLAIM_TERRITORY](state: GameState, territory: Territory): void {
      fromBoardUtils.claimTerritory(state, territory);
    },
  },
  actions: {
    startGame({ commit }: ActionContext<GameState, {}>): void {
      const players = fromActionUtils.generatePlayers();
      const territories = fromBoardUtils.generateTerritories();
      const payload: StartGamePayload = { territories, players };
      commit(fromMutationTypes.STAR_GAME, payload);
    },
    claimTerritory({ commit }: ActionContext<GameState, {}>, territory: Territory): void {
      commit(fromMutationTypes.CLAIM_TERRITORY, territory);
    },
  },
  getters: {
    territoryItems: (state: GameState) => state.territories,
    players: (state: GameState) => state.players,
    currentPlayerName: (state: GameState) => state.currentPlayer?.name,
  },
};
