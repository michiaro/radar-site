<template>
  <div class="page" :class="{'page--titleless' : isWorksPage}">
    <page-header />
    <router-view />
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    PageHeader,
  },
  data() {
    return {};
  },
  computed: {
    isWorksPage() {
      return this.$route.name === 'AllWorks';
    }
  },
  mounted() {
    this.$nextTick(async () => {
      const { data } = await axios.get('/cockpit/getStaticData.php', {
        params: {
          lastUpdated: 0,
        },
      });

      const { isUpdated, lastUpdated, singletones } = data;

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
  padding-top: 120px;

  @include from('lg') {
    padding-top: 152px;
  }

  @include from('xl') {
    padding-top: 162px;
  }

  &--titleless {
    padding-top: 108px;
  }
}
</style>
