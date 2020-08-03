<template>
  <div class="error-page">
    <div class="error-page__inner">
      <appear :is-visible="animationCounter >= 0" :on-next="showNext">
        <div class="appear appear--up">
          <img :src="image" alt="404" class="error-page__image" />
        </div>
      </appear>
      <appear :is-visible="animationCounter >= 1" :on-next="showNext">
        <div class="appear appear--up">
          <h1 class="error-page__title">
            Похоже, такой страницы не существует.
          </h1>
        </div>
      </appear>
      <appear :is-visible="animationCounter >= 2" :on-next="showNext">
        <div class="appear appear--up">
          <router-link class="error-page__link" :to="{ name: 'Home' }">
            Вернуться на главную?
          </router-link>
        </div>
      </appear>
    </div>
  </div>
</template>

<script>
import Appear from '@/components/Appear.vue';
import image from '@/images/404.png';

export default {
  name: 'ErrorPage',
  components: {
    Appear,
  },
  data() {
    return {
      image,
      animationCounter: -1,
    };
  },
  mounted() {
    this.showNext();
  },
  methods: {
    showNext() {
      this.animationCounter++;
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/shared/_globals.scss';

.error-page {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  height: calc(100vh - #{$--header-height});
  margin: 0 $--gutter;

  &__image {
    max-width: 100%;
  }
  &__inner {
    margin-bottom: $--header-height;
  }
  &__title {
    font-weight: normal;
    margin: 2em 0 0.2em;
    font-size: $--font-size-100;
    @include from('lg') {
      font-size: $--font-size-140;
    }
  }
  &__link {
    font-weight: 500;
    color: $--color-brand;
    display: inline-block;
    position: relative;
    font-size: $--font-size-100;
    @include from('lg') {
      font-size: $--font-size-140;
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
}
</style>
