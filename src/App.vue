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
    {
      path: "/",
      component: Home,
      meta: {
        title: "Radar Advertising",
        metaTags: [
          {
            name: "description",
            content: "Коммуникационное агентство полного цикла."
          },
          {
            property: "og:description",
            content: "Коммуникационное агентство полного цикла."
          },
          {
            name: "og:title",
            content: "Radar Advertising"
          },
          {
            name: "og:url",
            content: "http://new.radar-online.mcdir.ru/"
          }
        ]
      }
    },
    {
      path: "/all-works",
      component: AllWorks,
      meta: {
        title: "Radar Advertising, Работы",
        metaTags: [
          {
            name: "description",
            content: "Наше портфолио."
          },
          {
            property: "og:description",
            content: "Наше портфолио."
          },
          {
            name: "og:title",
            content: "Radar Advertising, Работы"
          },
          {
            name: "og:url",
            content: "http://new.radar-online.mcdir.ru/all-works"
          }
        ]
      }
    },
    {
      path: "/about",
      component: About,
      meta: {
        title: "Radar Advertising, О нас",
        metaTags: [
          {
            name: "description",
            content: "Больше об агентстве."
          },
          {
            property: "og:description",
            content: "Больше об агентстве."
          },
          {
            name: "og:title",
            content: "Radar Advertising, О нас"
          },
          {
            name: "og:url",
            content: "http://new.radar-online.mcdir.ru/about"
          }
        ]
      }
    },
    {
      path: "/team",
      component: Team,
      meta: {
        title: "Radar Advertising, Команда",
        metaTags: [
          {
            name: "description",
            content: "Наша команда."
          },
          {
            property: "og:description",
            content: "Наша команда."
          },
          {
            name: "og:title",
            content: "Radar Advertising, Команда"
          },
          {
            name: "og:url",
            content: "http://new.radar-online.mcdir.ru/team"
          }
        ]
      }
    },
    {
      path: "/clients",
      component: Clients,
      meta: {
        title: "Radar Advertising, Клиенты",
        metaTags: [
          {
            name: "description",
            content: "Наши клиенты"
          },
          {
            property: "og:description",
            content: "Наши клиенты"
          },
          {
            name: "og:title",
            content: "Radar Advertising, Клиенты"
          },
          {
            name: "og:url",
            content: "http://new.radar-online.mcdir.ru/clients"
          }
        ]
      }
    },
    {
      path: "/contacts",
      component: Contacts,
      meta: {
        title: "Radar Advertising, Контакты",
        metaTags: [
          {
            name: "description",
            content:
              "Мы находимся в Москве и Челябинске, работаем с компаниями по всей России. Всегда рядом с вами!"
          },
          {
            property: "og:description",
            content:
              "Мы находимся в Москве и Челябинске, работаем с компаниями по всей России. Всегда рядом с вами!"
          },
          {
            name: "og:title",
            content: "Radar Advertising, Контакты"
          },
          {
            name: "og:url",
            content: "http://new.radar-online.mcdir.ru/contacts"
          }
        ]
      }
    },
    {
      path: "/all-works/:slug",
      component: Work,
      meta: {
        title: "Radar Advertising, Работы",
        metaTags: [
          {
            name: "description",
            content: "Наше портфолио"
          },
          {
            property: "og:description",
            content: "Наше портфолио"
          },
          {
            name: "og:title",
            content: "Radar Advertising, Работы"
          },
          {
            name: "og:url",
            content: "http://new.radar-online.mcdir.ru/all-works/"
          },
          {
            name: "og:image",
            content: "http://new.radar-online.mcdir.ru/all-works/"
          }
        ]
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title);

  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.metaTags);

  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  Array.from(document.querySelectorAll("[data-vue-router-controlled]")).map(
    el => el.parentNode.removeChild(el)
  );

  if (!nearestWithMeta) return next();

  nearestWithMeta.meta.metaTags
    .map(tagDef => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
      });

      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })
    .forEach(tag => document.head.appendChild(tag));

  next();
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
}
</style>
