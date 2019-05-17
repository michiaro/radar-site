<template lang="pug">
  .content__image
    img(
      :src="'https://radar-online.ru/'+settings.picture.path", 
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
@import '~@/styles/shared/globals';

.content__image {
  width: 100%;
  margin-top: 8px;
}

.content__image img {
  width: 100%;
}
</style>
