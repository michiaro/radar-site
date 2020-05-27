<template>
  <div class="page">
    <page-header />
    <router-view />
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue';
import { getStaticData } from '@/api/index.js';

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
    });
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
