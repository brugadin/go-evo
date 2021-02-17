<template>
<div class="grid" :style="gridTemplateColumnStyle">
    <TerritoryItem
      class="item"
      v-for="item in territoryItems"
      :key="item.id"
      :territoryItem="item" />
</div>
</template>

<script lang='ts'>
import { Territory } from '@/store/modules/models';
import {
  computed, defineComponent, reactive, toRefs,
} from 'vue';

import TerritoryItem from './TerritoryItem.vue';

const defaultSize = 10;

interface ComponentState {
  territoryItems: Territory[];
  gridTemplateColumnStyle: string;
}

export default defineComponent({
  components: {
    TerritoryItem,
  },
  name: 'MapGrid',
  setup() {
    const state: ComponentState = reactive({
      territoryItems: computed(() => (new Array(defaultSize * defaultSize)
        .fill(null)
        .map((item: Territory, index: number) => ({ id: (index + 1), owner: null })))),
      gridTemplateColumnStyle: computed(() => `grid-template-columns: repeat(${defaultSize}, 1fr); width: ${defaultSize * 70}px`),

    });
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>

.grid {
    display: grid;
    align-items: start;
    grid-gap: 5px;
}
</style>
