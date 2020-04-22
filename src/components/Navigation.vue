<template>
  <nav class="header__navigation navigation">
    <router-link @click.native="onClick" class="navigation__link" to="all-works"
      >Работы</router-link
    >
    <router-link @click.native="onClick" class="navigation__link" to="services"
      >Услуги</router-link
    >
    <router-link @click.native="onClick" class="navigation__link" to="agency"
      >Агентство</router-link
    >
    <router-link @click.native="onClick" class="navigation__link" to="contacts"
      >Контакты</router-link
    >
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
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

    @include from('md') {
      font-size: 120px;
      line-height: 1;
    }
    @include from('lg') {
      font-size: 22px;
    }

    &:hover {
      color: $color-text--muted;
      @include from('lg') {
        color: $color-text--contrast;
      }
    }

    & + & {
      margin-top: 8px;
      @include from('lg') {
        margin-top: 0;
        margin-left: 176px;
      }
    }
  }
}
</style>
