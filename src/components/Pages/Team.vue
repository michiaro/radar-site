<template lang="pug">
  .wrapper
    .block
      .content.page-wrapper
        .devider
          h1.common-title Команда
          .team-text(
            v-html="content.common.teamText"
          )
        .all-team
          .all-team__img-wrapper(
            v-for="teammate in content.team",
            :key="teammate.id",
            v-if="teammate.inTeam"
            )
              img.all-team__img(
                :src="'https://radar-online.ru/'+teammate.photo.path", 
                :alt="teammate.name"
              )
              .all-team__desc
                .team-desc-name {{ teammate.name }}
                span.team-desc-text {{ teammate.position }}

</template>

<script>
import api from "../../api/";

export default {
  name: "Team",
  props: {
    // msg: String
  },
  data() {
    return {
      content: {
        common: "",
        team: []
      }
    };
  },
  methods: {},
  mounted() {
    this.$nextTick(() => {
      api.getCollectionByKey("team").then(team => {
        this.content.team = team;
      });

      api.getSingletonsByKey("common").then(common => {
        this.content.common = common;
      });
    });
  }
};
</script>

<style lang="scss">
@import '~@/styles/shared/globals';

.team-text {
  color: #292e35;
  font-size: 16px;
  width: 100%;
  padding-left: 8px;
  box-sizing: border-box;

  @include from-breakpoint('md') {
    padding-left: 0;
    width: 60%;
  }
  @include from-breakpoint('xl') {
    width: 440px;
    padding-right: 15px;
  }

  a {
    color: #292e35;
  }
}

.all-team {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  padding-right: 8px;

  @include from-breakpoint('md') {
    padding-right: 0;
  }

  @include from-breakpoint('xl') {
    margin: 80px -8px 0;
  }

  &__img {
    width: 100%;
    height: 100%;

    &-wrapper {
      width: 47%;
      height: auto;
      margin: 0 0 10px 8px;
      position: relative;
      vertical-align: top;

      &.nm {
        margin-left: 0;
      }

      &:hover .all-team__desc {
        opacity: 1;
      }

      @media screen and (min-width: 540px) {
        width: 31.5%;
      }

      @include from-breakpoint('md') {
        width: 23.5%;
      }

      @media screen and (min-width: 870px) {
        width: 24%;
      }

      @include from-breakpoint('lg') {
        width: 19%;
      }
      @include from-breakpoint('xl') {
        width: 188px;
        height: 180px;
        margin: 0 8px 16px;
      }
    }
  }

  &__desc {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 200;
    padding: 20px;
    opacity: 0;
    transition: all 0.3s linear;
    box-sizing: border-box;
  }
}

.team-desc-name {
  color: #fff;
  font-size: 18px;
  margin-bottom: 10px;
}

.team-desc-text {
  color: #fff;
  font-size: 14px;
  text-align: left;
}
</style>
