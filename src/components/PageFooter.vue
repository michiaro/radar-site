<template>
  <footer class="footer">
    <div class="agency__clients clients">
      <h2 class="clients__title">
        <span class="clients__title--accent">
          Клиенты.
        </span>
        Нашему подходу и&nbsp;результатам доверяют
      </h2>

      <div class="clients__slider">
        <div class="clients-swiper-container swiper-container">
          <div class="clients__swiper-wrapper swiper-wrapper">
            <div
              v-for="client in clients"
              :key="client.id"
              class="clients__swiper-slide swiper-slide"
            >
              <img
                class="clients__image"
                :src="BASE_URL + client.logo.path"
                :alt="client.title"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { getCollectionByKey } from '@/api/index.js';
import { BASE_URL } from '@/settings.js';
// getSingletonByKey
import Swiper from 'swiper';

new Swiper('.clients-swiper-container', {
  loop: true,
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
  lazy: true,
});

export default {
  name: 'PageFooter',
  data() {
    return {
      common: '',
      clients: [],
      BASE_URL,
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

<style lang="scss"></style>
