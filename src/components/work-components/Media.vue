<template>
  <div class="work-media">
    <video
      v-if="isVideo(mediaPath)"
      class="work-media__element work-media__element--video"
      :src="mediaPath"
    />
    <img
      v-if="!isVideo(mediaPath)"
      class="work-media__element work-media__element--image"
      :src="mediaPath"
    />
    <!-- TODO alt text -->
  </div>
</template>

<script>
import { isVideo } from '@/utils/index.js';
import { baseURL } from '@/api/index.js';

export default {
  name: 'Media',
  props: {
    settings: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      baseURL,
    };
  },
  computed: {
    mediaPath() {
      const { baseURL, settings } = this;
      return baseURL + settings.media.path;
    },
  },
  methods: {
    isVideo,
  },
};
</script>

<style lang="scss">
@import '~@/styles/shared/_globals.scss';

.work-media {
  max-width: 100%;

  &__element {
    max-width: 100%;
    width: 100%;
    margin-bottom: $--gutter;

    &--video {
    }
    &--image {
    }
  }
}
</style>
