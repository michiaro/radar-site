<template lang="pug">
  .service-wrapper
    .service(v-html="currentService.description", v-if="servicesInReady")
</template>

<script>
import api from "../api/";

export default {
  name: "Service",
  props: {
    filterId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      content: {
        services: []
      },
      servicesInReady: false
    };
  },
  computed: {
    currentService() {
      return this.content.services.find(
        service => service.nameEnglish === this.filterId
      );
    }
  },
  mounted() {
    this.$nextTick(() => {
      api.getCollectionByKey("Services").then(Services => {
        this.content.services = Services;
        this.servicesInReady = true;
      });
    });
  }
};
</script>

<style lang="scss">
.service {
  color: #292e35;
  max-width: 100%;
  font-size: 16px;
  line-height: 24px;
  margin: 0 8px 30px;

  @media screen and (min-width: 680px) {
    font-size: 20px;
    margin: 50px 15px 70px;
  }
  @media screen and (min-width: 1200px) {
    max-width: 60%;
    width: 60%;
    margin: 50px 0 120px;
  }

  strong {
    font-size: 24px;
    line-height: 32px;
    display: block;
    margin-bottom: 20px;
    font-weight: normal;

    @media screen and (min-width: 680px) {
      margin-bottom: 40px;
      font-size: 32px;
      line-height: 38px;
    }
  }
  h3 {
    color: #e30613;
    margin-bottom: 5px;
    font-size: 16px;
    margin-top: 15px;

    @media screen and (min-width: 680px) {
      font-size: 20px;
    }
  }
  div {
  }
}
</style>
