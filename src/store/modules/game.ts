import { TerritoryData } from '@/core/entities/territory';
import { ActionContext } from 'vuex';
import BoardUtils from './board-utils';
import {
  AppStore, ClaimTerritoryPayload, GameState, StartGamePayload,
} from './models';
import * as fromMutationTypes from './mutation-types';

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
      state.currentPlayer = payload.currentPlayer;
    },
    [fromMutationTypes.CLAIM_TERRITORY](state: GameState, payload: ClaimTerritoryPayload): void {
      state.territories = payload.territories;
      state.currentPlayer = payload.nextPlayer;
    },
  },
  actions: {
    startGame(this: AppStore, { commit }: ActionContext<GameState, {}>): void {
      commit(fromMutationTypes.STAR_GAME, this.$services.game.startGame());
    },
    claimTerritory(this: AppStore,
      { commit, state }: ActionContext<GameState, {}>,
      territoryId: number): void {
      const {
        currentPlayer,
        territories,
        players,
      } = JSON.parse(JSON.stringify(state)) as GameState;

      if (!currentPlayer) { return; }

      const playResult = this.$services.game.play(
        territoryId,
        { territories, players, currentPlayer },
      );

      if (playResult) {
        commit(fromMutationTypes.CLAIM_TERRITORY, {
          territories: playResult.territories,
          nextPlayer: playResult.nextPlayer,
        });
      }
    },
  },
  getters: {
    territoryItems: (state: GameState) => state.territories,
    players: (state: GameState) => state.players,
    currentPlayerName: (state: GameState) => state.currentPlayer?.name,
  },
};
