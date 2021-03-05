<template>
  <el-card>
  <div v-for="player in players" :key="player.name"
  :style="'color: ' + player.color "
  class="text">
    {{ player.name }}
    <i v-if="player.name === currentPlayerName"
    class="el-icon-user"></i>
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
      type: Object as PropType<string>,
      default: () => ({}),
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/element-variables.scss';

.text {
  font-size: $--font-size;
  margin-bottom: 18px;
}

</style>
