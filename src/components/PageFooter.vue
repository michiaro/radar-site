<template>
  <footer class="footer">
    <div class="grid">
      <div class="row">
        <div class="col col-xs-2 col-sm-2 col-md-3 col-lg-6 col-2xl-4">
          <h2 class="footer__title">
            <span class="footer__title--accent">
              Клиенты.
            </span>
            Нашему подходу и&nbsp;результатам доверяют
          </h2>
        </div>
      </div>
    </div>

    <!-- <div class="footer__slider">
      <swiper ref="swiper" :options="clientSwiperOptions">
        <swiper-slide
          v-for="client in clients"
          :key="client.id"
          class="footer__swiper-slide"
        >
          <img
            class="footer__slide-image"
            :src="BASE_URL + client.logo.path"
            :alt="client.title"
          />
        </swiper-slide>
      </swiper> -->
      <!-- <div class="clients-swiper-container swiper-container">
        <div class="footer__swiper-wrapper swiper-wrapper">
          <div
            v-for="client in clients"
            :key="client.id"
            class="footer__swiper-slide swiper-slide"
          >
            <img
              class="footer__slide-image"
              :src="BASE_URL + client.logo.path"
              :alt="client.title"
            />
          </div>
        </div>
      </div> -->
    </div>

    <!-- form -->
  </footer>
</template>

<script>
import { getCollectionByKey } from '@/api/index.js';
import { BASE_URL } from '@/settings.js';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

// getSingletonByKey
// import Swiper from 'swiper';

// const clientSwiper = new Swiper('.clients-swiper-container', {
//   loop: true,
//   speed: 400,
//   slidesPerView: 6,
//   // spaceBetween: 120,
//   autoplay: {
//     delay: 3000,
//     disableOnInteraction: false,
//   },
//   breakpoints: {
//     680: {
//       slidesPerView: 2,
//       // spaceBetween: 10,
//     },
//     922: {
//       slidesPerView: 4,
//       spaceBetween: 120,
//     },
//     1200: {
//       slidesPerView: 6,
//       // spaceBetween: 30,
//     },
//   },
//   preloadImages: false,
// });

export default {
  name: 'PageFooter',
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      common: '',
      clients: [],
      BASE_URL,
      clientSwiperOptions: {
        loop: true,
        // speed: 400,
        slidesPerView: 6,
        spaceBetween: 120,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        breakpoints: {
          680: {
            slidesPerView: 2,
            // spaceBetween: 10,
          },
          922: {
            slidesPerView: 4,
            spaceBetween: 120,
          },
          1200: {
            slidesPerView: 6,
            // spaceBetween: 30,
          },
        },
        preloadImages: false,
      },
    };
  },
  created() {
    this.getClients();
  },
  methods: {
    async getClients() {
      this.clients = await getCollectionByKey({
        key: 'clients',
        filterOptions: { isFeatured: true },
      });
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/shared/_globals.scss';

.footer {
  margin-top: 76px;
  @include from('md') {
    margin-top: 156px;
  }
  @include from('xl') {
    margin-top: 186px;
  }

  &__title {
    margin: 0;

    font-weight: normal;
    font-size: 23px;
    letter-spacing: $--letter-spacing;

    margin-bottom: 62px;
    @include from('md') {
      margin-bottom: 104px;
      font-size: 44px;
    }
  }
  &__title--accent {
    color: $color-primary;
  }
  &__slider {
    margin-bottom: 76px;
    @include from('md') {
      margin-bottom: 112px;
    }
  }
  &__swiper-wrapper {
  }
  &__swiper-slide {
    // display: flex;
    // align-items: center;
    // justify-content: center;
    // max-width: 230px;
    // @include from('md') {
    //   max-width: 260px;
    // }
  }
  &__slide-image {
  }
}
</style>
