<template>
<el-card class="container">
  <template #header>
    <div class="current-player-header">Current Player</div>
  </template>
  <div
    :style="'color: ' + currentPlayer?.color "
    class="text">
    <strong>{{ currentPlayer?.name }}</strong>
  </div>
</el-card>
<el-card class="container">
  <template #header>Score</template>
  <div
    v-for="player in players" :key="player.name"
    :style="'color: ' + player.color "
    class="text">
    {{ player.name }}: <strong>{{ player.score }}</strong>
  </div>
</el-card>
</template>

<script lang='ts'>
import { PlayerData } from '@/core/entities/player';
import { defineComponent, PropType, SetupContext } from 'vue';

interface Props {
  players: PlayerData[];
  currentPlayer: PlayerData;
}

export default defineComponent({
  name: 'Players',
  emits: ['pass-turn-clicked'],
  props: {
    players: {
      type: Object as PropType<PlayerData[]>,
      default: () => ([]),
    },
    currentPlayer: {
      type: Object as PropType<PlayerData>,
      default: () => ({}),
    },
  },
  setup(props: Props, { emit }: SetupContext) {
    function passTurnClicked(): void {
      emit('pass-turn-clicked');
    }
    return {
      passTurnClicked,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/element-variables.scss';

.text {
  font-size: $--font-size;
  margin-bottom: 5px;
}

.container {
  margin-bottom: 15px;
  max-width: 570px;
}

.current-player-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
  }

</style>
