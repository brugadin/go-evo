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
  computed, defineComponent, onMounted, PropType, reactive, toRefs,
} from 'vue';

import TerritoryItem from './TerritoryItem.vue';

const defaultSize = 10;

interface ComponentState {
  gridTemplateColumnStyle: string;
}

interface Props {
  territoryItems: Territory[];
}

export default defineComponent({
  components: {
    TerritoryItem,
  },
  name: 'MapGrid',
  props: {
    territoryItems: {
      type: Object as PropType<Territory[]>,
      default: () => ([]),
    },
  },
  setup(props: Props) {
    const { territoryItems } = toRefs(props);
    const state: ComponentState = reactive({
      gridTemplateColumnStyle: computed(() => `grid-template-columns: repeat(${defaultSize}, 1fr); width: ${defaultSize * 70}px`),

    });
    onMounted(() => console.log(territoryItems.value));
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
