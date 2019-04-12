<template lang="pug">
  .content__row
    .content__col.content__col_2-3
      component(
        v-for="(col, colIndex) in settings.col_2_3"
        :settings="col.settings"
        :is="col.component",
        :key="colIndex"
      )
    .content__col.content__col_1-3
      component(
        v-for="(col, colIndex) in settings.col_1_3"
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
  name: "Col_2_3_1_3",
  props: {
    settings: {
      type: Object,
      required: true
    }
  },
  components: {
    Picture,
    Slider,
    Video,
    Audio
  }
};
</script>