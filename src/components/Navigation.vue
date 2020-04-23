<template>
  <nav
    class="header__navigation navigation"
    :class="{ 'navigation--contrast': isMainPage }"
  >
    <router-link
      class="navigation__link"
      to="all-works"
      @click.native="onClick"
    >
      работы
    </router-link>
    <router-link class="navigation__link" to="services" @click.native="onClick">
      услуги
    </router-link>
    <router-link class="navigation__link" to="agency" @click.native="onClick">
      агентство
    </router-link>
    <router-link class="navigation__link" to="contacts" @click.native="onClick">
      контакты
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  computed: {
    isMainPage() {
      return this.$route.path === '/';
    },
  },
  methods: {
    onClick() {
      this.$emit('close-menu');
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

  @include from('lg') {
    flex-direction: row;
  }

  &__link {
    transition: all 0.2s ease-in-out;

    color: $color-text;
    letter-spacing: $--letter-spacing;
    font-size: 40px;
    line-height: 1.3;
    padding: 5px 0;
    font-variant: small-caps;

    @include from('md') {
      font-size: 120px;
      line-height: 1;
    }
    @include from('lg') {
      font-size: 22px;
    }

    &:hover {
      color: $color-primary;
    }

    & + & {
      margin-top: 8px;
      @include from('lg') {
        margin-top: 0;
        margin-left: 176px;
      }
    }
  }
  &--contrast {
    #{$navigation}__link {
      &:hover {
        @include from('lg') {
          color: $color-text--contrast;
        }
      }
    }
  }
}
</style>
