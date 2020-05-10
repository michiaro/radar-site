<template>
  <footer class="footer">
    <div class="container">
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

    <div class="footer__slider">
      <swiper
        v-if="clients.length > 0"
        ref="swiper"
        :options="clientSwiperOptions"
      >
        <swiper-slide
          v-for="client in clients"
          :key="client.id"
          class="footer__swiper-slide swiper-slide"
        >
          <img
            class="footer__slide-image"
            :src="BASE_URL + client.logo.path"
            :alt="client.title"
          />
        </swiper-slide>
      </swiper>
    </div>

    <contact-form contrast />
  </footer>
</template>

<script>
import { getCollectionByKey } from '@/api/index.js';
import { BASE_URL } from '@/settings.js';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

import ContactForm from '@/components/ContactForm.vue';

// getSingletonByKey

export default {
  name: 'PageFooter',
  components: {
    Swiper,
    SwiperSlide,
    ContactForm,
  },
  data() {
    return {
      common: '',
      clients: [],
      BASE_URL,
      clientSwiperOptions: {
        loop: true,
        speed: 3000,
        slidesPerView: 6,
        spaceBetween: 120,
        autoplay: {
          delay: 1,
          disableOnInteraction: false,
          waitForTransition: false,
          stopOnLastSlide: false,
        },
        breakpoints: {
          0: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 120,
          },
          1200: {
            slidesPerView: 6,
          },
        },
      },
    };
  },
  created() {
    this.getClients();
  },
  methods: {
    async getClients() {
      const { data } = await getCollectionByKey({
        key: 'clients',
        filter: { isFeatured: true },
      });
      this.clients = data;
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
    color: $--color-brand;
  }
  &__slider {
    margin-bottom: 76px;
    @include from('md') {
      margin-bottom: 112px;
    }
  }
  &__swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
