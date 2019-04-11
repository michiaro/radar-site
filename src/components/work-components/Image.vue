<template lang="pug">
  .content__image
    img(
      :src="'http://new.radar-online.mcdir.ru'+src", :alt="alt"
      )

</template>

<script>
export default {
  name: 'Navigation',
  props: {
    src: {
      type: string,
    },
    alt: {
      type: string,
    },
  },
}
</script>

<style lang="scss">

</style>
