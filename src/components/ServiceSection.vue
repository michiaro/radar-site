<template>
  <div ref="serviceNode" class="service" @mouseenter="handleHover" @click="passReference">
    <video ref="video" class="service__video" muted="muted" playsinline preload="auto">
      <source :src="videoUrl" type="video/mp4" />
    </video>
    <div class="service__content">
      <h2 class="service__title">{{ title }}</h2>
      <p class="service__description" v-html="description" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServiceSection',
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
  methods: {
    handleHover() {
      this.$refs.video.play();
    },
    passReference() {
      this.$emit('openService', {
        serviceNode: this.$refs.serviceNode,
        serviceId: this.serviceId,
      });
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
    padding: 1.5vw $--gutter;
    letter-spacing: $--letter-spacing;
  }

  &__title {
    font-size: 12vw;
    line-height: 0.9;
    margin: 0;
    @include from('xl') {
      font-size: 4vw;
      min-height: 11vw;
    }
  }

  &__description {
    font-size: $--font-size-100;
    line-height: 1.3;
    margin: 0;
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
  }
}
</style>
