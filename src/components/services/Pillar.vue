<template>
  <div
    v-observe-visibility="{
      callback: visibilityChanged,
      intersection: {
        threshold: 0.5,
      },
    }"
    class="pillar"
  >
    <div class="pillar__video-wrapper">
      <video
        ref="video"
        :src="videoURL + pillar.video.path"
        class="pillar__video"
        muted="muted"
        playsinline
        preload="auto"
      />
    </div>
    <div v-if="!isMobile" class="pillar__number">
      <appear :is-visible="animationCounter >= 0" :on-next="showNext">
        <div class="appear appear--right">
          {{ number }}
        </div>
      </appear>
    </div>
    <div class="pillar__content">
      <div class="pillar__header">
        <div v-if="isMobile" class="pillar__mobile-number">
          <appear :is-visible="animationCounter >= 0" :on-next="showNext">
            <div class="appear appear--right">
              {{ number }}
            </div>
          </appear>
        </div>
        <div class="pillar__header-inner">
          <h2 class="pillar__title">
            <appear :is-visible="animationCounter >= 1" :on-next="showNext">
              <div class="appear appear--up">
                {{ pillar.title }}
              </div>
            </appear>
          </h2>
          <appear :is-visible="animationCounter >= 2" :on-next="showNext">
            <div
              class="pillar__description appear appear--up"
              v-html="glueUpPrepositions(pillar.description)"
            />
          </appear>
        </div>
      </div>
      <div class="pillar__text">
        <appear :is-visible="animationCounter >= 3" :on-next="showNext">
          <div
            class="appear appear--up"
            v-html="glueUpPrepositions(pillar.content)"
          />
        </appear>
      </div>
      <appear :is-visible="animationCounter >= 4" :on-next="showNext">
        <router-link
          :to="{
            name: 'AllWorks',
            query: {
              filter: pillar.id,
            },
          }"
          class="pillar__link appear appear--up"
        >
          смотреть кейсы
        </router-link>
      </appear>
    </div>
  </div>
</template>

<script>
import { glueUpPrepositions } from '@/utils/index.js';
import { baseURL } from '@/api/index.js';
import Appear from '@/components/Appear.vue';

export default {
  name: 'Pillar',
  components: {
    Appear,
  },
  props: {
    pillar: {
      type: Object,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      animationCounter: -1,
    };
  },
  computed: {
    videoURL() {
      return baseURL + '/cockpit/storage/uploads';
    },
    isMobile() {
      return this.$store.state.page.isMobile;
    },
  },
  watch: {
    animationCounter(next) {
      if (next === 1) {
        this.$refs.video.play();
      }
    },
  },
  methods: {
    glueUpPrepositions,
    showNext() {
      this.animationCounter++;
    },
    visibilityChanged(isVisible) {
      if (isVisible) {
        this.showNext();
      }
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/shared/_globals.scss';

.pillar {
  display: flex;
  flex-flow: row wrap;
  overflow: hidden;
  position: relative;
  padding-top: 8.8vmax;
  box-sizing: border-box;

  @include from('lg') {
    height: 100vh;
    flex-wrap: nowrap;
  }

  &__number {
    @include from('xl') {
      font-weight: 300;
      font-size: 40.1vmax;
      color: $--color-text;
      line-height: 0.82;

      flex-basis: 16.6%;
      transform: translateX(-3.4vmax);
    }
  }
  &__content {
    flex-basis: 100%;
    @include from('lg') {
      flex-basis: 40%;
    }
  }

  &__header {
    display: flex;
    flex-flow: row nowrap;
    @include from('lg') {
      display: block;
    }
  }
  &__mobile-number {
    font-weight: 300;
    font-size: 15vmax;
    color: $--color-text;
    line-height: 0.82;
    transform: translateX(-1.3vmax);
  }
  &__header-inner {
  }
  &__title {
    font-weight: 300;
    color: $--color-text;
    font-variant: small-caps;

    margin: 0;
    margin-bottom: 2vmax;

    font-size: 6vmax;
    @include from('sm') {
      font-size: 9vmax;
    }
    @include from('lg') {
      font-size: 7.8vmax;
    }
  }
  &__description {
    color: $--color-text;
    margin-bottom: 2.4vmax;
    font-variant: small-caps;

    font-size: 2vmax;
    @include from('sm') {
      font-size: 3vmax;
    }
    @include from('lg') {
      font-size: 1.5vmax;
    }
    @include from('xl') {
      width: 60%;
    }
  }
  &__text {
    font-size: 24px;
    line-height: 1.17;
    letter-spacing: $--letter-spacing;
    color: $--color-text;
    padding-right: $--page-padding-x;
    padding-left: $--page-padding-x;

    @include from('lg') {
      padding: 0;
    }
    @include from('xl') {
      width: 60%;
    }

    p {
      margin: 0;
      margin-bottom: 1.4vmax;
    }

    ul {
      padding: 0;
      margin: 0;
      list-style: none;
      margin-bottom: 1.4vmax;
    }

    li {
      position: relative;
      padding-left: 14px;
      line-height: 1.17;

      &::before {
        position: absolute;
        content: '•';
        top: 0;
        left: 0;
        border-radius: 50%;
        color: $--color-text;
      }
    }
  }
  &__link {
    font-weight: 300;
    font-size: $--font-size-90;
    color: $--color-brand;
    display: inline-block;
    position: relative;
    margin-left: $--page-padding-x;
    @include from('lg') {
      margin-left: 0;
    }

    &:after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 100%;
      height: 1px;
      background: $--color-brand;
      transition-timing-function: $--timing-in-out-cubic;
      transition-duration: $--duration-1000;
      transition-property: transform;
      transform-origin: left center;
      transform: scaleX(0);
    }

    @at-root ._ready &:after {
      transform: scaleX(1);
      transition-delay: $--delay-1000;
    }

    &:hover:after {
      transform: scaleX(0);
    }
  }
  &__video-wrapper {
    z-index: -1;
    order: 2;
    transform: translateY(-6vmax);
    height: 52vh;
    @include from('sm') {
      height: 70vh;
    }
    @include from('lg') {
      order: 0;
      height: 100%;
      overflow: hidden;
      width: 60%;
      position: absolute;
      top: 0;
      right: 0;
      transform: translateX(3.4vmax);
    }
  }
  &__video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}
</style>
