<template>
<div class="grid" :style="gridTemplateColumnStyle">
    <TerritoryItem
      class="item"
      v-for="item in territoryItems"
      :key="item.id"
      :territoryItem="item"
      @itemClicked="itemClicked" />
</div>
</template>

<script lang='ts'>
import { TerritoryData } from '@/core/entities/territory';
import {
  computed, defineComponent, PropType, reactive, SetupContext, toRefs,
} from 'vue';
import TerritoryItem from './TerritoryItem.vue';

interface ComponentState {
  gridTemplateColumnStyle: string;
}

interface Props {
  territoryItems: TerritoryData[];
}

export default defineComponent({
  components: {
    TerritoryItem,
  },
  name: 'MapGrid',
  props: {
    territoryItems: {
      type: Object as PropType<TerritoryData[]>,
      default: () => ([]),
    },
  },
  setup(props: Props, { emit }: SetupContext) {
    const { territoryItems } = toRefs(props);

    function getColumnStyle(): string {
      const columns = Math.sqrt(territoryItems.value.length);
      return `grid-template-columns: repeat(${columns}, 1fr); width: ${columns * 30}px`;
    }

    const state: ComponentState = reactive({
      gridTemplateColumnStyle: computed(() => getColumnStyle()),
    });

    function itemClicked(territory: TerritoryData): void {
      emit('territory-clicked', territory);
    }

    return {
      ...toRefs(state),
      itemClicked,
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
