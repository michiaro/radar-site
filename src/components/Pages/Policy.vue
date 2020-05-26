<template>
  <div class="policy">
    <div class="container">
      <div class="col col-xs-2 col-xl-8">
        <div class="policy__content" v-html="policy" />
      </div>
    </div>

    <page-footer />
  </div>
</template>

<script>
import { getSingletonByKey } from '@/api/index.js';
import PageFooter from '@/components/PageFooter.vue';

export default {
  name: 'Policy',
  components: {
    PageFooter,
  },
  data() {
    return {
      policy: '',
    };
  },
  created() {
    this.getPolicyContent();
  },
  methods: {
    async getPolicyContent() {
      const { text } = await getSingletonByKey('policy');
      this.policy = text;
    },
  },
};
</script>

<style lang="scss">
.policy {
  line-height: 1.3;
  font-weight: normal;
  font-size: 16px;

  @media screen and (min-width: 1200px) {
    font-size: 18px;
  }

  h1,
  h2 {
    font-weight: normal;
    line-height: 1.2;
  }

  h1 {
    font-size: 36px;

    @media screen and (min-width: 680px) {
      font-size: 36px;
    }
  }
  h2 {
    font-size: 24px;
  }

  ol {
    margin-bottom: 2em;
  }

  li {
    margin-bottom: 0.5em;
  }
}
</style>
