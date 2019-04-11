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
        v-if="isMobile",
        v-show="isMenuOpen"
      )
    router-view
    Footer
</template>

<script>
import api from "./api/";
import VueRouter from "vue-router";
import Navigation from "./components/Navigation.vue";
import Footer from "./components/Footer.vue";
import Logo from "./components/Logo.vue";

import Home from "./components/Pages/Home.vue";
import AllWorks from "./components/Pages/AllWorks.vue";
import About from "./components/Pages/About.vue";
import Team from "./components/Pages/Team.vue";
import Clients from "./components/Pages/Clients.vue";
import Contacts from "./components/Pages/Contacts.vue";
import Work from "./components/Pages/Work.vue";

// eslint-disable-next-line
const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: Home },
    { path: "/all-works", component: AllWorks },
    { path: "/about", component: About },
    { path: "/team", component: Team },
    { path: "/clients", component: Clients },
    { path: "/contacts", component: Contacts },
    { path: "/all-works/:slug", component: Work },
  ]
});

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
      this.isMobile = window.innerWidth < 1200;
      this.isMenuOpen = window.innerWidth >= 1200;
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
    // var worksTags = [this.content.works[0].tags[0]];
    // eslint-disable-next-line
    // console.log(worksTags);

    // var filteredWorks =
    //   this.content.works &&
    //   worksTags.filter(function(worksTags) {
    //     return
    //     worksTags, tag => tag._id === this.currentFilter._id
    //   });

    // var filteredWorks = Object.keys(this.content.works.work.tags, tag => tag._id === this.currentFilter._id);

    // this.filteredWorks = filteredWorks;
    // eslint-disable-next-line
    // console.log(this.filteredWorks);
  },
  computed: {}
};
</script>

<style lang="scss">
[v-cloak] {
  display: none;
}
</style>
