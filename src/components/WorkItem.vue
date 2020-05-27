<template>
  <div class="col col-xs-2 col-lg-2" :class="workColumnSize">
    <router-link to="/all-works/friendly">
      <div class="work fade-up">
        <div class="work__cover-wrapper">
          <!-- TODO если видео -->
          <img :src="baseURL + work.cover.path" :alt="work.title" class="work__cover" />
        </div>
        <h3 class="work__title" :class="{ 'work__title--ready': isReady }">
          {{ work.title }}
        </h3>
        <p class="work__description" :class="{ 'work__description--ready': isReady }">
          {{ glueUpPrepositions(work.prescription) }}
        </p>
      </div>
    </router-link>
  </div>
</template>

<script>
import { baseURL } from '@/api/index.js';
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
      isReady: false,
      baseURL,
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
  mounted() {
    this.$nextTick(this.afterMount);
  },
  methods: {
    glueUpPrepositions,
    afterMount() {
      setTimeout(() => {
        this.isReady = true;
      }, 200);
    },
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
    margin: 12px 0 0;
    font-weight: normal;
    font-size: $--font-size-120;
    color: $--color-text;
    transition-duration: $--duration-2000, $--duration-2000, $--duration-200;
    transition-timing-function: $--timing-out-spring, $--timing-out-spring, $--timing-in-out-cubic;
    transition-property: opacity, transform, color;
    transition-delay: $--duration-300;
    opacity: 0;
    transform: translate(0, 3vmax);
    &--ready {
      opacity: 1;
      transform: translate(0, 0);
    }
  }

  &__description {
    margin: 4px 0 0;
    font-size: $--font-size-80;
    color: $--color-text--muted;
    max-width: 440px;
    transition-duration: $--duration-2000, $--duration-2000;
    transition-timing-function: $--timing-out-spring, $--timing-out-spring;
    transition-property: opacity, transform;
    transition-delay: $--duration-700;
    opacity: 0;
    transform: translate(0, 3vmax);
    &--ready {
      opacity: 1;
      transform: translate(0, 0);
    }
  }

  &:hover {
    #{$block}__cover {
      transform: scale(1.1);
    }
    #{$block}__title {
      color: $--color-brand;
    }
  }
}
</style>
