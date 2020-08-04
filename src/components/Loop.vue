<template>
  <div class="loop">
    <div
      ref="loopSlider"
      class="loop__slider"
      :class="{ 'loop__slider--sliding': clients.length > 0 }"
      :style="animationDuration"
    >
      <div v-for="client in clients" :key="client.id" class="loop__slide">
        <router-link :to="{ name: 'AllWorks', query: { client: client.slug } }">
          <img
            class="loop__image"
            :src="baseURL + client.logo.path"
            :alt="client.title"
          />
        </router-link>
      </div>
      <div v-for="client in clients" :key="client.id" class="loop__slide">
        <router-link :to="{ name: 'AllWorks', query: { client: client.slug } }">
          <img
            class="loop__image"
            :src="baseURL + client.logo.path"
            :alt="client.title"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { baseURL, getCollectionByKey } from '@/api/index.js';

export default {
  name: 'Loop',
  data() {
    return {
      clients: [],
      baseURL,
    };
  },
  computed: {
    animationDuration() {
      return `animation-duration: ${this.clients.length * 1.5}s`;
    },
  },
  created() {
    this.getClients();
  },
  methods: {
    async getClients() {
      const { data } = await getCollectionByKey({
        key: 'clients',
        filter: { isFeatured: true },
        options: {
          sort: { _o: 1 },
        },
      });
      this.clients = data;
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/shared/_globals.scss';

.loop {
  overflow: hidden;

  &__slider {
    display: flex;
    flex-wrap: nowrap;
    width: auto;
    animation: loop infinite linear;
  }
  &__slide {
    min-width: 50%;
    text-align: center;

    @include from('md') {
      min-width: 25%;
    }
    @include from('xl') {
      min-width: 20%;
    }
  }
  &__image {
    max-width: 100%;
    height: auto;
    filter: grayscale(1);
    transition: filter $--duration-300 $--timing-in-out-cubic;

    &:hover {
      filter: grayscale(0);
    }
  }
}

@keyframes loop {
  100% {
    transform: translate(-100%, 0);
  }
}
</style>
