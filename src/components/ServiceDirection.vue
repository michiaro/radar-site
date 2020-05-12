<template>
  <div class="service-direction" data-service-direction>
    <simplebar class="service-direction__scroll-container">
      <div class="service-direction__main">
        <div class="row">
          <div class="col col-xs-2 col-lg-2 col-xl-6">
            <h2 class="service-direction__title">
              {{ service.title }}
            </h2>
            <div class="service-direction__description">
              {{ glueUpPrepositions(service.description) }}
            </div>
          </div>
          <div class="col col-xs-2 col-sm-2 col-lg-2 col-xl-4 col-2xl-3">
            <div class="service-direction__button">
              <button class="button button--quiet">Обсудить задачу</button>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col col-xs-2 col-lg-2 col-xl-5">
            <p class="service-direction__info">
              {{ glueUpPrepositions(service.info) }}
            </p>
          </div>
          <div class="col col-xs-2 col-lg-2 col-xl-6 col-xl-offset-1">
            <div class="service-direction__subdirections">
              <p
                v-for="(subdivision, index) in service.subdivisions"
                :key="index"
                class="service-direction__subdirection"
              >
                {{ glueUpPrepositions(subdivision) }}
              </p>
            </div>
          </div>
        </div>
        <div class="row">
          <work-item
            v-for="(work, index) in works"
            :key="work.slug"
            :work="work"
            :index="index"
          />
        </div>
      </div>
    </simplebar>
    <div class="service-direction__label-rotor">
      <div class="service-direction__label">
        {{ service.title }}
      </div>
    </div>
    <div class="service-direction__plus" />
  </div>
</template>

<script>
import WorkItem from '@/components/WorkItem.vue';
import { glueUpPrepositions } from '@/utils/index.js';
import { getCollectionByKey } from '@/api/index.js';

import simplebar from 'simplebar-vue';
import 'simplebar/dist/simplebar.min.css';

export default {
  name: 'ServiceDirection',
  components: {
    WorkItem,
    simplebar,
  },
  props: {
    service: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isWorksLoading: false,
      works: null,
    };
  },
  created() {
    this.fetchWorks();
  },
  methods: {
    glueUpPrepositions,
    async fetchWorks() {
      this.isWorksLoading = true;

      const { data } = await getCollectionByKey({
        key: 'works',
        options: {
          limit: 8,
          sort: { _o: 1 },
        },
      });

      this.works = data;
      this.isWorksLoading = false;
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/shared/_globals.scss';

.service-direction {
  $service-direction: &;

  position: relative;
  box-sizing: border-box;
  padding: 1.5vw $--gutter;
  background: $--color-gray-200;
  transition-duration: $--duration-700, $--duration-700;
  transition-timing-function: $--timing-out-circ, $--timing-out-circ;
  transition-property: color, background-color;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &__label-rotor,
  &__plus {
    transition-duration: $--duration-200, $--duration-200;
    transition-timing-function: $--timing-in-circ, $--timing-out-circ;
    transition-property: opacity, transform;
  }

  &__label-rotor {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    top: $--page-padding-x;
    left: 3.25vw;
    transform: translate(0, -2vmax) rotate(-90deg);
    transform-origin: left bottom;
  }

  &__label {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(0, -58%);
    white-space: nowrap;
    font-size: 1.5625vw;
  }

  &__plus {
    $size: 1.5vmax;
    opacity: 0;
    transform: translate(-50%, 2vmax);
    position: absolute;
    width: 0;
    height: 0;
    bottom: $--page-padding-x + $size;
    left: 3.25vmax;
    &:before,
    &:after {
      content: '';
      position: absolute;
      height: 2px;
      left: -$size;
      right: -$size;
      background: $--color-gray-50;
    }
    &:after {
      transition-duration: 382ms;
      transition-timing-function: $--timing-in-out-cubic;
      transition-property: transform;
      transform: rotate(-90deg);
    }
  }

  &__scroll-container {
    height: 100%;
    overflow-x: hidden;

    .simplebar-track {
      display: none;
    }
  }

  &--contrast {
    background-color: $--color-gray-900;
    color: $--color-gray-50;

    #{$service-direction}__main {
      opacity: 0;
    }

    #{$service-direction}__label-rotor {
      opacity: 1;
      transform: translate(0, 0) rotate(-90deg);
    }

    #{$service-direction}__plus {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }

  &__main {

  }
  &__title {
    font-weight: normal;
    letter-spacing: $--letter-spacing;
    font-size: $--font-size-180;
    margin: 0;
    margin-bottom: 18px;

    @include from('md') {
      font-size: $--font-size-300;
    }
    @include from('lg') {
      margin-top: 38px;
      margin-bottom: 32px;
    }
    @include from('2xl') {
      font-size: $--font-size-500;
    }
  }
  &__description {
    font-size: $--font-size-100;
    line-height: 1.1;
    letter-spacing: $--letter-spacing;
    margin-bottom: 22px;

    @include from('lg') {
      margin-bottom: 100px;
      font-size: 36px;
    }
  }
  &__button {
    margin-bottom: 22px;
    @include from('lg') {
      margin-bottom: 0;
      margin-top: 44px;
    }
  }
  &__info {
    font-size: $--font-size-120;
    line-height: 1.15;
    letter-spacing: $--letter-spacing;
    margin: 0;
    margin-bottom: 22px;

    @include from('xl') {
      margin-bottom: 0;
    }
  }
  &__subdirections {
    margin-bottom: 28px;

    @include from('lg') {
      margin-bottom: 54px;
    }
  }
  &__subdirection {
    font-size: $--font-size-80;
    line-height: 1.3;
    letter-spacing: $--letter-spacing;
    padding-bottom: 12px;
    border-bottom: 1px solid $--color-gray-400;
    margin: 0;
    margin-top: 6px;

    @include from('lg') {
      font-size: $--font-size-90;
    }
  }
}
</style>
