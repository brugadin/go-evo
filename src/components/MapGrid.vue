<template>
<div class="grid" :style="gridTemplateColumnStyle">
    <IntersectionItem
      class="item"
      v-for="item in intersectionItems"
      :key="item.id"
      :intersectionItem="item"
      @itemClicked="itemClicked" />
</div>
</template>

<script lang='ts'>
import { IntersectionData } from '@/core/entities/intersection';
import {
  computed, defineComponent, PropType, reactive, SetupContext, toRefs,
} from 'vue';
import IntersectionItem from './IntersectionItem.vue';

interface ComponentState {
  gridTemplateColumnStyle: string;
}

interface Props {
  intersectionItems: IntersectionData[];
}

export default defineComponent({
  components: {
    IntersectionItem,
  },
  name: 'MapGrid',
  props: {
    intersectionItems: {
      type: Object as PropType<IntersectionData[]>,
      default: () => ([]),
    },
  },
  setup(props: Props, { emit }: SetupContext) {
    const { intersectionItems } = toRefs(props);

    function getColumnStyle(): string {
      const columns = Math.sqrt(intersectionItems.value.length);
      return `grid-template-columns: repeat(${columns}, 1fr); width: ${columns * 30}px`;
    }

    const state: ComponentState = reactive({
      gridTemplateColumnStyle: computed(() => getColumnStyle()),
    });

    function itemClicked(intersection: IntersectionData): void {
      emit('intersection-clicked', intersection);
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
