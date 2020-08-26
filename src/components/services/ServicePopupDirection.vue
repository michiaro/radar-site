<template>
  <div class="service-direction" :class="{ 'service-direction--contrast': isClosed }">
    <simplebar class="service-direction__scroll-container">
      <div class="service-direction__main">
        <appear :is-visible="animationCounter >= 3 + subdivisionCount" is-silent>
          <button
            class="close-button close-button--cross appear appear--up"
            :class="{ 'appear--duration-0': !isOpen, 'appear--delay-500': isOpen }"
            @click.stop="onClose"
          >
            <div class="close-button__cross" />
          </button>
        </appear>
        <div class="row">
          <div class="col col-xs-2 col-lg-2 col-xl-6">
            <transition name="fade">
              <div v-if="!isClosed" class="service-direction__summary">
                <h2 class="service-direction__title">
                  {{ service.title }}
                </h2>
              </div>
            </transition>
            <appear :is-visible="animationCounter >= 1" :counter-key="serviceId">
              <div class="service-direction__description appear appear--up" :class="{ 'appear--duration-0': !isOpen }">
                {{ glueUpPrepositions(service.description) }}
              </div>
            </appear>
          </div>
          <div class="col col-xs-0 col-sm-0 col-md-0 col-lg-0 col-xl-4 col-2xl-3">
            <appear :is-visible="animationCounter >= 3 + subdivisionCount" is-silent>
              <div
                class="service-direction__button appear appear--up"
                :class="{ 'appear--duration-0': !isOpen, 'appear--delay-1000': isOpen }"
              >
                <button class="button button--quiet" @click="openPopupForm">
                  Обсудить задачу
                </button>
              </div>
            </appear>
          </div>
        </div>
        <div class="row">
          <div class="col col-xs-2 col-lg-2 col-xl-5">
            <appear :is-visible="animationCounter >= 2" :counter-key="serviceId">
              <p class="service-direction__info appear appear--up" :class="{ 'appear--duration-0': !isOpen }">
                {{ glueUpPrepositions(service.info) }}
              </p>
            </appear>
          </div>
          <div class="col col-xs-2 col-lg-2 col-xl-6 col-xl-offset-1">
            <div class="service-direction__subdirections">
              <appear
                v-for="(subdivision, index) in service.subdivisions"
                :key="index"
                :is-visible="animationCounter >= 3 + index"
                :counter-key="serviceId"
              >
                <p class="service-direction__subdirection appear appear--up" :class="{ 'appear--duration-0': !isOpen }">
                  {{ glueUpPrepositions(subdivision.value.subdivision) }}
                </p>
              </appear>
            </div>
          </div>
          <div class="col col-xs-2 col-sm-2 col-lg-2 col-xl-0 col-2xl-0 col-3xl-0">
            <appear :is-visible="animationCounter >= 3 + subdivisionCount" is-silent>
              <div
                class="service-direction__button appear appear--up"
                :class="{ 'appear--duration-0': !isOpen, 'appear--delay-1000': isOpen }"
              >
                <button class="button button--quiet" @click="openPopupForm">
                  Обсудить задачу
                </button>
              </div>
            </appear>
          </div>
        </div>
        <div v-if="works" class="row">
          <work-list :works="works" :counter-key="serviceId" :counter-modifier="subdivisionCount" />
        </div>
      </div>
    </simplebar>
    <transition name="fade">
      <div v-if="isClosed" class="service-direction__label-transition">
        <div class="service-direction__label">
          {{ service.title }}
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="isClosed" class="close-button close-button--plus-transition">
        <div class="close-button__cross close-button__plus" />
      </div>
    </transition>
  </div>
</template>

<script>
import WorkList from '@/components/WorkList.vue';
import { glueUpPrepositions } from '@/utils/index.js';
import { getCollectionByKey } from '@/api/index.js';
import SERVICE_STATE from '@/components/services/servicePopupDirectionState.js';

import simplebar from 'simplebar-vue';
import 'simplebar/dist/simplebar.min.css';
import Appear from '@/components/Appear.vue';

