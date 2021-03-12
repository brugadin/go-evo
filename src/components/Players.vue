<template>
<el-card class="container">
  <template #header>
      <strong>Current Player</strong>
  </template>
  <div class="text">
    {{ currentPlayerName }}
  </div>
</el-card>

<el-card class="container">
  <template #header>
      <strong>Score</strong>
  </template>
  <div
    v-for="player in players" :key="player.name"
    :style="'color: ' + player.color "
    class="text">
    {{ player.name }}: {{ player.score }}
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
    currentPlayerName: {
      type: String as PropType<string>,
      default: () => (''),
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
