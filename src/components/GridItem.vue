<template>
    <div class="grid-item"> {{ item.id }} </div>
</template>

<script lang='ts' >
import {
  defineComponent, PropType, toRefs, SetupContext,
} from 'vue';
import { ItemData } from '@/store/modules/models';

interface Props {
  item: ItemData;
}

export default defineComponent({
  name: 'GridItem',
  props: {
    item: {
      type: Object as PropType<ItemData>,
      default: () => ({}),
    },
  },
  setup(props: Props, { emit }: SetupContext) {
    const { item } = toRefs(props);

    function itemClicked(): void {
      emit('item-clicked', item.value);
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
