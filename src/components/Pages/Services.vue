<template lang="pug">
  .wrapper(v-if="worksIsReady && tagsIsReady")
    .block
      .content.page-wrapper
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
        Service(:filterId = "filterId", id="content")
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
        Contactform.home-form
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
        team: []
      },
      filterId: this.$route.query.filter,
      worksIsReady: false,
      tagsIsReady: false
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

      if (!this.filterId) {
        this.setFilterId("branding");
      }
    });
  }
};
</script>

<style lang="scss">
.devider--services {
  justify-content: flex-start !important;
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

  &__icon {
    @media screen and (min-width: 680px) {
      width: 160px;
      height: auto;
    }
  }

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
</style>
