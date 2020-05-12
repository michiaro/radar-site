<template>
  <div class="services-page">
    <div class="container">
      <div class="row">
        <div v-for="service in services" :key="service.serviceId" class="col col-xs-2 col-xl-4">
          <service-section v-bind="service" @openService="openServicePopup" />
        </div>
      </div>
      <services-popup :services="services" />
      <div class="row">
        <div class="col col-xs-2 col-lg-2 col-xl-8">
          <h1 class="services__title">
            Мы комплексно подходим к&nbsp;решению задач, наш&nbsp;подход базируется на&nbsp;четырех ключевых опорах:
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

    <page-footer />
  </div>
</template>

<script>
import PageFooter from '@/components/PageFooter.vue';
import ServiceSection from '@/components/ServiceSection.vue';
import ServicesPopup from '@/components/ServicesPopup.vue';
import advertisingCampaign from '@/video/campaign.mp4';
import branding from '@/video/branding.mp4';
import dummyVideo from '@/video/service-dummy-video.mp4';
import smmDigital from '@/video/smm-digital.mp4';

export default {
  name: 'Services',
  components: {
    PageFooter,
    ServiceSection,
    ServicesPopup,
  },
  data() {
    return {
      services: [
        {
          serviceId: 'campaigns',
          videoUrl: advertisingCampaign,
          title: 'Рекламные кампании',
          description: 'Создаем и&nbsp;проводим рекламные кампании во&nbsp;всех медиасредах',
        },
        {
          serviceId: 'branding',
          videoUrl: branding,
          title: 'Брендинг',
          description: 'Создаем лидерские бренды',
        },
        {
          serviceId: 'smmDigital',
          videoUrl: smmDigital,
          title: 'SMM+Digital',
          description: 'Сопровождаем бренды и&nbsp;продукты в&nbsp;цифровых средах',
        },
      ],
    };
  },
  methods: {
    openServicePopup({ serviceNode, serviceId }) {
      console.log(serviceNode, serviceId);
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/shared/_globals.scss';
</style>
