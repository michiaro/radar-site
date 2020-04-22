<template>
  <h1>Services</h1>
  <!-- .wrapper(v-if="worksIsReady && tagsIsReady")
    .block
      .content
        .devider.page-wrapper
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
                  :class=" { 'works-menu__link--active' : tag.slug == filterId} ",
                ) 
                  |{{ tag.title }}
        Service(:filterId = "filterId")
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
        Contactform.home-form#contact-form -->
</template>

<script>
import api from '../../api/';

export default {
  name: 'Services',
  components: {
    // Contactform,
    // WorkItem,
    // Service,
  },
  data() {
    return {
      // content: {
      //   works: [],
      //   tags: [],
      //   clients: [],
      //   team: [],
      // },
      // filterId: this.$route.query.filter,
      // worksIsReady: false,
      // tagsIsReady: false,
      // swiperOption: {
      //   loop: true,
      //   slidesPerView: 1,
      //   autoplay: {
      //     delay: 4000,
      //     disableOnInteraction: false,
      //   },
      //   pagination: {
      //     el: '.swiper-pagination',
      //     clickable: true,
      //   },
      //   navigation: {
      //     nextEl: '.swiper-button-next',
      //     prevEl: '.swiper-button-prev',
      //   },
      //   preloadImages: false,
      //   lazy: true,
      // },
    };
  },
  // computed: {
  //   filteredWorks() {
  //     if (!this.$route.query.filter) {
  //       return this.content.works.filter(work =>
  //         work.tags.some(tag => tag._id == 'branding'),
  //       );
  //     }
  //     var currentTag = this.content.tags.find(
  //       tag => tag.slug === this.$route.query.filter,
  //     );
  //     return this.content.works.filter(work =>
  //       work.tags.some(tag => tag._id == currentTag._id),
  //     );
  //   },
  // },
  // methods: {
  //   setFilterId(slug) {
  //     this.filterId = slug;
  //     this.$router.push({
  //       path: '/services',
  //       query: { filter: slug },
  //     });
  //   },
  // },
  // mounted() {
  //   this.$nextTick(() => {
  //     api.getCollectionByKey('works').then(works => {
  //       this.content.works = works;
  //       this.worksIsReady = true;
  //     });

  //     api.getCollectionByKey('tags').then(tags => {
  //       this.content.tags = tags;
  //       this.tagsIsReady = true;
  //     });

  //     if (!this.filterId) {
  //       this.setFilterId('branding');
  //     }
  //   });
  // },
};
</script>

<style lang="scss">

</style>
