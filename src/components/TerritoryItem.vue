<template>
  <el-card
    @click="itemClicked"
    :shadow="shadowType"
    :body-style="backgroundColorStyle"
    class="grid-item" >
  </el-card>
</template>

<script lang='ts' >
import { TerritoryData } from '@/core/entities/territory';
import {
  computed, defineComponent, PropType, reactive, SetupContext, toRefs,
} from 'vue';

interface Props {
  territoryItem: TerritoryData;
}

interface ComponentState {
  shadowType: string;
  backgroundColorStyle: string | null;
}

export default defineComponent({
  name: 'TerritoryItem',
  props: {
    territoryItem: {
      type: Object as PropType<TerritoryData>,
      default: () => ({}),
    },
  },
  setup(props: Props, { emit }: SetupContext) {
    const { territoryItem } = toRefs(props);

    function itemClicked(): void {
      emit('item-clicked', territoryItem.value);
    }

    function getBackgroundColorStyle(colorString: string | null) {
      let colorStyle = null;
      if (colorString) {
        colorStyle = `background-color: ${colorString}`;
      }
      return colorStyle;
    }

    const state: ComponentState = reactive({
      shadowType: computed(() => (territoryItem.value.owner ? 'never' : 'always')),
      backgroundColorStyle: computed(() => {
        const { owner } = territoryItem.value;
        return getBackgroundColorStyle(owner?.color || null);
      }),
    });

    return {
      ...toRefs(state),
      itemClicked,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/element-variables.scss';

.grid-item {
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: $--font-size;
}

::v-deep(.el-card) {
  border-radius: 15px;
}

::v-deep(.el-card__body) {
  padding: 14px;
}
</style>
