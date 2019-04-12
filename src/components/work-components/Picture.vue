<template lang="pug">
  .content__image
    img(
      :src="'http://new.radar-online.mcdir.ru'+settings.picture.path", 
    )

</template>

<script>
export default {
  name: "Picture",
  props: {
    settings: {
      type: Object,
      required: true
    },
  }
};
</script>

<style lang="scss">
.content__image {
  width: 100%;
  margin-top: 8px;
}

.content__image img {
  width: 100%;
}
</style>
