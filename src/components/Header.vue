<template>
  <div class="header">
    <div class="mobile-menu" v-if="isMenuOpen && isMobile">
      <div class="mobile-menu__navigation">
        <Navigation @close-menu="closeMenu" />
      </div>
      <div class="mobile-menu__bottom">
        <div class="mobile-menu__bottom-title">Обсудить задачу</div>
        <div class="mobile-menu__bottom-content">
          <div class="mobile-menu__contacts">
            <a class="mobile-menu__link" href="tel:+79227000100"
              >+7 (922) 700-01-00</a
            >
            <a class="mobile-menu__link" href="mailto:mlopatina@radar-online.ru"
              >mlopatina@radar-online.ru</a
            >
          </div>
          <div class="mobile-menu__contact-person">
            <div class="mobile-menu__name">Мария Лопатина</div>
            <div class="mobile-menu__position">Account Director</div>
          </div>
        </div>
      </div>
    </div>
    <Logo @click.native="closeMenu" />
    <button
      class="header__burger hamburger hamburger--slider"
      :class="{ 'is-active': isMenuOpen }"
      type="button"
      v-if="isMobile"
      @click="toggleMenu"
    >
      <span class="hamburger-box">
        <span class="hamburger-inner"></span>
      </span>
    </button>
    <Navigation v-if="!isMobile" />
  </div>
</template>

<script>
import Logo from '@/components/Logo.vue';
import Navigation from '@/components/Navigation.vue';
import { DESKTOP_SIZE } from '@/settings.js';

export default {
  name: 'Header',
  components: {
    Logo,
    Navigation,
  },
  data() {
    return {
      isMobile: false,
      isMenuOpen: false,
    };
  },
  methods: {
    handleResize() {
      this.isMobile = window.innerWidth < DESKTOP_SIZE;
      this.isMenuOpen = window.innerWidth >= DESKTOP_SIZE;
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    });
  },
};
</script>

<style lang="scss">
@import '@/styles/shared/_globals.scss';

.header {
  z-index: 1;
  margin: 18px 22px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  @include from('lg') {
    margin: 22px 32px;
  }

  &__burger {
    padding: 0;
  }
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: $color-background;

  padding: 124px 20px 20px;
  height: 100%;
  box-sizing: border-box;

  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;

  &__navigation {
  }
  &__bottom {
    font-size: 18px;
    letter-spacing: $--letter-spacing;
    @include from('md') {
      display: flex;
      flex-flow: row nowrap;
    }
  }
  &__bottom-title {
    color: $color-primary;
    margin-bottom: 20px;
    margin-right: 66px;
  }
  &__bottom-content {
  }

  &__link {
    color: $color-text;
    display: block;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: $color-text--muted;
    }

    &:last-of-type {
      margin-bottom: 20px;
    }
  }
  &__contact-person {
    color: $color-text--muted;
  }
  &__name {
  }
  &__position {
  }
}
</style>
