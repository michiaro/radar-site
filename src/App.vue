<template lang="pug">
  #app
    header(
      :class=" { 'mobile-header' : isMobile,'page-header' : !isMobile  }"
    )
      div(
        :class=" { 'mobile-header__wrapper' : isMobile, 'content page-header__content' : !isMobile }"
      )
        router-link(to="/")
          Logo
        button.hamburger.js-hamburger(
          v-if="isMobile",
          type="button",
          @click="toggleMenu",
          :class="{'is-active' : isMenuOpen}",
        )
          .hamburger-box
        .page-header__tel(v-if="!isMobile")
          a.contacts-moscow.contacts-ekb.contacts-tyumen.contacts-chel(href="tel:+74956020399") +7 (495) 602-03-99
        Navigation(
          v-if="!isMobile"
        )
      Navigation(
        :isMobile="isMobile",
        :isMenuOpen="isMenuOpen",
        v-if="isMobile",
        v-show="isMenuOpen"
      )
    router-view
    Footer
</template>

<script>
import api from "./api/";
import router from "./router.js";
import Navigation from "./components/Navigation.vue";
import Footer from "./components/Footer.vue";
import Logo from "./components/Logo.vue";
import breakpoints from "./shared/breakpoints.js";

export default {
  router,
  name: "app",
  components: {
    Navigation,
    Footer,
    Logo
  },
  data() {
    return {
      isMenuOpen: false,
      isMobile: false,
      content: {
        common: ""
      }
    };
  },
  methods: {
    handleResize() {
      this.isMobile = window.innerWidth < breakpoints.xl;
      this.isMenuOpen = window.innerWidth >= breakpoints.xl;
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.handleResize);
      this.handleResize();
    });

    api.getSingletonsByKey("common").then(common => {
      this.content.common = common;
    });
  },
  watch: {
    $route() {
      this.closeMenu();
      if (
        !this.$route.query.filter &&
        !this.$route.query.client &&
        !this.$route.query.team
      ) {
        window.scrollTo(0, 0);
      }
    }
  }
};
</script>

<style lang="scss">
[v-cloak] {
  display: none;
}

#app {
  position: relative;
  min-height: 100vh;
}
</style>
