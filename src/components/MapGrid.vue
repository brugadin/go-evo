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
  computed, defineComponent, PropType, reactive, toRefs,
} from 'vue';
import TerritoryItem from './TerritoryItem.vue';

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

    function getColumnStyle(): string {
      const columns = Math.sqrt(territoryItems.value.length);
      return `grid-template-columns: repeat(${columns}, 1fr); width: ${columns * 70}px`;
    }

    const state: ComponentState = reactive({
      gridTemplateColumnStyle: computed(() => getColumnStyle()),
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
