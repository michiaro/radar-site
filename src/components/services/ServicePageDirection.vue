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
      ref="video"
      class="service__video"
      muted="muted"
      playsinline
      preload="auto"
      :loop="isLooped"
    >
      <source :src="videoURL + video.path" type="video/mp4" />
    </video>
    <div class="service__content">
      <h2 class="service__title">{{ title }}</h2>
      <p class="service__description">
        {{ glueUpPrepositions(description) }}
      </p>

      <div class="service__bottom">
        <p class="service__link">детали и примеры</p>

        <svg
          class="service__arrow"
          viewBox="0 0 51 45"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M46.9609 23.7041H0V20.7041H46.9609V23.7041Z"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M31.272 0.020813L50.3824 22.1973L31.2788 44.6787L28.9927 42.7361L46.434 22.2109L28.9994 1.97921L31.272 0.020813Z"
          />
        </svg>
      </div>
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
  height: calc(
    (100vh - #{$--header-height} - (#{$--gutter} * 3) - #{$--page-padding-x}) /
      3
  );
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

    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
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
    flex-grow: 1;
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
      transition-timing-function: $--timing-in-out-spring,
        $--timing-in-out-spring;
      transition-property: opacity, transform;
    }
  }

  &__video {
    width: 100%;
    max-width: 100%;
    height: auto;
  }

  &__bottom {
    display: none;

    @include from('xl') {
      display: flex;
      align-items: center;
      justify-content: space-between;

      opacity: 0;
      transform: translate(0, 3vmax);
      transition-delay: $--delay-0;
      transition-duration: $--duration-2000, $--duration-2000;
      transition-timing-function: $--timing-in-out-spring,
        $--timing-in-out-spring;
      transition-property: opacity, transform;
    }
  }

  &__link {
    font-weight: 300;
    font-size: $--font-size-90;
    color: $--color-brand;
    display: inline-block;
    position: relative;
    margin-left: $--page-padding-x;
    @include from('lg') {
      margin-left: 0;
    }

    &:after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 100%;
      height: 1px;
      background: $--color-brand;
      transition-timing-function: $--timing-in-out-cubic;
      transition-duration: $--duration-1000;
      transition-property: transform;
      transform-origin: left center;
      transition-delay: $--delay-1000;
      transform: scaleX(0);
    }
  }

  &__arrow {
    width: 51px;
    height: 45px;
    color: $--color-text;
  }

  &:hover {
    @include from('xl') {
      #{$service}__description {
        opacity: 1;
        transform: translate(0, 0);
      }
      #{$service}__bottom {
        opacity: 1;
        transform: translate(0, 0);
        transition-delay: $--duration-800;
      }
      #{$service}__link:after {
        transform: scaleX(1);
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
