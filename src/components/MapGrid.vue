<template>
<div class="grid" :style="gridTemplateColumnStyle">
    <GridItem class="item" v-for="item in gridItems" :key="item.id" :item="item" />
</div>
</template>

<script lang='ts'>
import {
  computed, defineComponent, reactive, toRefs,
} from 'vue';

import GridItem from './GridItem.vue';

const defaultSize = 10;

interface GridItem {
  id: number;
}

interface ComponentState {
  gridItems: GridItem[];
  gridTemplateColumnStyle: string;
}

export default defineComponent({
  components: {
    GridItem,
  },
  name: 'MapGrid',
  setup() {
    const state: ComponentState = reactive({
      gridItems: computed(() => (new Array(defaultSize * defaultSize)
        .fill(null)
        .map((item: GridItem, index: number) => ({ id: (index + 1) })))),
      gridTemplateColumnStyle: computed(() => `grid-template-columns: repeat(${defaultSize}, 1fr)`),

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
    align-items: stretch;
    grid-gap: 5px;
    width: 100%;
    height: 100%;

    .item::before {
        content: "";
        padding-bottom: 100%;
        display: inline-block;
        vertical-align: top;
    }
}
</style>
