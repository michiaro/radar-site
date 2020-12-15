<template>
  <nav
    class="header__navigation navigation"
    :class="{ 'navigation--contrast': isMainPage }"
  >
    <appear :is-visible="animationCounter >= 0" :on-next="showNext">
      <div class="navigation__link-wrapper appear appear--duration-500">
        <router-link
          class="navigation__link"
          :to="{ name: 'AllWorks' }"
          @click.native="onClick"
        >
          работы
        </router-link>
      </div>
    </appear>
    <appear :is-visible="animationCounter >= 1" :on-next="showNext">
      <div class="navigation__link-wrapper appear appear--duration-500">
        <router-link
          class="navigation__link"
          :to="{ name: 'Services' }"
          @click.native="onClick"
        >
          услуги
        </router-link>
      </div>
    </appear>
    <appear :is-visible="animationCounter >= 2" :on-next="showNext">
      <div class="navigation__link-wrapper appear appear--duration-500">
        <router-link
          class="navigation__link"
          :to="{ name: 'Agency' }"
          @click.native="onClick"
        >
          агентство
        </router-link>
      </div>
    </appear>
    <appear :is-visible="animationCounter >= 3" :on-next="showNext">
      <div class="navigation__link-wrapper appear appear--duration-500">
        <router-link
          class="navigation__link"
          :to="{ name: 'Contacts' }"
          @click.native="onClick"
        >
          контакты
        </router-link>
      </div>
    </appear>
  </nav>
</template>

<script>
import Appear from '@/components/Appear.vue';

export default {
  name: 'Navigation',
  components: { Appear },
  data() {
    return {
      animationCounter: -1,
    };
  },
  computed: {
    isMainPage() {
      return this.$route.path === '/';
    },
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        // меню появляется после лого
        this.showNext();
      }, 500);
    });
  },
  methods: {
    onClick() {
      this.$emit('close-menu');
    },
    showNext() {
      this.animationCounter++;
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/shared/_globals.scss';

.navigation {
  $navigation: &;

  display: flex;
  flex-flow: column nowrap;

  @include from('xl') {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 $--gutter * -0.5;
    padding-right: $--gutter * 0.5;
    width: 50%;
    box-sizing: border-box;
  }

  &__link {
    color: $--color-text;
    letter-spacing: $--letter-spacing;
    font-size: 40px;
    line-height: 1.3;
    padding: 5px 0;
    font-variant: small-caps;
    transition-property: color;
    transition-duration: $--duration-100;
    transition-timing-function: $--timing-in-out-cubic;

    @include from('lg') {
      font-size: 120px;
      line-height: 1;
    }
    @include from('xl') {
      font-size: 23px;
    }

    &:hover {
      color: $--color-brand;
    }

    @include from('xl') {
      position: relative;

      &:after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: calc(100% - 2px);
        height: 2px;
        background: $--color-brand;
        transition-timing-function: $--timing-in-out-cubic;
        transition-duration: $--duration-1000;
        transition-property: transform;
        transform-origin: left center;
        transform: scaleX(0);
      }
    }

    &.router-link-active {
      color: $--color-brand;

      @include from('xl') {
        color: $--color-text;
        position: relative;

        &:after {
          transform: scaleX(1);
        }

        &:hover {
          color: $--color-text;
        }
      }
    }

    & + & {
      margin-top: 8px;
      @include from('xl') {
        margin-top: 0;
      }
    }
  }
  &--contrast {
    #{$navigation}__link {
      &:hover {
        @include from('xl') {
          color: $--color-text--contrast;
        }
      }
    }
  }
}
</style>
