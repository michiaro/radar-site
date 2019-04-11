<template lang="pug">
  .wrapper(v-if="isReady")
    .block.about-block(
      :style="{'backgroundImage': 'url(http://new.radar-online.mcdir.ru/' +this.content.aboutUs.background.path+')'}"
      )
      .content.about-content.page-wrapper
        h1.about-content__title {{ this.content.aboutUs.title }}
        .about-content__block
          p.about-content__text-block(
            v-html="this.content.aboutUs.column1"
          )
          p.about-content__text-block(
            v-html="this.content.aboutUs.column2"
          )
</template>

<script>
import api from "../../api/";

export default {
  name: "About",
  props: {
    // msg: String
  },
  data() {
    return {
      content: {
        aboutUs: ""
      },
      isReady: false,
    };
  },
  methods: {},
  mounted() {
    this.$nextTick(() => {
      api.getSingletonsByKey("aboutUs").then(aboutUs => {
        this.content.aboutUs = aboutUs;
        this.isReady = true;
      });
    });
  }
};
</script>

<style lang="scss">
.about-block {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.about-content {
  padding-top: 130px;
  box-sizing: border-box;
}

.about-content__title {
  font-size: 36px;
  margin: 10px 8px 20px;
  color: #fff;
  font-family: "ProximaNova-Light";
  font-weight: normal;
  @media screen and (min-width: 680px) {
    margin-left: 15px;
  }
  @media screen and (min-width: 1200px) {
    margin-left: 0;
  }
}

.about-content__block {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-flow: row wrap;
  flex-flow: row wrap;
  margin: 8px;
  @media screen and (min-width: 680px) {
    margin-left: 15px;
  }
  @media screen and (min-width: 1200px) {
    margin-bottom: 60px;
    margin-left: 0;
  }
}

.about-content__text-block {
  color: #fff;
  font-size: 16px;
  display: inline-block;
  width: 435px;
  vertical-align: text-top;
  margin-bottom: 15px;
}

@media screen and (min-width: 680px) {
  .about-content {
    height: 100vh;
  }
  .about-block {
    height: 100%;
  }
  .about-content__text-block {
    margin-right: 30px;
  }
}
</style>
