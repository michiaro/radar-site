<template lang="pug">
  swiper.content__swiper(
    :options="workSwiperOption",
    ref="workScreenSwiper",
  )
    swiper-slide(
      v-for="slide in settings.slider"
      :key="slide.meta.assets",
    ) 
      img(
        :src="'https://radar-online.ru/'+slide.path", 
      )
    .swiper-pagination(
      slot="pagination",
    )

</template>

<script>
export default {
  name: "Slider",
  props: {
    settings: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      workSwiperOption: {
        loop: true,
        slidesPerView: 1,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  }
};
</script>

<style lang="scss">
.content__swiper {
  margin-top: 8px;
  width: 100%;
  overflow: hidden;
}
</style>
