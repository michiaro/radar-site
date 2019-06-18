<template lang="pug">

  router-link.one-work(v-lazyload :to="'/' +work.slug")
    img.one-work__img(
      :data-url="'https://radar-online.ru'+work.cover.path"
      :alt="work.title"
    )
    .one-work__description
      .desc-text
        .desc-text__title {{ work.title }}
        p.desc-text__text {{ work.prescription }}
</template>

<script>
export default {
  name: "WorkItem",
  props: {
    work: {
      type: Object
    }
  },

};
</script>

<style lang="scss">
.one-work {
  width: 46%;
  height: auto;
  margin-bottom: 7px;
  position: relative;
  overflow: hidden;
  margin-right: 10px;
  display: block;
  cursor: pointer;

  @media screen and (min-width: 670px) {
    width: 47%;
  }

  &__img {
    max-width: 100%;
    height: auto;
    display: block;

    @media screen and (min-width: 922px) {
      width: 290px;
      height: 350px;
      // background: grey;
    }
  }

  &__description {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    opacity: 0;
    transition: all 0.3s linear;
  }

  &:hover &__description {
    opacity: 1;
  }
}

.desc-text {
  text-align: center;
  width: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &__title {
    font-size: 16px;
    color: #fff;
    margin-bottom: 15px;
    font-family: "ProximaNova-Light";
    font-weight: normal;
  }

  &__text {
    color: #fff;
    font-size: 12px;
  }
}

@media screen and (min-width: 680px) {
  .one-work {
    width: 31%;
    margin-bottom: 12px;
    margin-right: 15px;
  }
  .desc-text__title {
    font-size: 24px;
  }
  .desc-text__text {
    font-size: 15px;
  }
}

@media screen and (min-width: 922px) {
  .one-work {
    width: 22.5%;
    margin: 0px 15px 16px 3px;
  }
}

@media screen and (min-width: 1200px) {
  .one-work {
    width: 290px;
    box-sizing: border-box;
    margin: 0px 8px 16px;
  }
}
</style>
