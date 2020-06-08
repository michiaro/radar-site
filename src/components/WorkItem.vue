<template>
  <router-link to="/all-works/friendly" class="work">
    <div class="work__cover">
      <!-- TODO если видео -->
      <img :src="baseURL + work.cover.path" :alt="work.title" />
    </div>
    <h3 class="work__title">
      {{ work.title }}
    </h3>
    <p class="work__description">
      {{ glueUpPrepositions(work.prescription) }}
    </p>
  </router-link>
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
  },
  data() {
    return {
      patternLenght: 8,
      isReady: false,
      baseURL,
    };
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
  display: block;
  letter-spacing: $--letter-spacing;
  margin-bottom: $--gutter;
  cursor: pointer;

  &__cover {
    overflow: hidden;
    transition-duration: $--duration-2000, $--duration-2000;
    transition-timing-function: $--timing-out-spring, $--timing-out-spring;
    transition-property: opacity, transform;
    opacity: 0;
    transform: translate(0, 3vmax);
    @at-root ._ready & {
      opacity: 1;
      transform: translate(0, 0);
    }
    img {
      max-width: 100%;
      width: 100%;
      line-height: 1;
      display: block;
      transition: transform $--duration-2000 $--timing-in-out-cubic;
      
    }
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
    @at-root ._ready & {
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
    @at-root ._ready & {
      opacity: 1;
      transform: translate(0, 0);
    }
  }

  &:hover {
    #{$block}__cover img {
      transform: scale(1.1);
    }
    #{$block}__title {
      color: $--color-brand;
    }
  }
}
</style>
