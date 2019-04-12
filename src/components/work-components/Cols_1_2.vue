<template lang="pug">
  .content__row
    .content__col.content__col_1-2
      component(
        v-for="(col, colIndex) in settings.col_1"
        :settings="col.settings"
        :is="col.component",
        :key="colIndex"
      )
    .content__col.content__col_1-2
      component(
        v-for="(col, colIndex) in settings.col_2"
        :settings="col.settings"
        :is="col.component",
        :key="colIndex"
      )
</template>

<script>
import Picture from "./Picture.vue";
import Slider from "./Slider.vue";
import Video from "./Video.vue";
import Audio from "./Audio.vue";

export default {
  name: "Cols_1_2",
  props: {
    settings: {
      type: Object,
      required: true
    },
  },
  components: {
    Picture,
    Slider,
    Video,
    Audio
  }
};
</script>