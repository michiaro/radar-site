<template>
  <footer class="footer">
    <div class="container" v-if="isClients">
      <div class="row">
        <div class="col col-xs-2 col-sm-2 col-md-3 col-lg-6 col-2xl-5">
          <h2 class="footer__title">
            <span class="footer__title--accent">
              Клиенты.
            </span>
            Нашему подходу и&nbsp;результатам доверяют
          </h2>
        </div>
      </div>
    </div>

    <div class="footer__loop" v-if="isClients">
      <loop />
    </div>

    <contacts-info contrast />
  </footer>
</template>

<script>
import ContactsInfo from '@/components/ContactsInfo.vue';
import Loop from '@/components/Loop.vue';

export default {
  name: 'PageFooter',
  components: {
    ContactsInfo,
    Loop,
  },
  props: {
    isClients: {
      type: Boolean,
      required: false,
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/shared/_globals.scss';

.footer {
  margin-top: 76px;
  @include from('md') {
    margin-top: 108px;
  }

  &__title {
    margin: 0;

    font-weight: normal;
    font-size: 23px;
    letter-spacing: $--letter-spacing;

    margin-bottom: 62px;
    @include from('md') {
      margin-bottom: 104px;
      font-size: 44px;
    }
  }
  &__title--accent {
    color: $--color-brand;
  }
  &__loop {
    margin-bottom: 76px;
    @include from('md') {
      margin-bottom: 112px;
    }
  }
}
</style>
