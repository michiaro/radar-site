<template>
  <div class="main">
    <img class="main__image" :src="backgroundImage" alt="Radar advertising" />
    <video
      class="main__video"
      autoplay="autoplay"
      loop="loop"
      muted="muted"
      playsinline
      preload="auto"
    >
      <source :src="videoMP4" type="video/mp4" />
    </video>
    <div class="main__content">
      <h1 class="main__title">
        За каждым проектом мы видим цели и мечты, ценим человеческие отношения
      </h1>
      <div class="main__bottom">
        <div class="main__services">
          Мы занимаемся
          <router-link class="main__link link" to="Services"
            >брендингом</router-link
          >, <br />
          <router-link class="main__link link" to="Services"
            >дизайном</router-link
          >
          и
          <router-link class="main__link link" to="Services"
            >рекламой</router-link
          >
        </div>
        <div class="main__social-media">
          <a
            href="https://www.instagram.com/radaradvertising/"
            class="social-link"
            target="_blank"
            >INSTAGRAM</a
          >
          <a
            href="https://www.facebook.com/RadarAdvertising"
            class="social-link"
            target="_blank"
            >FACEBOOK</a
          >
        </div>
      </div>
    </div>
  </div>
  <!-- .wrapper(v-if="isReady")
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
                ) Избранное
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
              a.chelly_phone(:href="'tel:' +content.locations.chelly_phonelink") {{ content.locations.chelly_phone }}
              br
              a(:href="'mailto:'+content.locations.chelly_email") {{ content.locations.chelly_email }}
            .contacts(
              :class="{ 'contact-active' : isMoscow }"
            )
              a.moscow_phone(:href="'tel:' +content.locations.moscow_phonelink") {{ content.locations.moscow_phone }}
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
  )-->
</template>

<script>
import videoMP4 from '@/video/main-video.mp4';
import backgroundImage from '@/images/main-back.jpg';
// import api from "../../api/";
// import Contactform from "../Contactform.vue";
// import Map from "../Map.vue";
// import WorkItem from "../WorkItem.vue";

