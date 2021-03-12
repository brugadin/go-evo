<template>
<el-card class="container">
  <template #header>Current Player</template>
  <div
    :style="'color: ' + currentPlayer?.color "
    class="text">
    {{ currentPlayer?.name }}
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
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'Players',
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
}

</style>
