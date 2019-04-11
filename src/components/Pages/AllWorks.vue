<template lang="pug">
  .wrapper(v-if="isReady")
    .block
      .content.page-wrapper
        .devider
          h1.common-title {{ worksTitle }}
          nav.works-menu(v-if="!this.hideFilter")
            ul.works-menu__list
              li.works-menu__item
                span.works-menu__link(
                  key="all",
                  :class=" { 'works-menu__link--active' : !filterId} ",
                  @click="resetFilterId"
                ) Всё
              li.works-menu__item(
                v-for="tag in this.content.tags",
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
            router-link.one-work(
              v-for="work in filteredWorks",
              :to="'/all-works/' +work.slug",
              :key="work.slug"
            )
              img.one-work__img(:src="'http://new.radar-online.mcdir.ru/'+work.cover.path", :alt="work.title")
              a(
                href="#"
              )
                .one-work__description
                  .desc-text
                    .desc-text__title {{ work.title }}
                    p.desc-text__text {{ work.prescription }}
    .block
      .content
        Contactform.home-form
</template>

<script>
import api from "../../api/";
import Contactform from "../Contactform.vue";

export default {
  name: "AllWorks",
  props: {
    // msg: String
  },
  components: {
    Contactform
  },
  data() {
    return {
      content: {
        works: [],
        tags: [],
        clients: [],
        team: []
      },
      isReady: false,
      filterId: this.$route.query.filter
    };
  },
  computed: {
    filteredWorks() {
      if (!this.$route.query.filter) {
        if (!this.$route.query.client) {
          if (!this.$route.query.team) {
            return this.content.works;
          }
          var currentTeam = this.content.team.find(
            member => member.slug === this.$route.query.team
          );
          return this.content.works.filter(work =>
            work.credits.some(position =>
              position.value.staff.some(
                employee => employee._id == currentTeam._id
              )
            )
          );
        }
        var currentClient = this.content.clients.find(
          client => client.slug === this.$route.query.client
        );
        return this.content.works.filter(
          work => work.client._id == currentClient._id
        );
      }
      var currentTag = this.content.tags.find(
        tag => tag.slug === this.$route.query.filter
      );
      return this.content.works.filter(work =>
        work.tags.some(tag => tag._id == currentTag._id)
      );
    },
    worksTitle() {
      if (!this.$route.query.filter) {
        if (!this.$route.query.client) {
          if (!this.$route.query.team) {
            return "Работы";
          }
          var currentTeam = this.content.team.find(
            member => member.slug === this.$route.query.team
          );
          return "Работы с участием " + currentTeam.name;
        }
        var currentClient = this.content.clients.find(
          client => client.slug === this.$route.query.client
        );
        return currentClient.title;
      }
      var currentTag = this.content.tags.find(
        tag => tag.slug === this.$route.query.filter
      );
      if (currentTag.inFilter) {
        return "Работы";
      }
      return "#" + currentTag.slug;
    },
    hideFilter() {
      return this.$route.query.client || this.$route.query.team;
    }
  },
  methods: {
    setFilterId(slug) {
      this.filterId = slug;
      this.$router.push({ path: "/all-works", query: { filter: slug } });
    },
    resetFilterId() {
      this.filterId = null;
      this.$router.push({ path: "/all-works" });
    }
  },
  mounted() {
    this.$nextTick(() => {
      api.getCollectionByKey("works").then(works => {
        this.content.works = works;
      });

      api.getCollectionByKey("tags").then(tags => {
        this.content.tags = tags;
      });

      api.getCollectionByKey("clients").then(clients => {
        this.content.clients = clients;
      });

      api.getCollectionByKey("team").then(team => {
        this.content.team = team;
        this.isReady = true;
      });
    });
  }
};
</script>

<style lang="scss">
</style>
