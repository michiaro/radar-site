<template>
  <div class="page">
    <page-header />
    <router-view />
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue';
import { getStaticData } from '@/api/index.js';
import { DESKTOP_SIZE, TABLET_SIZE } from '@/settings.js';

export default {
  name: 'App',
  components: {
    PageHeader,
  },
  mounted() {
    this.$nextTick(async () => {
      const { isUpdated, lastUpdated, singletones } = await getStaticData(lastUpdated);

      if (isUpdated) {
        this.$store.commit('setStaticData', { lastUpdated, singletones });
      }

      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    });
  },
  methods: {
    handleResize() {
      const isTablet = window.innerWidth <= TABLET_SIZE;
      this.$store.commit('setIsTablet', { isTablet });

      const isMobile = window.innerWidth <= DESKTOP_SIZE;
      this.$store.commit('setIsMobile', { isMobile });

      const isMenuOpen = window.innerWidth >= DESKTOP_SIZE;
      this.$store.commit('setMenuOpen', { isMenuOpen });
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/shared/_globals.scss';

[v-cloak] {
  display: none;
}

.page {
  padding-top: $--header-height;
}
</style>
