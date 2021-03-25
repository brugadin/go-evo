import { ActionContext } from 'vuex';
import {
  AppStore,
  ClaimIntersectionPayload,
  GameState,
  PassPlayerTurnPayload,
  StartGamePayload,
} from './models';
import * as fromMutationTypes from './mutation-types';

export default {
  strict: true,
  namespaced: true,
  state: {
    players: [],
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
    [fromMutationTypes.PASS_PLAYER_TURN](state: GameState, payload: PassPlayerTurnPayload): void {
      state.currentPlayer = payload.nextPlayer;
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
    passPlayerTurn(this: AppStore, { commit, state }: ActionContext<GameState, {}>): void {
      const {
        currentPlayer,
        players,
        moveHistory,
      } = JSON.parse(JSON.stringify(state)) as GameState;

      commit(
        fromMutationTypes.PASS_PLAYER_TURN,
        this.$services.game.passPlayerTurn(currentPlayer, players, moveHistory),
      );
    },
  },
  getters: {
    intersectionItems: (state: GameState) => state.intersections,
    players: (state: GameState) => state.players,
    currentPlayer: (state: GameState) => state.currentPlayer,
  },
};
