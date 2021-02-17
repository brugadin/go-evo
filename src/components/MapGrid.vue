<template>
<div class="grid" :style="gridTemplateColumnStyle">
    <div v-for="item in gridItems" :key="item.id">{{item.id}}</div>
</div>
</template>

<script lang='ts'>
import {
  computed, defineComponent, reactive, toRefs,
} from 'vue';

const defaultSize = 10;

interface GridItem {
  id: number;
}

interface ComponentState {
  gridItems: GridItem[];
  gridTemplateColumnStyle: string;
}

export default defineComponent({
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

    div::before {
        content: "";
        padding-bottom: 100%;
        display: inline-block;
        vertical-align: top;
    }

    div {
        min-width: 30px;
        min-height: 30px;
        background-color: red;
    }
}
</style>
