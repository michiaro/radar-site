<template>
  <div class="work-images">
    <!-- <img
      class="work-images__image"
      v-for="(picture, index) in array"
      :key="index"
      :src="picture"
    /> -->
    <!-- TODO alt text -->
  </div>
</template>

<script>
import { baseURL } from '@/api/index.js';

export default {
  name: 'PictureArray',
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
    array() {
      const { baseURL, settings } = this;
      return settings.pictureArray.map((picture) => baseURL + picture.path);
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/shared/_globals.scss';

.work-images {
  width: 100%;
  display: flex;
  flex-flow: row wrap;

  @include from('md') {
    flex-wrap: nowrap;
  }

  &__image {
    width: 100%;
    max-width: 100%;

    @include from('md') {
      width: auto;
    }
  }
}
</style>
