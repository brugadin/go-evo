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
      state.currentPlayer = payload.currentPlayer;
      state.intersections = payload.intersections;
      state.players = payload.players;
      state.moveHistory = [];
    },
    [fromMutationTypes.CLAIM_INTERSECTION](
      state: GameState,
      payload: ClaimIntersectionPayload,
    ): void {
      state.currentPlayer = payload.nextPlayer;
      state.intersections = payload.intersections;
      state.players = payload.players;
      state.moveHistory = payload.moveHistory;
    },
  },
  actions: {
    startGame(this: AppStore, { commit }: ActionContext<GameState, {}>): void {
      commit(fromMutationTypes.STAR_GAME, this.$services.game.startGame());
    },
    claimIntersection(this: AppStore,
      { commit, state }: ActionContext<GameState, {}>,
      intersectionId: number): void {
      const {
        currentPlayer,
        intersections,
        players,
        moveHistory,
      } = JSON.parse(JSON.stringify(state)) as GameState;

      if (!currentPlayer) { return; }

      const boardData = { intersections, players, currentPlayer };
      const moveData = { intersectionId, playerId: currentPlayer.id };
      const playResult = this.$services.game.play(
        moveData, boardData, moveHistory,
      );

      if (playResult) {
        commit(fromMutationTypes.CLAIM_INTERSECTION, {
          intersections: playResult.intersections,
          nextPlayer: playResult.nextPlayer,
          players: playResult.players,
          moveHistory: moveHistory.concat({ playerId: currentPlayer.id, intersectionId }),
        });
      }
    },
  },
  getters: {
    intersectionItems: (state: GameState) => state.intersections,
    players: (state: GameState) => state.players,
    currentPlayer: (state: GameState) => state.currentPlayer,
  },
};