export default {
  name: 'ServicePopupDirection',
  components: {
    WorkList,
    simplebar,
    Appear,
  },
  props: {
    service: {
      type: Object,
      required: true,
    },
    state: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isWorksLoading: false,
      works: null,
    };
  },
  computed: {
    isOpen() {
      return this.state === SERVICE_STATE.OPEN;
    },
    isClosed() {
      return this.state === SERVICE_STATE.CLOSED;
    },
    serviceId() {
      return this.service.serviceId;
    },
    animationCounter() {
      return this.$store.state.page.animationCounter[this.serviceId];
    },
    tags() {
      return this.$store.state.staticData.collections.tags || [];
    },
    currentTagTitle() {
      const { tags, serviceId } = this;
      const currentTag = tags ? tags.find((tag) => tag.slug === serviceId) : null;
      return currentTag ? currentTag.title : null;
    },
    subdivisionCount() {
      return this.service.subdivisions.length;
    },
  },
  async created() {
    const { tags } = this;

    if (!tags.length) {
      await this.fetchTags();
    }
    this.fetchWorks();
  },
  methods: {
    glueUpPrepositions,
    async fetchWorks() {
      this.isWorksLoading = true;
      const { currentTagTitle } = this;

      let filter = { isOnServices: true };
      if (currentTagTitle) {
        filter = { ...filter, tags: { $has: currentTagTitle } };
      }

      const { data } = await getCollectionByKey({
        key: 'works',
        options: {
          limit: 8,
          sort: { _o: 1 },
        },
        filter,
      });

      this.works = data;
      this.isWorksLoading = false;
    },
    async fetchTags() {
      const { data } = await getCollectionByKey({
        key: 'tags',
      });
      const tagsArray = data;

      this.$store.commit('setStaticCollectionData', {
        title: 'tags',
        collection: tagsArray,
      });
    },
    onClose() {
      this.$emit('close');
      this.$store.commit('resetAnimations', { counterKey: this.serviceId });
      this.$store.commit('setPopupFormOpen', { isFormPopupOpen: false });
    },
    openPopupForm() {
      this.$store.commit('setPopupFormOpen', { isFormPopupOpen: true });
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
  background: $--color-gray-200;
  transition-duration: $--duration-500, $--duration-500;
  transition-timing-function: $--timing-in-out-spring, $--timing-in-out-spring;
  transition-property: color, background-color;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &__main {
    padding: 1.5vmax $--gutter;
  }

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

  &__scroll-container {
    height: 100%;
    overflow-x: hidden;

    .simplebar-track {
      display: none;
    }
  }

  &__title {
    font-size: 5vmax;
    line-height: 0.9;
    font-weight: normal;
    letter-spacing: $--letter-spacing;
    margin: 0;
    @include from('xl') {
      font-size: 4vmax;
    }
  }
  &__description {
    font-size: $--font-size-100;
    line-height: 1.1;
    letter-spacing: $--letter-spacing;
    margin-bottom: 22px;
    margin-top: 1.5vmax;

    @include from('lg') {
      margin-bottom: 100px;
      font-size: 36px;
    }
  }
  &__button {
    margin-bottom: 22px;
    @include from('xl') {
      margin-bottom: 0;
      margin-top: 8px;
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

  &--contrast {
    background-color: $--color-gray-900;
    color: $--color-gray-50;
    cursor: pointer;

    &:hover {
      background-color: $--color-brand;
    }

    #{$service-direction}__description {
      transition-duration: $--duration-0;
      opacity: 0;
    }

    #{$service-direction}__main {
      opacity: 0;
    }

    #{$service-direction}__scroll-container {
      pointer-events: none;
    }
  }
}

.close-button {
  $close-button: &;
  $cross-size: 1.5vmax;

  &--cross {
    position: absolute;
    right: 1.5vmax;
    top: 1.5vmax;
    margin: 0;
    padding: 2vmax;
    background: none;
    border: none;
    cursor: pointer;
    #{$close-button}__cross {
      transform: rotate(-45deg);
      &:before,
      &:after {
        background: $--color-gray-900;
      }
    }
    #{$close-button}:hover {
      &__cross {
        &:before,
        &:after {
          background: $--color-gray-700;
        }
      }
    }
  }

  &--plus-transition {
    position: absolute;
    bottom: 3.25vmax;
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
}
</style>
