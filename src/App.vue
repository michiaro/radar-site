<template>
  <div class="page">
    <page-header />
    <router-view />
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue';
// import api from "./api/";
// import VueRouter from "vue-router";
// import Navigation from "./components/Navigation.vue";
// import Footer from "./components/Footer.vue";
// import Logo from "./components/Logo.vue";

export default {
  // router,
  name: 'App',
  components: {
    PageHeader,
    // Navigation,
    // Footer,
    // Logo
  },
  data() {
    return {
      isMenuOpen: false,
      isMobile: false,
      content: {
        common: '',
      },
    };
  },
  // methods: {
  //   handleResize() {
  //     this.isMobile = window.innerWidth < 1200;
  //     this.isMenuOpen = window.innerWidth >= 1200;
  //   },
  //   toggleMenu() {
  //     this.isMenuOpen = !this.isMenuOpen;
  //   },
  //   closeMenu() {
  //     this.isMenuOpen = false;
  //   }
  // },
  // mounted() {
  //   this.$nextTick(() => {
  //     window.addEventListener("resize", this.handleResize);
  //     this.handleResize();

  //     api.getSingletonsByKey("common").then(common => {
  //       this.content.common = common;
  //     });
  //   });
  // },
  // watch: {
  //   $route() {
  //     this.closeMenu();
  //     if (
  //       !this.$route.query.filter &&
  //       !this.$route.query.client &&
  //       !this.$route.query.team
  //     ) {
  //       window.scrollTo(0, 0);
  //     }
  //   }
  // }
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
