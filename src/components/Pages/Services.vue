<template>
  <div v-if="services.length" class="services-page">
    <div class="container">
      <div class="row">
        <div v-for="service in services" :key="service.serviceId" :data-item-event="'services-'+service.serviceId" @click="triggerEvent('services-'+service.serviceId)" class="col col-xs-2 col-xl-4">
          <service-page-direction
            :service-id="service.serviceId"
            :video="service.video"
            :title="service.title"
            :description="service.description"
            :is-open="service.serviceId === activeServiceId"
            @setService="handleClickOnService"
          />
        </div>
      </div>
      <services-popup :services="services" :active-service-id="activeServiceId" @setService="handleClickOnService" />
    </div>

    <div class="pillars">
      <div class="container">
        <div class="row">
          <div class="col col-xs-2 col-lg-3 col-xl-8">
            <h1 class="pillars__title">
              Мы комплексно подходим к&nbsp;решению задач, наш&nbsp;подход базируется на&nbsp;четырех ключевых опорах:
            </h1>
          </div>
        </div>
      </div>

      <pillar v-for="(pillar, index) in pillars" :key="index" :data-item-event="'pillars-'+pillar.id" :pillar="pillar" :number="index + 1" />
    </div>

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
      titleVisibility: false,
    };
  },
  beforeRouteLeave(to, from, next) {
    if ('filter' in to.query){
      this.triggerEvent('pillars-'+to.query.filter);
    }
    next(true);
  },
  computed: {
    services() {
      return this.$store.state.services.content || [];
    },
    pillars() {
      return this.$store.state.services.pillars || [];
    },
  },
  async created() {
    const activeServiceId = this.$route.query.direction;

    if (activeServiceId) {
      this.setActiveServiceId(activeServiceId);
    }

    const { pillars, services } = this;

    if (!services.length) {
      this.fetchServices();
    }

    if (!pillars.length) {
      await this.fetchPillars();
    }
  },
  methods: {
    triggerEvent(event) {
      document.dispatchEvent(new Event(event));
    },
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
    async fetchPillars() {
      const { data } = await getCollectionByKey({
        key: 'pillars',
        options: {
          sort: { _o: 1 },
        },
      });

      this.$store.commit('setPillarsContent', { data });
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
