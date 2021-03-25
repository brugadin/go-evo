<template>
<div class="grid" :style="gridTemplateColumnStyle">
  <div
    class="item"
    v-for="item in intersectionItems"
    :key="item.id"
    >
    <GridCellSurface
    :cellType="getGridCellType(item)"
    :territoryColor="item.territoryOwner?.color">
      <IntersectionItem
          :intersectionItem="item"
          @itemClicked="itemClicked" />
    </GridCellSurface>
  </div>

</div>
</template>

<script lang='ts'>
import { IntersectionData } from '@/core/entities/intersection';
import {
  computed, defineComponent, PropType, reactive, SetupContext, toRefs,
} from 'vue';
import IntersectionItem from './IntersectionItem.vue';
import GridCellSurface from './GridCellSurface.vue';

interface ComponentState {
  gridTemplateColumnStyle: string;
  gridColumns: number;
  cornerIdMaps: Map<number, string>;
}

interface Props {
  intersectionItems: IntersectionData[];
}

export default defineComponent({
  components: {
    IntersectionItem,
    GridCellSurface,
  },
  name: 'MapGrid',
  emits: ['intersection-clicked'],
  props: {
    intersectionItems: {
      type: Object as PropType<IntersectionData[]>,
      default: () => ([]),
    },
  },
  setup(props: Props, { emit }: SetupContext) {
    const { intersectionItems } = toRefs(props);

    function getColumnStyle(columns: number): string {
      return `grid-template-columns: repeat(${columns}, 1fr); width: ${columns * 30}px`;
    }

    function getCorenerIdsMap(columns: number): Map<number, string> {
      const topLeftId = 0;
      const topRightId = (columns) - 1;
      const bottomLeftId = ((columns - 1) * columns);
      const bottomRighttId = (columns * columns) - 1;
      const cornersMap = new Map<number, string>();
      cornersMap.set(topLeftId, 'top-left');
      cornersMap.set(topRightId, 'top-right');
      cornersMap.set(bottomLeftId, 'bottom-left');
      cornersMap.set(bottomRighttId, 'bottom-right');
      return cornersMap;
    }

    const state: ComponentState = reactive({
      gridTemplateColumnStyle: computed(() => getColumnStyle(state.gridColumns)),
      gridColumns: computed(() => Math.sqrt(intersectionItems.value.length)),
      cornerIdMaps: computed(() => getCorenerIdsMap(state.gridColumns)),
    });

    function itemClicked(intersection: IntersectionData): void {
      emit('intersection-clicked', intersection);
    }

    function getGridCellType(intersection: IntersectionData): string {
      let classModifierName = '';
      classModifierName = state.cornerIdMaps.get(intersection.id) || '';
      if (!classModifierName) {
        if (intersection.row === 0) { return 'top'; }
        if (intersection.column === 0) { return 'left'; }
        if (intersection.row === (state.gridColumns - 1)) { return 'bottom'; }
        if (intersection.column === (state.gridColumns - 1)) { return 'right'; }
      }

      return classModifierName;
    }

    return {
      ...toRefs(state),
      itemClicked,
      getGridCellType,
    };
  },
});
</script>

<style lang="scss" scoped>
.grid {
    display: grid;
    align-items: start;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 25%);
}
.item {
  height: 30px;
  width: 30px;
}
</style>
