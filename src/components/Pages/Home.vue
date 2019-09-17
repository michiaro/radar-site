<template lang="pug">
  .wrapper(v-if="isReady")
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
        .devider
          h2.common-title Работы
          router-link.see-more(to="/all-works") ВСЕ РАБОТЫ
          nav.works-menu
            ul.works-menu__list
              li.works-menu__item(
              ) 
                span.works-menu__link(
                  key="all",
                  :class=" { 'works-menu__link--active' : !filterId} ",
                  @click="resetFilterId"
                ) Всё
              li.works-menu__item(
                v-for="tag in content.tags",
                v-if="tag.inFilter",
                @click="setFilterId(tag.slug)",
              )
                span.works-menu__link(
                  :key="tag.slug",
                  :class=" { 'works-menu__link--active' : tag.slug == filterId} ",
                ) 
                  |{{ tag.title }}
        .works-block
          .works-pack
            WorkItem(
              v-for="(work, index) in filteredWorks",
              v-if="index <= 23 && work.isPublished",
              :key="work.slug",
              :work="work"
            )
    .block
      .content
        Contactform.home-form
    .block
      .content.content-4
        .devider.bm
          h2.common-title Наши клиенты
        swiper(
          :options="demoSwiperOption",
          ref="demoSwiper",
        )
          swiper-slide.swiper-lazy(
            v-for="client in content.clients",
            v-if="client.isFeatured",
            :key="client.id"
          )
            .swiper-lazy-preloader
            img(:src="'https://radar-online.ru'+client.logo.path", :alt="client.title")
    .block
      .block.big-map
        .big-map__head.content.content-5
          h2.common-title Контакты
          ul.tabs
            li.tabs__item.switcher(
              @click="showMoscow",
              :class="{ 'tabs__item_active' : isMoscow }"
              ) Москва
            li.tabs__item.switcher(
              @click="showChelly",
              :class="{ 'tabs__item_active' : isChelly }"
              ) Челябинск
          .big-map__descr
            p.adress(
              v-html="content.locations.chelly_address",
              :class="{ 'contact-active' : isChelly }"
              )
            p.adress(
              v-html="content.locations.moscow_address",
              :class="{ 'contact-active' : isMoscow }"
              )
            .contacts(
              :class="{ 'contact-active' : isChelly }"
            )
              a.chelly_phone(:href="content.locations.chelly_phonelink") {{ content.locations.chelly_phone }}
              br
              a(:href="'mailto:'+content.locations.chelly_email") {{ content.locations.chelly_email }}
            .contacts(
              :class="{ 'contact-active' : isMoscow }"
            )
              a.moscow_phone(:href="content.locations.moscow_phonelink") {{ content.locations.moscow_phone }}
              br
              a(:href="'mailto:'+content.locations.moscow_email") {{ content.locations.moscow_email }}
          ul.zoom
            li.zoom__item(@click="changeZoomOut")
              span.zoom__minus
            li.zoom__item(@click="changeZoomIn")
              span.zoom__plus
        Map(
        :isChelly="isChelly",
        :isMoscow="isMoscow",
        ref="mapRef"
        )
</template>

<script>
import api from "../../api/";
import Contactform from "../Contactform.vue";
import Map from "../Map.vue";
import WorkItem from "../WorkItem.vue";

export default {
  name: "Home",
  props: {},
  components: {
    Contactform,
    Map,
    WorkItem
  },
  data() {
    return {
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
      },
      activeIndex: 0,
      demoSwiperOption: {
        loop: true,
        slidesPerView: 6,
        spaceBetween: 30,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        breakpoints: {
          680: {
            slidesPerView: 2,
            spaceBetween: 10
          },
          922: {
            slidesPerView: 4,
            spaceBetween: 20
          },
          1200: {
            slidesPerView: 6,
            spaceBetween: 30
          }
        },
        preloadImages: false,
        lazy: true
      },
      content: {
        works: [],
        tags: [],
        clients: [],
        locations: "",
        common: ""
      },
      filterId: this.$route.query.filter,
      isMoscow: false,
      isChelly: true,
      isReady: false
    };
  },
  computed: {
    filteredWorks() {
      if (!this.filterId) {
        return this.content.works;
      }
      var tagId = this.content.tags.find(
        tag => tag.slug === this.$route.query.filter
      );
      return this.content.works.filter(work =>
        work.tags.some(tag => tag._id == tagId._id)
      );
    }
  },
  methods: {
    showMoscow() {
      this.isMoscow = true;
      this.isChelly = false;
    },
    showChelly() {
      this.isChelly = true;
      this.isMoscow = false;
    },
    setFilterId(slug) {
      this.filterId = slug;
      this.$router.push({ path: "/", query: { filter: slug } });
    },
    resetFilterId() {
      this.filterId = null;
      this.$router.push({ path: "/" });
    },
    changeZoomIn() {
      this.$refs.mapRef.zoomIn();
    },
    changeZoomOut() {
      this.$refs.mapRef.zoomOut();
    },
    // toWork(work) {
    //   this.$router.push({
    //     path: "/" + work.slug
    //   });
    //   document.title = "Radar Advertising, " + work.title;
    // },
    defineCity() {
      var self = this;
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var lat = position.coords.latitude;
          var lng = position.coords.longitude;

          if (lat >= 37 && lat <= 38 && lng >= 55 && lng <= 56) {
            // MSK
            self.showMoscow();
          }
        });
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      api.getCollectionByKey("works").then(works => {
        this.content.works = works;
        this.isReady = true;
      });

      api.getCollectionByKey("tags").then(tags => {
        this.content.tags = tags;
      });

      api.getCollectionByKey("clients").then(clients => {
        this.content.clients = clients;
      });

      api.getSingletonsByKey("locations").then(locations => {
        this.content.locations = locations;
      });

      api.getSingletonsByKey("common").then(common => {
        this.content.common = common;
      });

      setTimeout(() => {
        // eslint-disable-next-line
        callibriInit();
      }, 500);

      this.defineCity();
    });
  }
};
</script>

<style lang="scss">
.slide {
  position: relative;
  height: 500px;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.slider__link {
  height: 100%;
  width: 100%;
  display: block;
}

.slider-content {
  width: 95%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 200;
  text-align: left;
}

.slider-content__title {
  line-height: 0.9;
  margin-bottom: 30px;
  font-size: 38px;
  color: #fff;
  font-family: "ProximaNova-Light";
  font-weight: normal;
}

.slider-content__title.dark,
.slider-content__text.dark {
  color: #292e35;
}

.slider-content__text {
  color: #fff;
  font-size: 18px;

  @media screen and (min-width: 922px) {
    max-width: 45%;
  }

  @media screen and (min-width: 1200px) {
    max-width: 35%;
  }
}

@media screen and (min-width: 680px) {
  .slider-content__title {
    font-size: 48px;
  }
  .slider-content__text {
    font-size: 20px;
  }
}

@media screen and (min-width: 1200px) {
  .slider-content__title {
    max-width: 45%;
  }
}

@media screen and (min-width: 1200px) {
  .slider-content {
    width: 1200px;
  }
  .slider-content__title {
    line-height: 45px;
    margin-bottom: 40px;
    max-width: 35%;
  }
}

.swiper-pagination-bullet {
  background: #fff;
  opacity: 0.6;
}

.swiper-pagination-bullet-active {
  opacity: 1;
  background: #ffffff;
}

.swiper-button-prev {
  display: none;
}

.swiper-button-next {
  display: none;
}

@media screen and (min-width: 1200px) {
  .swiper-button-prev {
    display: block;
  }
  .swiper-button-next {
    display: block;
  }
}
</style>
