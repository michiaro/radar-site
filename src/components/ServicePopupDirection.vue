<template>
  <div class="service-direction" :class="{ 'service-direction--contrast': !isOpen }">
    <simplebar class="service-direction__scroll-container">
      <div class="service-direction__main">
        <transition-sequence
          :is-visible="animationStep > 2 + service.subdivisions.length"
          :is-blocked="!isOpen || isAnimating"
        >
          <button class="service-direction__close" @click.stop="onClose">
            <div class="service-direction__cross" />
          </button>
        </transition-sequence>
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
            <transition-sequence
              :is-visible="animationStep > 3 + service.subdivisions.length"
              :is-blocked="!isOpen || isAnimating"
            >
              <div class="service-direction__button">
                <button class="button button--quiet">Обсудить задачу</button>
              </div>
            </transition-sequence>
          </div>
        </div>
        <div class="row">
          <div class="col col-xs-2 col-lg-2 col-xl-5">
            <transition-sequence
              :is-visible="animationStep > 0"
              :is-blocked="!isOpen || isAnimating"
              @startNext="startNext"
            >
              <p class="service-direction__info">
                {{ glueUpPrepositions(service.info) }}
              </p>
            </transition-sequence>
          </div>
          <div class="col col-xs-2 col-lg-2 col-xl-6 col-xl-offset-1">
            <div class="service-direction__subdirections">
              <transition-sequence
                v-for="(subdivision, index) in service.subdivisions"
                :key="index"
                :is-visible="animationStep > 1 + index"
                :is-blocked="!isOpen || isAnimating"
                @startNext="startNext"
              >
                <p class="service-direction__subdirection">
                  {{ glueUpPrepositions(subdivision) }}
                </p>
              </transition-sequence>
            </div>
          </div>
        </div>
        <div class="row">
          <transition-sequence
            v-for="(work, index) in works"
            :key="work.slug"
            :is-visible="animationStep > 1 + index + service.subdivisions.length"
            :is-blocked="!isOpen || isAnimating"
            @startNext="startNext"
          >
            <work-item :work="work" :index="index" />
          </transition-sequence>
        </div>
      </div>
    </simplebar>
    <transition-sequence
      :is-visible="animationStep > 0"
      :is-blocked="isOpen || isAnimating"
      transition-name="fade-down"
      @startNext="startNext"
    >
      <div class="service-direction__label-transition">
        <div class="service-direction__label">
          {{ service.title }}
        </div>
      </div>
    </transition-sequence>
    <transition-sequence :is-visible="animationStep > 1" :is-blocked="isOpen || isAnimating">
      <div class="service-direction__plus-transition">
        <div class="service-direction__cross service-direction__plus" />
      </div>
    </transition-sequence>
  </div>
</template>

<script>
import WorkItem from '@/components/WorkItem.vue';
import { glueUpPrepositions } from '@/utils/index.js';
import { getCollectionByKey } from '@/api/index.js';

import simplebar from 'simplebar-vue';
import 'simplebar/dist/simplebar.min.css';
import TransitionSequence from './TransitionSequence.vue';

export default {
  name: 'ServicePopupDirection',
  components: {
    WorkItem,
    simplebar,
    TransitionSequence,
  },
  props: {
    service: {
      type: Object,
      required: true,
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
    isAnimating: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isWorksLoading: false,
      works: null,
      animationStep: 0,
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
    startNext(index) {
      if (index !== undefined) {
        this.animationStep = index;
      } else {
        this.animationStep++;
      }
    },
    onClose() {
      this.startNext(0);
      this.$emit('close');
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
  transition-duration: $--duration-500, $--duration-500;
  transition-timing-function: $--timing-out-circ, $--timing-out-circ;
  transition-property: color, background-color;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &__label-transition {
    position: absolute;
    position: absolute;
    width: 0;
    height: 0;
    top: $--page-padding-x;
    left: 3.25vw;
  }

  &__label {
    position: absolute;
    top: 0;
    transform: translate(0, -15%);
    transform-origin: left center;
    white-space: nowrap;
    color: $--color-gray-50;
    font-size: 2.3vmax;
    @include from('xl') {
      right: 0;
      transform: rotate(-90deg) translate(0, -15%);
      transform-origin: right center;
      font-size: 1.5625vw;
    }
  }

  $cross-size: 1.5vmax;

  &__plus-transition {
    position: absolute;
    bottom: $--page-padding-x + $cross-size;
    right: 3.25vmax;
    @include from('xl') {
      left: 3.25vmax;
    }
  }

  &__plus {
    position: absolute;
    &:before,
    &:after {
      background: $--color-gray-50;
    }
  }

  &__cross {
    width: 0;
    height: 0;
    &:before,
    &:after {
      content: '';
      position: absolute;
      height: 2px;
      left: -$cross-size;
      right: -$cross-size;
    }
    &:after {
      transition-duration: 382ms;
      transition-timing-function: $--timing-in-out-cubic;
      transition-property: transform;
      transform: rotate(-90deg);
    }
  }

  &__close {
    position: absolute;
    right: 0;
    top: 0;
    margin: 0;
    padding: 2vmax;
    background: none;
    border: none;
    cursor: pointer;
    #{$service-direction}__cross {
      transform: rotate(-45deg);
      &:before,
      &:after {
        background: $--color-gray-900;
      }
    }
    &:hover {
      #{$service-direction}__cross {
        &:before,
        &:after {
          background: $--color-gray-700;
        }
      }
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
    background-color: $--color-gray-700;
    color: $--color-gray-50;

    #{$service-direction}__main {
      // opacity: 0;
    }

    // #{$service-direction}__label-rotor {
    //   opacity: 1;
    //   transform: translate(0, 0) rotate(-90deg);
    // }

    // #{$service-direction}__plus {
    //   opacity: 1;
    //   transform: translate(-50%, 0);
    // }
  }

  &__title {
    font-size: 12vw;
    line-height: 0.9;
    font-weight: normal;
    letter-spacing: $--letter-spacing;
    margin: 0;
    margin: 0 0 18px;
    @include from('lg') {
      margin-bottom: 32px;
    }
    @include from('xl') {
      font-size: 4vw;
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
