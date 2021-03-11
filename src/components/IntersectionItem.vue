<template>
  <div
  @click="itemClicked"
  class="grid-item">
    <el-card
      v-show="intersectionItem.owner"
      :body-style="backgroundColorStyle" >
    </el-card>
  </div>
</template>

<script lang='ts' >
import { IntersectionData } from '@/core/entities/intersection';
import {
  computed, defineComponent, PropType, reactive, SetupContext, toRefs,
} from 'vue';

interface Props {
  intersectionItem: IntersectionData;
}

interface ComponentState {
  backgroundColorStyle: string | null;
}

export default defineComponent({
  name: 'IntersectionItem',
  props: {
    intersectionItem: {
      type: Object as PropType<IntersectionData>,
      default: () => ({}),
    },
  },
  setup(props: Props, { emit }: SetupContext) {
    const { intersectionItem } = toRefs(props);

    function itemClicked(): void {
      console.log(intersectionItem.value);
      emit('item-clicked', intersectionItem.value);
    }

    function getBackgroundColorStyle(colorString: string | null) {
      let colorStyle = null;
      if (colorString) {
        colorStyle = `background-color: ${colorString}`;
      }
      return colorStyle;
    }

    const state: ComponentState = reactive({
      backgroundColorStyle: computed(() => {
        const { owner } = intersectionItem.value;
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
  font-size: 7px;
}

::v-deep(.el-card) {
  border-radius: 15px;
  border-color: $--color-black;
}

::v-deep(.el-card__body) {
  padding: 14px;
}
</style>
