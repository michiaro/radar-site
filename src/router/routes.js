import Home from '@/components/pages/Home.vue';
import AllWorks from '@/components/pages/AllWorks.vue';
import Agency from '@/components/pages/Agency.vue';
import Services from '@/components/pages/Services.vue';
import Contacts from '@/components/pages/Contacts.vue';
import Policy from '@/components/pages/Policy.vue';
import ErrorPage from '@/components/pages/ErrorPage.vue';
import Work from '@/components/pages/Work.vue';

const routes = [
  {
    path: '/',
    component: Home,
    name: 'Home',
    meta: {
      title: 'Radar',
      metaTags: [
        {
          name: 'description',
          content: 'Коммуникационное агентство полного цикла.',
        },
        {
          property: 'og:description',
          content: 'Коммуникационное агентство полного цикла.',
        },
        {
          name: 'og:title',
          content: 'Radar',
        },
        {
          name: 'og:url',
          content: 'https://radar-online.ru/',
        },
      ],
    },
  },
  {
    path: '/all-works',
    component: AllWorks,
    name: 'AllWorks',
    meta: {
      title: 'Radar, Работы',
      metaTags: [
        {
          name: 'description',
          content: 'Наше портфолио.',
        },
        {
          property: 'og:description',
          content: 'Наше портфолио.',
        },
        {
          name: 'og:title',
          content: 'Radar, Работы',
        },
        {
          name: 'og:url',
          content: 'https://radar-online.ru/all-works',
        },
      ],
    },
  },
  {
    path: '/agency',
    component: Agency,
    name: 'Agency',
    meta: {
      title: 'Radar, Агентство',
      metaTags: [
        {
          name: 'description',
          content: 'Больше об агентстве.',
        },
        {
          property: 'og:description',
          content: 'Больше об агентстве.',
        },
        {
          name: 'og:title',
          content: 'Radar, Агентство',
        },
        {
          name: 'og:url',
          content: 'https://radar-online.ru/agency',
        },
      ],
    },
  },
  {
    path: '/contacts',
    component: Contacts,
    name: 'Contacts',
    meta: {
      title: 'Radar, Контакты',
      metaTags: [
        {
          name: 'description',
          content:
            'Мы находимся в Москве и Челябинске, работаем с компаниями по всей России. Всегда рядом с вами!',
        },
        {
          property: 'og:description',
          content:
            'Мы находимся в Москве и Челябинске, работаем с компаниями по всей России. Всегда рядом с вами!',
        },
        {
          name: 'og:title',
          content: 'Radar, Контакты',
        },
        {
          name: 'og:url',
          content: 'https://radar-online.ru/contacts',
        },
      ],
    },
  },
  {
    path: '/services',
    component: Services,
    name: 'Services',
    meta: {
      title: 'Radar, Услуги',
      metaTags: [
        {
          name: 'description',
          content:
            'Коммуникационное агентство RADAR, направления работы',
        },
        {
          property: 'og:description',
          content:
            'Коммуникационное агентство RADAR, направления работы',
        },
        {
          name: 'og:title',
          content: 'Radar, Услуги',
        },
        {
          name: 'og:url',
          content: 'https://radar-online.ru/services',
        },
      ],
    },
  },
  {
    path: '/policy',
    component: Policy,
    name: 'Policy',
    meta: {
      title: 'Radar, Политика конфиденциальности',
      metaTags: [
        {
          name: 'description',
          content: 'Заботимся о ваших персональных данных.',
        },
        {
          property: 'og:description',
          content: 'Заботимся о ваших персональных данных.',
        },
        {
          name: 'og:title',
          content: 'Radar, Политика конфиденциальности',
        },
        {
          name: 'og:url',
          content: 'https://radar-online.ru/policy',
        },
      ],
    },
  },
  {
    path: '/404',
    component: ErrorPage,
    name: 'ErrorPage',
    meta: {
      title: 'Radar, Страница не существует',
      metaTags: [
        {
          name: 'description',
          content: 'Коммуникационное агентство полного цикла.',
        },
        {
          property: 'og:description',
          content: 'Коммуникационное агентство полного цикла.',
        },
        {
          name: 'og:title',
          content: 'Radar, Страница не существует',
        },
        {
          name: 'og:url',
          content: 'https://radar-online.ru/404',
        },
      ],
    },
  },
  { path: '/index.html', redirect: { name: 'Home' } },
  {
    path: '*.html',
    redirect: (to) => {
      return to.path.replace('.html', '');
    },
  },
  {
    path: '/all-works/:slug',
    component: Work,
    name: 'Work',
    meta: {
      title: 'Radar, Работы',
    },
  },
  { path: '*', redirect: { name: 'ErrorPage' } },
];

export default routes;
