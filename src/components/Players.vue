<template>
  <el-card>
  <div v-for="player in players" :key="player.name" class="text">
    {{ player.name }}
  </div>
</el-card>
</template>

<script lang='ts'>
import { Player } from '@/store/modules/models';
import { defineComponent, PropType } from 'vue';

interface Props {
  players: Player[];
  currentPlayerName: string;
}

export default defineComponent({
  name: 'Players',
  props: {
    players: {
      type: Object as PropType<Player[]>,
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
