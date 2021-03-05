import { TerritoryData } from '@/core/entities/territory';
import { ActionContext, Store } from 'vuex';
import BoardUtils from './board-utils';
import { ClaimTerritoryPayload, GameState, StartGamePayload } from './models';
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
      const territory = state.territories
        .find((item) => item?.id === payload.territoryId) as TerritoryData;

      territory.owner = payload.currentPlayer;
      payload.capturedTerritoriesIds.forEach((id: number) => {
        const foundTerritory = state.territories.find((item) => id === item.id);
        if (foundTerritory) { foundTerritory.owner = undefined; }
      });

      state.currentPlayer = payload.nextPlayer;
    },
  },
  actions: {
    startGame(this: Store<any>, { commit }: ActionContext<GameState, {}>): void {
      commit(fromMutationTypes.STAR_GAME, this.$services.board.startGame());
    },
    claimTerritory({ commit, state }: ActionContext<GameState, {}>, territoryId: number): void {
      const {
        currentPlayer,
        territories,
        players,
      } = JSON.parse(JSON.stringify(state)) as GameState;

      const territory = territories
        .find((item) => item?.id === territoryId && !item.owner) as TerritoryData;

      if (!currentPlayer || !territory) { return; }

      territory.owner = currentPlayer;

      const capturedTerritories: TerritoryData[] = BoardUtils.getCapturedTerritories(
        territory,
        territories,
      );

      const isSuicidalMove = BoardUtils.isSuicidalMove(
        territory,
        territories,
        capturedTerritories,
      );
      if (isSuicidalMove) { return; }

      const nextPlayer = BoardUtils.getNextPlayer(currentPlayer.name, players);
      const capturedTerritoriesIds = capturedTerritories.map(
        (capturedTerritory: TerritoryData) => capturedTerritory.id,
      );

      commit(fromMutationTypes.CLAIM_TERRITORY, {
        territoryId,
        currentPlayer,
        nextPlayer,
        capturedTerritoriesIds,
      });
    },
  },
  getters: {
    territoryItems: (state: GameState) => state.territories,
    players: (state: GameState) => state.players,
    currentPlayerName: (state: GameState) => state.currentPlayer?.name,
  },
};