export default {
  name: 'Home',
  components: {
    // Contactform,
    // Map,
    // WorkItem
  },
  data() {
    return {
      videoMP4,
      backgroundImage,
      // swiperOption: {
      //   loop: true,
      //   slidesPerView: 1,
      //   autoplay: {
      //     delay: 4000,
      //     disableOnInteraction: false
      //   },
      //   pagination: {
      //     el: ".swiper-pagination",
      //     clickable: true
      //   },
      //   navigation: {
      //     nextEl: ".swiper-button-next",
      //     prevEl: ".swiper-button-prev"
      //   },
      //   preloadImages: false,
      //   lazy: true
      // },
      // activeIndex: 0,
      // demoSwiperOption: {
      //   loop: true,
      //   slidesPerView: 6,
      //   spaceBetween: 30,
      //   autoplay: {
      //     delay: 3000,
      //     disableOnInteraction: false
      //   },
      //   breakpoints: {
      //     680: {
      //       slidesPerView: 2,
      //       spaceBetween: 10
      //     },
      //     922: {
      //       slidesPerView: 4,
      //       spaceBetween: 20
      //     },
      //     1200: {
      //       slidesPerView: 6,
      //       spaceBetween: 30
      //     }
      //   },
      //   preloadImages: false,
      //   lazy: true
      // },
      // content: {
      //   works: [],
      //   tags: [],
      //   clients: [],
      //   locations: "",
      //   common: ""
      // },
      // filterId: this.$route.query.filter,
      // isMoscow: false,
      // isChelly: true,
      // isReady: false
    };
  },
  // computed: {
  //   filteredWorks() {
  //     if (!this.filterId) {
  //       return this.content.works.filter(work => work.isOnMainPage);
  //     }
  //     var tagId = this.content.tags.find(
  //       tag => tag.slug === this.$route.query.filter
  //     );
  //     return this.content.works.filter(work =>
  //       work.tags.some(tag => tag._id == tagId._id)
  //     );
  //   }
  // },
  // methods: {
  //   showMoscow() {
  //     this.isMoscow = true;
  //     this.isChelly = false;
  //   },
  //   showChelly() {
  //     this.isChelly = true;
  //     this.isMoscow = false;
  //   },
  //   setFilterId(slug) {
  //     this.filterId = slug;
  //     this.$router.push({ path: "/", query: { filter: slug } });
  //   },
  //   resetFilterId() {
  //     this.filterId = null;
  //     this.$router.push({ path: "/" });
  //   },
  //   changeZoomIn() {
  //     this.$refs.mapRef.zoomIn();
  //   },
  //   changeZoomOut() {
  //     this.$refs.mapRef.zoomOut();
  //   },
  //   // toWork(work) {
  //   //   this.$router.push({
  //   //     path: "/" + work.slug
  //   //   });
  //   //   document.title = "Radar Advertising, " + work.title;
  //   // },
  //   defineCity() {
  //     var self = this;
  //     if ("geolocation" in navigator) {
  //       navigator.geolocation.getCurrentPosition(function(position) {
  //         var lat = position.coords.latitude;
  //         var lng = position.coords.longitude;

  //         if (lat >= 37 && lat <= 38 && lng >= 55 && lng <= 56) {
  //           // MSK
  //           self.showMoscow();
  //         }
  //       });
  //     }
  //   }
  // },
  // mounted() {
  //   this.$nextTick(() => {
  //     api.getCollectionByKey("works").then(works => {
  //       this.content.works = works;
  //       this.isReady = true;
  //     });

  //     api.getCollectionByKey("tags").then(tags => {
  //       this.content.tags = tags;
  //     });

  //     api.getCollectionByKey("clients").then(clients => {
  //       this.content.clients = clients;
  //     });

  //     api.getSingletonsByKey("locations").then(locations => {
  //       this.content.locations = locations;
  //     });

  //     api.getSingletonsByKey("common").then(common => {
  //       this.content.common = common;
  //     });

  //     setTimeout(() => {
  //       // eslint-disable-next-line
  //       callibriInit();
  //     }, 500);

  //     this.defineCity();
  //   });
  // }
};
</script>

<style lang="scss">
@import '@/styles/shared/_globals.scss';

.main {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  height: 100vh;
  z-index: -1;
  background-color: $color-primary;

  &__video,
  &__image {
    position: absolute;
    width: auto;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
    top: 0;
    z-index: -1;

    @include from('md') {
      min-width: 100%;
      height: auto;
      min-height: 100%;
    }
  }

  &__content {
    height: 100%;
    box-sizing: border-box;
    padding: 124px 20px 20px;
    @include from('lg') {
      padding: 16vh 34px 34px;
    }

    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
  }
  &__title {
    margin: 0;
    font-weight: normal;
    font-size: 30px;
    @include from('sm') {
      font-size: 70px;
      width: 80%;
      margin-right: 10vw;
    }
    @include from('lg') {
      font-size: 90px;
      margin-right: 40vw;
      max-width: 1130px;
    }
  }
  &__bottom {
    @include from('lg') {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: flex-end;
    }
  }
  &__services {
    font-size: 22px;
    line-height: 1.3;
    margin-bottom: 115px;
    @include from('lg') {
      margin-bottom: 0;
    }
  }
  &__link {
    color: $color-text;
    border-bottom: 2px solid $color-text;
    transition: all 0.2s ease-in-out;

    &:hover {
      border-bottom: none;
    }
  }
  &__social-media {
  }
}
.social-link {
  font-size: 22px;
  color: $color-text--contrast;
  transition: all 0.2s ease-in-out;

  & + & {
    margin-left: 54px;
  }

  &:hover {
    color: $color-text--contrast-muted;
  }
}
</style>
