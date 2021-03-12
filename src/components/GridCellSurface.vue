<template>
<div class="wrapper slot">
    <slot></slot>
</div>
<div class="wrapper">
    <svg width="30" height="30">
        <rect class="cell-rect" width="30" height="30" />
        <path :class="'cell-path' + ' ' + cellType + ' ' + territoryColor"
        d="M0,15H30M15,0V30"/>
    </svg>
</div>
</template>

<script lang='ts' >
import { defineComponent, PropType } from 'vue';

export type CellType =
'top' | 'left' | 'bottom' |
'right' | 'grid' | 'top-left' |
'top-right' | 'bottom-left' |
'bottom-right';

export default defineComponent({
  name: 'GridCellSurface',
  props: {
    cellType: {
      type: String as PropType<CellType>,
      default: () => ('grid'),
    },
    territoryColor: {
      type: String as PropType<string>,
      default: () => (''),
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/element-variables.scss';

.wrapper {
    position: absolute;

    &.slot {
        z-index: 1;
    }
}
.cell-rect {
    fill: $--color-board;
}
.cell-path {
  stroke: $--color-black;
  stroke-width: 1;

  &.black {
      stroke-width: 3;
      stroke: black;
  }

  &.red {
      stroke-width: 3;
      stroke: red;
  }

  &.grid {
      d: path('M0,15H30M15,0V30');
  }

  &.top {
    d: path('M0,15H30M15,15V30');
  }

  &.left {
    d: path('M15,15H30M15,0V30');
  }

  &.bottom {
    d: path('M0,15H30M15,0V15');
  }

  &.right {
    d: path('M0,15H15M15,0V30');
  }

  &.top-left {
    d: path('M15,15H30M15,15V30');
  }

  &.top-right {
    d: path('M0,15H15M15,15V30');
  }

  &.bottom-left {
    d: path('M15,15H30M15,0V15');
  }

  &.bottom-right {
    d: path('M0,15H15M15,0V15');
  }

}
</style>
