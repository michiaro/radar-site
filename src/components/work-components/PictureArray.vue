<template>
  <div class="work-images">
    <div
      v-for="(picture, index) in array"
      :key="index"
      class="work-images__image"
    >
      <img ref="picture" :src="picture" alt="Radar" />
    </div>
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
      containerWidth: 1850,
    };
  },
  computed: {
    array() {
      const { baseURL, settings } = this;
      return settings.pictureArray.map((picture) => baseURL + picture.path);
    },
    isMobile() {
      return this.$store.state.page.isMobile;
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
  overflow: hidden;

  margin-bottom: 1vmax;
  flex: 0 1 auto;

  @include from('md') {
    flex-wrap: nowrap;
  }

  &__image {
    flex-grow: 1;

    @include to('md') {
      width: 100%;
    }

    & + & {
      margin-top: 1.5vmax;

      @include from('md') {
        margin-left: 1vmax;
        margin-top: 0;
      }
    }

    img {
      max-width: 100%;
      height: auto;
    }
  }
}
</style>
