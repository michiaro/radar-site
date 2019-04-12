<template lang="pug">
  .content__video
    div.video-wrapper
      iframe(
        :src="'https://player.vimeo.com/video/'+settings.video+'?autoplay=1&loop=1&color=e10811&title=0&byline=0&portrait=0'",
        style="position:absolute;top:0;left:0;width:100%;height:100%;",
        frameborder="0",
        webkitallowfullscreen,
        mozallowfullscreen,
        allowfullscreen
      )
</template>

<script src="https://player.vimeo.com/api/player.js"></script>

<script>
export default {
  name: "Video",
  props: {
    settings: {
      type: Object,
      required: true
    },
  }
};
</script>

<style lang="scss">
.content__video {
  width: 100%;
  margin-top: 8px;
  margin-bottom: 4px;
}

.video-wrapper {
  padding: 56.25% 0 0 0;
  position: relative;
}
</style>
