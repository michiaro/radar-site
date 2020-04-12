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
        //- .page-header__tel(v-if="!isMobile")
        //-   a.contacts-moscow.contacts-ekb.contacts-tyumen.contacts-chel(href="tel:+74954142222") +7 (495) 414-22-22
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
    iframe(
      src="https://www.googletagmanager.com/ns.html?id=GTM-5FTXJ2B"
      height="0"
      width="0"
      style="display:none;visibility:hidden"
    )
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
import Services from "./components/Pages/Services.vue";
import Policy from "./components/Pages/Policy.vue";

const router = new VueRouter({
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash,
        offset: { x: 0, y: 100 }
      };
    }
  },
  routes: [
    {
      path: "/",
      component: Home,
      name: "Home",
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
            content: "https://radar-online.ru/"
          }
        ]
      }
    },
    {
      path: "/all-works",
      component: AllWorks,
      name: "AllWorks",
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
            content: "https://radar-online.ru/all-works"
          }
        ]
      }
    },
    {
      path: "/about",
      component: About,
      name: "About",
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
            content: "https://radar-online.ru/about"
          }
        ]
      }
    },
    {
      path: "/team",
      component: Team,
      name: "Team",
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
            content: "https://radar-online.ru/team"
          }
        ]
      }
    },
    {
      path: "/clients",
      component: Clients,
      name: "Clients",
      props: () => ({ isMobile: window.innerWidth < 1200 }),
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
            content: "https://radar-online.ru/clients"
          }
        ]
      }
    },
    {
      path: "/contacts",
      component: Contacts,
      name: "Contacts",
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
            content: "https://radar-online.ru/contacts"
          }
        ]
      }
    },
    {
      path: "/services",
      component: Services,
      name: "Services",
      meta: {
        title: "Radar Advertising, Услуги",
        metaTags: [
          {
            name: "description",
            content:
              "Коммуникационное агентство RADAR Advertising, направления работы"
          },
          {
            property: "og:description",
            content:
              "Коммуникационное агентство RADAR Advertising, направления работы"
          },
          {
            name: "og:title",
            content: "Radar Advertising, Услуги"
          },
          {
            name: "og:url",
            content: "https://radar-online.ru/services"
          }
        ]
      }
    },
    {
      path: "/policy",
      component: Policy,
      name: "Policy",
      meta: {
        title: "Radar Advertising, Политика конфиденциальности",
        metaTags: [
          {
            name: "description",
            content: "Заботимся о ваших персональных данных."
          },
          {
            property: "og:description",
            content: "Заботимся о ваших персональных данных."
          },
          {
            name: "og:title",
            content: "Radar Advertising, Политика конфиденциальности"
          },
          {
            name: "og:url",
            content: "https://radar-online.ru/policy"
          }
        ]
      }
    },
    { path: "/index.html", redirect: { name: "Home" } },
    {
      path: "*.html",
      redirect: to => {
        return to.path.replace(".html", "");
      }
    },
    {
      path: "/:slug",
      component: Work,
      name: "Work",
      meta: {
        title: "Radar Advertising, Работы"
      }
    },
    { path: "*", redirect: { name: "Home" } }
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
  // eslint-disable-next-line
  const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.metaTags);

  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  Array.from(
    document.querySelectorAll("[data-vue-router-controlled]")
  ).map(el => el.parentNode.removeChild(el));

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

      api.getSingletonsByKey("common").then(common => {
        this.content.common = common;
      });
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
