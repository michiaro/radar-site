<template lang="pug">
  .wrapper(v-if="worksIsReady && tagsIsReady")
    .block
      swiper(
        :options="swiperOption",
        ref="fullScreenSwiper",
      )
        swiper-slide.item.slide.swiper-lazy(
          v-for="work in content.works",
          v-if="work.isFeatured",
          :key="work.id",
          :style="{'backgroundImage': 'url(https://radar-online.ru' +work.header.path+')'}"
        )
          router-link.slider__link(:to="'/' + work.slug")
            .slider-content
              .slider-content__title(
                :class=" { 'dark' : work.isInverse }"
              ) {{ work.title }}
              .slider-content__text(
                :class=" { 'dark' : work.isInverse }"
              ) {{ work.prescription }}
          .swiper-lazy-preloader
        .swiper-pagination.swiper-pagination-clickable.swiper-pagination-bullets(
          slot="pagination",
        )
        .swiper-button-next.swiper-button-white(slot="button-prev")
        .swiper-button-prev.swiper-button-white(slot="button-next")
    .block
      .content.content-2
        .devider.devider--services
          h1.common-title.services-title Услуги
          nav.works-menu.services-menu
            ul.works-menu__list.services-menu__list
              li.works-menu__item.services-menu__item(
                v-for="tag in this.content.tags",
                v-if="tag.inServices",
                @click="setFilterId(tag.slug)",
              )
                //- img.services-menu__icon(:src="'https://radar-online.ru'+tag.serviceIcon.path")
                span.works-menu__link.services-menu__link(
                  :key="tag.slug",
                  :class=" { 'services-menu__link--active' : tag.slug == filterId} ",
                ) 
                  |{{ tag.title }}
          div.services-about {{ this.content.aboutUs.title }}
        Service(:filterId = "filterId", id="content")
        a.button.services__button(href="#contact-form") Оставить заявку
        .works-block
          .works-pack
            WorkItem(
              v-for="(work, index) in filteredWorks",
              v-if="work.isPublished"
              :key="work.slug",
              :work="work"
            )
    .block
      .content
        Contactform.home-form#contact-form
</template>

<script>
import api from "../../api/";
import Contactform from "../Contactform.vue";
import WorkItem from "../WorkItem.vue";
import Service from "../Service.vue";

export default {
  name: "Services",
  components: {
    Contactform,
    WorkItem,
    Service
  },
  data() {
    return {
      content: {
        works: [],
        tags: [],
        clients: [],
        team: [],
        aboutUs: ""
      },
      filterId: this.$route.query.filter,
      worksIsReady: false,
      tagsIsReady: false,
      swiperOption: {
        loop: true,
        slidesPerView: 1,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        preloadImages: false,
        lazy: true
      }
    };
  },
  computed: {
    filteredWorks() {
      if (!this.$route.query.filter) {
        return this.content.works.filter(work =>
          work.tags.some(tag => tag._id == "branding")
        );
      }
      var currentTag = this.content.tags.find(
        tag => tag.slug === this.$route.query.filter
      );
      return this.content.works.filter(work =>
        work.tags.some(tag => tag._id == currentTag._id)
      );
    }
  },
  methods: {
    setFilterId(slug) {
      this.filterId = slug;
      this.$router.push({
        path: "/services",
        query: { filter: slug },
        hash: "content"
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      api.getCollectionByKey("works").then(works => {
        this.content.works = works;
        this.worksIsReady = true;
      });

      api.getCollectionByKey("tags").then(tags => {
        this.content.tags = tags;
        this.tagsIsReady = true;
      });

      api.getSingletonsByKey("aboutUs").then(aboutUs => {
        this.content.aboutUs = aboutUs;
      });

      if (!this.filterId) {
        this.setFilterId("branding");
      }
    });
  }
};
</script>

<style lang="scss">
.devider--services {
  // justify-content: flex-start !important;
}
.services-title {
  margin-right: 20px;
}

.services-menu {
  display: block;
  width: 100%;
  margin: 0;

  &__list {
    @media screen and (min-width: 680px) {
      margin: 0;
    }
    @media screen and (min-width: 1200px) {
      // justify-content: space-between; //uncomment to unable icons correct
    }
  }

  // &__icon {
  //   @media screen and (min-width: 680px) {
  //     width: 160px;
  //     height: auto;
  //   }
  // }

  &__link {
    display: inline-block;
    background: linear-gradient(
        90.86343deg,
        #e30613 20.6375%,
        #e30613 42.375%,
        #fafafa 91.1375%
      )
      bottom left/0% 1px no-repeat;
    transition: 0.2s ease-in-out;
    margin-right: 15px;

    &:hover {
      border-bottom: none;
    }
    &--active {
      background: linear-gradient(
          90.86343deg,
          #e30613 20.6375%,
          #e30613 42.375%,
          #fafafa 91.1375%
        )
        bottom left/100% 1px no-repeat;
    }
    @media screen and (min-width: 680px) {
      margin: auto;
    }
  }
  &__item {
    // display: flex;
    // flex-flow: column nowrap;
    // align-items: center;
    // justify-content: center;
    cursor: pointer;
    // width: 30%;

    &:hover {
      .services-menu__link {
        background: linear-gradient(
            90.86343deg,
            #e30613 20.6375%,
            #e30613 42.375%,
            #fafafa 91.1375%
          )
          bottom left/100% 1px no-repeat;
      }
    }

    @media screen and (min-width: 680px) {
      // width: auto;
    }
    @media screen and (min-width: 680px) {
      // margin: 0;
      // margin-right: 20px; //remove to unable icons correct
    }
  }
}

.services-about {
  font-size: 28px;
  margin: 35px 8px 35px;
  color: #e30613;
  font-family: "ProximaNova-Light";
  font-weight: normal;
  box-sizing: border-box;

  @media screen and (min-width: 680px) {
    margin-left: 15px;
    font-size: 32px;
  }
  @media screen and (min-width: 920px) {
    width: 900px;
  }
  @media screen and (min-width: 1200px) {
    margin-left: 0;
  }
}

.services {
  &__button {
    margin-bottom: 35px;
    margin: 15px 0 40px 8px;

    @media screen and (min-width: 680px) {
      margin-left: 15px;
    }
    @media screen and (min-width: 920px) {
      margin-bottom: 50px;
    }
    @media screen and (min-width: 1200px) {
      margin-left: 0;
      margin-bottom: 120px;
    }
  }
}
</style>
