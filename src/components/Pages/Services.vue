<template>
  <h1>Services</h1>
  <!-- <div class="services">
    <div class="grid">
      <div class="row">
        <div class="services__item">
          <div class="service" @mouseenter="handleHover('campaign')">
            <video
              ref="campaignVideo"
              class="service__video"
              muted="muted"
              playsinline
              preload="auto"
            >
              <source :src="dummyVideo" type="video/mp4" />
            </video>
            <div class="service__content">
              <h2 class="service__title">
                Рекламные кампании
              </h2>
              <p class="service__description">
                Создаем и&nbsp;проводим рекламные кампании во&nbsp;всех
                медиасредах
              </p>
            </div>
          </div>
        </div>
        <div class="services__item">
          <div class="service" @mouseenter="handleHover('branding')">
            <video
              ref="brandingVideo"
              class="service__video"
              muted="muted"
              playsinline
              preload="auto"
            >
              <source :src="dummyVideo" type="video/mp4" />
            </video>
            <div class="service__content">
              <h2 class="service__title">
                Брендинг
              </h2>
              <p class="service__description">
                Создаем лидерские бренды
              </p>
            </div>
          </div>
        </div>
        <div class="services__item">
          <div class="service" @mouseenter="handleHover('digital')">
            <video
              ref="digitalVideo"
              class="service__video"
              muted="muted"
              playsinline
              preload="auto"
            >
              <source :src="dummyVideo" type="video/mp4" />
            </video>
            <div class="service__content">
              <h2 class="service__title">
                SMM+Digital
              </h2>
              <p class="service__description">
                Сопровождаем бренды и&nbsp;продукты в&nbsp;цифровых средах
              </p>
            </div>
          </div>
        </div>
      </div>
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

    <page-footer />
  </div> -->
</template>

<script>
import { getCollectionByKey } from '@/api/index.js';
import PageFooter from '@/components/PageFooter.vue';
import dummyVideo from '@/video/service-dummy-video.mp4';

export default {
  name: 'Services',
  components: {
    PageFooter,
  },
  data() {
    return {
      dummyVideo,
    };
  },
  computed: {},
  created() {},
  methods: {
    handleHover(service) {
      const key = service + 'Video';
      this.$refs[key].play();
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/shared/_globals.scss';

.services {
  &__item {
    flex-grow: 1;
    box-sizing: border-box;

    padding-right: 15px;
    padding-left: 15px;

    flex-basis: 100%;
    max-width: 100%;

    @include from('lg') {
      flex-basis: 33.33%;
      max-width: 33.33%;
    }
  }
  &__title {
  }
}
.service {
  position: relative;

  $service-padding: 14px;
  $service-padding-top: 18px;

  &__content {
    position: absolute;
    top: $service-padding-top;
    left: $service-padding;
    right: $service-padding;

    letter-spacing: $--letter-spacing;
  }

  &__title {
    font-size: $--font-size-200;
    margin: 0;
    margin-bottom: 20px;

    @include from('lg') {
      min-height: 156px;
    }
  }
  &__description {
    font-size: $--font-size-100;
    line-height: 1.3;
    margin: 0;
  }
  &__video {
    width: 100%;
    max-width: 100%;
    height: auto;

    opacity: 0.3;
  }
}
</style>
