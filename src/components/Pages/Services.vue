<template>
  <div class="services-page" v-if="services.length">
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
      <!-- <div class="row">
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
      </div> -->
    </div>

    <page-footer is-clients />
  </div>
</template>

<script>
import animateScrollTo from 'animated-scroll-to';
import PageFooter from '@/components/PageFooter.vue';
import ServicePageDirection from '@/components/ServicePageDirection.vue';
import ServicesPopup from '@/components/ServicesPopup.vue';
import { easeOutSin } from '@/utils/easings.js';
import { getCollectionByKey } from '@/api/index.js';

export default {
  name: 'Services',
  components: {
    PageFooter,
    ServicePageDirection,
    ServicesPopup,
  },
  data() {
    return {
      activeServiceId: null,
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
</style>
