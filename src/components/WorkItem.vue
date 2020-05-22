<template>
  <div class="col col-xs-2 col-lg-2" :class="workColumnSize">
    <router-link to="/all-works/friendly">
      <div class="work">
        <div class="work__cover-wrapper">
          <!-- TODO если видео -->
          <img
            :src="BASE_URL + work.cover.path"
            :alt="work.title"
            class="work__cover"
          />
        </div>
        <h3 class="work__title">
          {{ work.title }}
        </h3>
        <p class="work__description">
          {{ glueUpPrepositions(work.prescription) }}
        </p>
      </div>
    </router-link>
  </div>
</template>

<script>
import { BASE_URL } from '@/settings.js';
import { glueUpPrepositions } from '@/utils/index.js';

export default {
  name: 'WorkItem',
  props: {
    work: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      patternLenght: 8,
      BASE_URL,
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
  methods: {
    glueUpPrepositions,
  },
};
</script>

<style lang="scss">
@import '~@/styles/shared/_globals.scss';

.work {
  $block: &;

  letter-spacing: $--letter-spacing;
  margin-bottom: $--gutter;
  cursor: pointer;

  &__cover-wrapper {
    overflow: hidden;
  }
  &__cover {
    max-width: 100%;
    width: 100%;
    line-height: 1;
    display: block;

    transition: transform $--duration-2000 $--timing-in-out-cubic;
  }
  &__title {
    margin: 0;

    margin-top: 12px;
    font-weight: normal;
    font-size: $--font-size-120;
    color: $--color-text;

    transition: color $--duration-200 $--timing-in-out-cubic;
  }
  &__description {
    margin: 0;

    margin-top: 4px;
    font-size: $--font-size-80;
    color: $--color-text--muted;

    max-width: 440px;
  }

  &:hover {
    #{$block}__title {
      color: $--color-brand;
    }
    #{$block}__cover {
      transform: scale(1.1);
    }
  }
}
</style>
