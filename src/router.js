import VueRouter from "vue-router";
import Home from "./components/Pages/Home.vue";
import AllWorks from "./components/Pages/AllWorks.vue";
import About from "./components/Pages/About.vue";
import Team from "./components/Pages/Team.vue";
import Clients from "./components/Pages/Clients.vue";
import Contacts from "./components/Pages/Contacts.vue";
import Work from "./components/Pages/Work.vue";
import breakpoints from "./shared/breakpoints.js";

const router = new VueRouter({
  mode: "history",
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
            content: "/"
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
            content: "/all-works"
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
            content: "/about"
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
            content: "/team"
          }
        ]
      }
    },
    {
      path: "/clients",
      component: Clients,
      name: "Clients",
      props: () => ({ isMobile: window.innerWidth < breakpoints.xl }),
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
            content: "/clients"
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
            content: "/contacts"
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

export default router;