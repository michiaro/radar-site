<template>
  <div class="col col-xs-2 col-lg-2" :class="workColumnSize">
    <div class="work-dummy">
      <div class="work-dummy__cover loading" />
      <div class="work-dummy__title loading" />
      <div class="work-dummy__description loading" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'WorkItemDummy',
  props: {
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      patternLenght: 8,
    };
  },
  computed: {
    widthIndex() {
      const { index, patternLenght } = this;
      return index % patternLenght;
    },
    workColumnSize() {
      const { widthIndex } = this;
      let size;

      switch (widthIndex) {
        case 0:
        case 1:
        case 4:
        case 5:
          size = 6;
          break;

        case 2:
        case 7:
          size = 4;
          break;

        case 3:
        case 6:
          size = 8;
          break;

        default:
          size = 6;
      }

      return 'col-xl-' + size;
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/shared/_globals.scss';

.work-dummy {
  $block: &;

  letter-spacing: $--letter-spacing;
  margin-bottom: $--gutter;
  cursor: pointer;

  &__cover {
    background: $--color-text--muted;
    &:after {
      content: '';
      display: block;
      padding-bottom: 60%;
    }

    max-width: 100%;
    width: 100%;
  }
  &__title {
    margin: 0;

    margin-top: 12px;
    height: $--font-size-120;
    background: $--color-text--muted;
    width: 50%;
  }
  &__description {
    margin-top: 4px;

    height: $--font-size-80;
    background: $--color-text--muted;
    max-width: 440px;
  }
}
</style>
