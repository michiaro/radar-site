<template>
  <router-link :to="`/all-works/${work.slug}`" class="work">
    <div class="work__cover appear appear--up appear--duration-1000">
      <!-- TODO если видео -->
      <img :src="baseURL + work.cover.path" :alt="work.title" />
    </div>
    <div class="appear appear--up appear--duration-1000 appear--delay-300">
      <h3 class="work__title">{{ work.title }}</h3>
    </div>
    <p class="work__description appear appear--up appear--duration-1000 appear--delay-600">
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
    img {
      max-width: 100%;
      width: 100%;
      line-height: 1;
      display: block;
      transition: transform $--duration-2000 $--timing-out-circ;
    }
  }

  &__title {
    margin: 12px 0 0;
    font-weight: normal;
    font-size: $--font-size-120;
    color: $--color-text;
    transition: color $--duration-1000 $--timing-out-circ;
  }

  &__description {
    margin: 4px 0 0;
    font-size: $--font-size-80;
    color: $--color-text--muted;
    max-width: 440px;
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
