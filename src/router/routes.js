import Home from '@/components/pages/Home.vue';
import AllWorks from '@/components/pages/AllWorks.vue';
import Agency from '@/components/pages/Agency.vue';
import Services from '@/components/pages/Services.vue';
import Contacts from '@/components/pages/Contacts.vue';
import Policy from '@/components/pages/Policy.vue';
import ErrorPage from '@/components/pages/ErrorPage.vue';
import Work from '@/components/pages/Work.vue';
import Thankyou from '@/components/pages/Thankyou.vue';
import ConfirmYourAge from '@/components/pages/ConfirmYourAge.vue';
import PageHeader from '@/components/PageHeader.vue';

const routes = [
  {
    path: '/',
    components: {
      header: PageHeader,
      default: Home,
    },
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
    components: {
      header: PageHeader,
      default: AllWorks,
    },
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
    components: {
      header: PageHeader,
      default: Agency,
    },
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
    components: {
      header: PageHeader,
      default: Contacts,
    },
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
    components: {
      header: PageHeader,
      default: Services,
    },
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
    components: {
      header: PageHeader,
      default: Policy,
    },
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
    path: '/thankyou',
    components: {
      header: PageHeader,
      default: Thankyou,
    },
    name: 'Thankyou',
    meta: {
      title: 'Radar, Ваше сообщение отправлено',
      metaTags: [
        {
          name: 'description',
          content: 'Ваше сообщение успешно отправлено.',
        },
        {
          property: 'og:description',
          content: 'Ваше сообщение успешно отправлено.',
        },
        {
          name: 'og:title',
          content: 'Radar, Ваше сообщение отправлено',
        },
        {
          name: 'og:url',
          content: 'https://radar-online.ru/thankyou',
        },
      ],
    },
  },
  {
    path: '/404',
    components: {
      header: PageHeader,
      default: ErrorPage,
    },
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
    components: {
      header: PageHeader,
      default: Work,
    },
    name: 'Work',
    meta: {
      title: 'Radar, Работы',
    },
  },
  {
    path: '/confirm-your-age',
    component: ConfirmYourAge,
    name: 'ConfirmYourAge',
    meta: {
      title: 'Подтвердите, что вам больше 18 лет',
    },
  },
  { path: '*', redirect: { name: 'ErrorPage' } },
];

export default routes;
