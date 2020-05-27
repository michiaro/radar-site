<template>
  <div class="services-page">
    <div class="container">
      <div class="row">
        <div v-for="service in services" :key="service.serviceId" class="col col-xs-2 col-xl-4">
          <service-page-direction v-bind="service" @setService="setActiveServiceId" />
        </div>
      </div>
      <services-popup :services="services" :active-service-id="activeServiceId" @setService="setActiveServiceId" />
      <div class="row">
        <div class="col col-xs-2 col-lg-2 col-xl-8">
          <h1 class="services__title">
            Мы комплексно подходим к&nbsp;решению задач, наш&nbsp;подход
            базируется на&nbsp;четырех ключевых опорах:
          </h1>
        </div>
      </div>
      <div class="row">
        <div class="col col-xs-2 col-sm-4 col-lg-2 col-xl-3 col-xl-offset-2">
          Creative
        </div>
        <div class="col col-xs-2 col-sm-4 col-lg-2 col-xl-3 col-xl-offset-3">
          Design
        </div>
        <div class="col col-xs-2 col-sm-4 col-lg-2 col-xl-3 col-xl-offset-1">
          Strategy
        </div>
        <div class="col col-xs-2 col-sm-4 col-lg-2 col-xl-3 col-xl-offset-3">
          Innovation
        </div>
      </div>
    </div>

    <page-footer is-clients />
  </div>
</template>

<script>
import PageFooter from '@/components/PageFooter.vue';
import ServicePageDirection from '@/components/ServicePageDirection.vue';
import ServicesPopup from '@/components/ServicesPopup.vue';
import advertisingCampaign from '@/video/campaign.mp4';
import branding from '@/video/branding.mp4';
import smmDigital from '@/video/smm-digital.mp4';

export default {
  name: 'Services',
  components: {
    PageFooter,
    ServicePageDirection,
    ServicesPopup,
  },
  data() {
    return {
      services: [
        {
          serviceId: 'campaigns',
          videoUrl: advertisingCampaign,
          title: 'Рекламные кампании',
          description:
            'Создаем и проводим рекламные кампании во всех медиасредах',
          info:
            'Знаем какие средства, в каких медиаресурсах и с каким креативом будут работать на любой стадии жизни бренда – от запуска продукта, до его угасания.',
          subdivisions: [
            'Создаем стратегии локального и федерального масштаба',
            'Учитываем все виды медианосителей, используем инновационный подход',
            'Экспертиза в цифровых медиа и сильный собственный продакшен',
            'Создаем и проводим сложные событийные мероприятия (промо-акции с широкой географией, презентации и специальные события)',
          ],
        },
        {
          serviceId: 'branding',
          videoUrl: branding,
          title: 'Брендинг',
          description: 'Создаем лидерские бренды',
          info:
            'Стратегический брендинг определяющий долгосрочное позиционирование торговой марки на рынке, её идеологию, вербальную и визуальную идентификацию.',
          subdivisions: [
            'Исследования рынка и конкурентов, детальный аудит продукта и компании, анализ целевой аудитории',
            'Определение территории, ожиданий аудитории её инсайтов',
            'Создание платформы и метафор',
            'Внутренние и внешние коммуникации: визуальные, креативные и рекламные',
          ],
        },
        {
          serviceId: 'smmDigital',
          videoUrl: smmDigital,
          title: 'SMM+Digital',
          description: 'Сопровождаем бренды и продукты в цифровых средах',
          info:
            'Все виды коммуникаций в интернете и любых других цифровых средах. Современные технологии и последние новинки рынка Digital.',
          subdivisions: [
            'Разработка чистых цифровых стратегий',
            'Социальные сети продуктов и брендов «под ключ» нацеленные на результат: стратегия, концепция, креатив, контент план, дизайн оформление, пользовательский фидбек и продвижение',
            'Контекстная, медийная и видеореклама',
            'Ситуативный маркетинг и управление репутацией',
            'Собственное производство графических и видеоматериалов',
          ],
        },
      ],
      activeServiceId: null,
    };
  },
  methods: {
    setActiveServiceId(serviceId) {
      this.activeServiceId = serviceId;
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/shared/_globals.scss';

.services-page {
  padding-top: $--page-padding-x;
}
</style>
