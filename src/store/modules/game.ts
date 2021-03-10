import { ActionContext } from 'vuex';
import {
  AppStore, ClaimIntersectionPayload, GameState, StartGamePayload,
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
      state.intersections = payload.intersections;
      state.players = payload.players;
      state.currentPlayer = payload.currentPlayer;
    },
    [fromMutationTypes.CLAIM_TERRITORY](state: GameState, payload: ClaimIntersectionPayload): void {
      state.intersections = payload.intersections;
      state.currentPlayer = payload.nextPlayer;
    },
  },
  actions: {
    startGame(this: AppStore, { commit }: ActionContext<GameState, {}>): void {
      commit(fromMutationTypes.STAR_GAME, this.$services.game.startGame());
    },
    claimIntersection(this: AppStore,
      { commit, state }: ActionContext<GameState, {}>,
      territoryId: number): void {
      const {
        currentPlayer,
        intersections,
        players,
      } = JSON.parse(JSON.stringify(state)) as GameState;

      if (!currentPlayer) { return; }

      const playResult = this.$services.game.play(
        territoryId,
        { intersections, players, currentPlayer },
      );

      if (playResult) {
        commit(fromMutationTypes.CLAIM_TERRITORY, {
          intersections: playResult.intersections,
          nextPlayer: playResult.nextPlayer,
        });
      }
    },
  },
  getters: {
    territoryItems: (state: GameState) => state.intersections,
    players: (state: GameState) => state.players,
    currentPlayerName: (state: GameState) => state.currentPlayer?.name,
  },
};
