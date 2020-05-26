<template>
  <div ref="serviceNode" class="service" @mouseenter="handleEnter" @mouseleave="handleLeave" @click="passReference">
    <video
      ref="video" class="service__video" muted="muted" playsinline preload="auto"
      :loop="isLooped"
    >
      <source :src="videoUrl" type="video/mp4" />
    </video>
    <div class="service__content">
      <h2 class="service__title">{{ title }}</h2>
      <p class="service__description">
        {{ glueUpPrepositions(description) }}
      </p>
    </div>
  </div>
</template>

<script>
import { glueUpPrepositions } from '@/utils/index.js';
export default {
  name: 'ServicePageDirection',
  props: {
    serviceId: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isLooped: false,
    };
  },
  methods: {
    glueUpPrepositions,
    handleEnter() {
      this.isLooped = true;
      this.$refs.video.play();
    },
    handleLeave() {
      this.isLooped = false;
    },
    passReference() {
      this.$emit('setService', this.serviceId);
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/shared/_globals.scss';

.service {
  $service: &;
  position: relative;
  cursor: pointer;

  &__content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: $--gutter;
  }

  &__title {
    margin: 0;
    font-size: 12vmax;
    line-height: 0.9;
    font-weight: normal;
    letter-spacing: $--letter-spacing;
    @include from('xl') {
      font-size: 4vmax;
      min-height: 11vmax;
    }
  }

  &__description {
    margin: 0;
    font-size: $--font-size-100;
    line-height: 1.3;
    letter-spacing: $--letter-spacing;
    opacity: 0;
    transform: translate(0, 3vmax);
    transition-duration: $--duration-1000, $--duration-1000;
    transition-timing-function: $--timing-in-circ, $--timing-in-circ;
    transition-property: opacity, transform;
  }

  &__video {
    width: 100%;
    max-width: 100%;
    height: auto;
  }

  &:hover {
    #{$service}__title {
      color: $--color-brand;
    }
    #{$service}__description {
      opacity: 1;
      transform: translate(0, 0);
    }
  }
}
</style>
