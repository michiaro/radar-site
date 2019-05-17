<template lang="pug">
  .content__audio
    iframe(
      width="100%"
      height="166"
      scrolling="no"
      frameborder="no"
      allow="autoplay"
      :src="'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/'+settings.audio+'&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true'"
    )
</template>

<script>
export default {
  name: "Audio",
  props: {
    settings: {
      type: Object,
      required: true
    },
  }
};
</script>

<style lang="scss">
@import '~@/styles/shared/globals';

.content__audio {
  margin-top: 8px;
}
</style>
