<template>
  <div
    ref="serviceNode"
    class="service"
    :class="{ 'service--open': isOpen }"
    @mouseenter="handleEnter"
    @mouseleave="handleLeave"
    @click="passReference"
  >
    <video
      ref="video" class="service__video" muted="muted" playsinline preload="auto"
      :loop="isLooped"
    >
      <source :src="videoURL + video.path" type="video/mp4" />
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
import { baseURL } from '@/api/index.js';

export default {
  name: 'ServicePageDirection',
  props: {
    serviceId: {
      type: String,
      required: true,
    },
    video: {
      type: Object,
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
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isLooped: false,
    };
  },
  computed: {
    videoURL() {
      return baseURL + '/cockpit/storage/uploads';
    },
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

  // вписываем все три плашки в один экран по высоте
  // вычитаем высоту шапки, отступы между плашками и от шапки
  height: calc((100vh - #{$--header-height} - (#{$--gutter} * 3) - #{$--page-padding-x}) / 3);
  margin-bottom: $--gutter;
  overflow: hidden;

  @include from('xl') {
    height: auto;
    margin-bottom: 0;
    // чтобы экран не прыгал при загрузке страницы
    min-height: 50vh;
  }

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
    font-size: 5vmax;
    line-height: 0.9;
    font-weight: normal;
    letter-spacing: $--letter-spacing;
    @include from('xl') {
      font-size: 12vmax;
    }
    @include from('xl') {
      font-size: 4vmax;
      min-height: 11vmax;
    }
  }

  &__description {
    margin: 0;
    margin-top: 1.5vmax;
    font-size: $--font-size-100;
    line-height: 1.1;
    letter-spacing: $--letter-spacing;

    @include from('xl') {
      margin-top: 0;

      opacity: 0;
      transform: translate(0, 3vmax);
      transition-duration: $--duration-2000, $--duration-2000;
      transition-timing-function: $--timing-in-out-spring, $--timing-in-out-spring;
      transition-property: opacity, transform;
    }
  }

  &__video {
    width: 100%;
    max-width: 100%;
    height: auto;
  }

  &:hover {
    #{$service}__description {
      @include from('xl') {
        opacity: 1;
        transform: translate(0, 0);
      }
    }
  }

  &--open {
    #{$service}__description {
      @include from('xl') {
        transition-duration: $--duration-0, $--duration-0;
      }
    }
  }
}
</style>
