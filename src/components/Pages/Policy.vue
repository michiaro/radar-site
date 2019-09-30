<template lang="pug">
  .content.page-wrapper()
    .content-page(v-html="content.policyText")
</template>

<script>
import api from "../../api/";

export default {
  name: "Policy",
  data() {
    return {
      content: {
        policyText: ""
      },
      isReady: false
    };
  },
  methods: {},
  mounted() {
    this.$nextTick(() => {
      api.getSingletonsByKey("policy").then(policy => {
        this.content.policyText = policy.text;
        this.isReady = true;
      });
    });
  }
};
</script>

<style lang="scss">
.content-page {
  line-height: 1.3;
  font-family: "ProximaNova-Light";
  font-weight: normal;
  font-size: 16px;
  margin: 0 8px 40px;

  @media screen and (min-width: 680px) {
    margin: 0 15px 40px;
  }

  @media screen and (min-width: 1200px) {
    margin: 0 0 60px;
    font-size: 18px;
    max-width: 60%;
    width: 60%;
  }

  h1,
  h2 {
    font-weight: normal;
    line-height: 1.2;
  }

  h1 {
    font-size: 32px;
  }
  h2 {
    font-size: 24px;
  }
}
</style>
