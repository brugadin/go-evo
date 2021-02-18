<template>
<el-card class="grid-item" shadow="hover">
  {{ territoryItem.id }}
</el-card>
</template>

<script lang='ts' >
import {
  defineComponent, PropType, toRefs, SetupContext,
} from 'vue';
import { Territory } from '@/store/modules/models';

interface Props {
  territoryItem: Territory;
}

export default defineComponent({
  name: 'TerritoryItem',
  props: {
    territoryItem: {
      type: Object as PropType<Territory>,
      default: () => ({}),
    },
  },
  setup(props: Props, { emit }: SetupContext) {
    const { territoryItem } = toRefs(props);

    function itemClicked(): void {
      emit('item-clicked', territoryItem.value);
    }

    return {
      itemClicked,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/element-variables.scss';

.grid-item {
    width: 60px;
    height: 60px;
    cursor: pointer;
    font-size: $--font-size;
}
</style>
