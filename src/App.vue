<template>
  <div class="page">
    <page-header />
    <router-view />
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue';

export default {
  name: 'App',
  components: {
    PageHeader,
  },
  data() {
    return {};
  },
  // mounted() {
  //   this.$nextTick(() => {
  //     setTimeout(() => {
  //       // eslint-disable-next-line
  //       callibriInit();
  //     }, 500);
  //   });
  // },
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
}
</style>
