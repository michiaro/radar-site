<template>
  <div v-if="services.length" class="services-page">
    <div class="container">
      <div class="row">
        <div
          v-for="service in services"
          :key="service.serviceId"
          class="col col-xs-2 col-xl-4"
        >
          <service-page-direction
            v-bind="service"
            @setService="handleClickOnService"
          />
        </div>
      </div>
      <services-popup
        :services="services"
        :active-service-id="activeServiceId"
        @setService="handleClickOnService"
      />

      <div class="pillars">
        <div class="row">
          <div class="col col-xs-2 col-lg-3 col-xl-8">
            <h1 class="pillars__title">
              Мы комплексно подходим к&nbsp;решению задач, наш&nbsp;подход
              базируется на&nbsp;четырех ключевых опорах:
            </h1>
          </div>
        </div>
      </div>
    </div>
    <pillar
      v-for="(pillar, index) in pillars"
      :key="index"
      :pillar="pillar"
      :number="index + 1"
    />

    <page-footer is-clients />
  </div>
</template>

<script>
import animateScrollTo from 'animated-scroll-to';
import PageFooter from '@/components/PageFooter.vue';
import ServicePageDirection from '@/components/services/ServicePageDirection.vue';
import ServicesPopup from '@/components/services/ServicesPopup.vue';
import Pillar from '@/components/services/Pillar.vue';
import { easeOutSin } from '@/utils/easings.js';
import { getCollectionByKey } from '@/api/index.js';

import creative from '@/video/creative.mp4';
import design from '@/video/design.mp4';
import strategy from '@/video/strategy.mp4';
import innovation from '@/video/innovation.mp4';

export default {
  name: 'Services',
  components: {
    PageFooter,
    ServicePageDirection,
    ServicesPopup,
    Pillar,
  },
  data() {
    return {
      activeServiceId: null,
      pillars: [
        {
          title: 'Креатив',
          description: 'Базируемся на стратегических решениях',
          content: `<p>Всегда находимо интересное решение любой задачи. Исключительно хорошо делаем отдельные задачи, из которых складываются наши компетенции:</p>
          <ul>
            <li>нейминг</li>
            <li>креативные концепции</li>
            <li>визуалы</li>
            <li>сценарии роликов</li>
            <li>концепции материалов в цифровой среде</li>
          </ul>`,
          video: creative,
          id: 'creative',
        },
        {
          title: 'Дизайн',
          description: 'Придерживаемся принципов осознанного дизайна',
          content: `<p>Любая дизайн задача решается разными дизайнерами с разным подходом, взглядом перспективой. Больше всего мы любим:</p>
          <ul>
            <li>продуктовые упаковки</li>
            <li>логотипы</li>
            <li>фирменные стили</li>
            <li>дизайн-концепции</li>
            <li>рекламные материалы</li>
            <li>спецпроекты</li>
          </ul>`,
          video: design,
          id: 'design',
        },
        {
          title: 'Стратегии',
          description: 'Любую задачу пропускаем через стратегическое сито',
          content: `<p>Стратегический подход синхронизирует все усилия для достижения максимального результата. Наши стратеги разрабатывают:</p>
          <ul>
            <li>продуктовые стратегии</li>
            <li>позиционирование марок</li>
            <li>медийные стратегии</li>
            <li>диджитал стратегии</li>
            <li>исследования</li>
          </ul>`,
          video: strategy,
          id: 'strategy',
        },
        {
          title: 'Инновации',
          description: 'Предлагаем самые актуальные и эффективные решения',
          content: `<p>Мир вокруг меняется настолько быстро, что важно держать руку на пульсе и быть в контексте.</p>
          <ul>
            <li>ньюсджекинг</li>
            <li>современные технологии</li>
            <li>новые комбинации медиа</li>
            <li>нестандартный подход к аудитории и продукту</li>
            <li>оптимизиация бизнеспроцессов</li>
          </ul>`,
          video: innovation,
          id: 'innovation',
        },
      ],
    };
  },
  computed: {
    services() {
      return this.$store.state.services.content || null;
    },
  },
  async created() {
    const activeServiceId = this.$route.query.direction;

    if (activeServiceId) {
      this.setActiveServiceId(activeServiceId);
    }

    const { services } = this;
    if (!services.length) {
      await this.fetchServices();
      this.animationStep = 1;
    } else {
      this.animationStep = services.length + 1;
    }
  },
  methods: {
    async fetchServices() {
      const { data } = await getCollectionByKey({
        key: 'Services',
        filter: { isPublished: true },
        options: {
          sort: { _o: 1 },
        },
      });

      this.$store.commit('setServicesContent', { data });
    },
    async setActiveServiceId(serviceId) {
      const isScrolled = await animateScrollTo(0, {
        easing: easeOutSin,
        maxDuration: 700,
      });

      if (isScrolled) {
        this.activeServiceId = serviceId;
      }
    },
    handleClickOnService(serviceId) {
      const currentServiceId = this.$route.query.direction;

      let newPath = {
        path: '/services',
      };
      if (serviceId !== currentServiceId) {
        if (serviceId) {
          newPath = {
            ...newPath,
            query: {
              direction: serviceId,
            },
          };
        }
        this.setActiveServiceId(serviceId);
        this.$router.push(newPath);
      }
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/shared/_globals.scss';

.services-page {
  padding-top: $--page-padding-x;
}

.pillars {
  &__title {
    font-weight: normal;
    font-size: 4.1vmax;
    letter-spacing: $--letter-spacing;
    color: $--color-text;
  }
}
</style>
