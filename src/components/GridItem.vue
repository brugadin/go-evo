<template>
    <div class="grid-item"> {{ item.id }} </div>
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
  name: 'GridItem',
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
.grid-item {
    min-width: 30px;
    min-height: 30px;
    background-color: red;
}
</style>
