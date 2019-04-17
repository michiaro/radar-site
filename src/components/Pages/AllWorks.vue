<template lang="pug">
  .wrapper(v-if="worksIsReady && tagsIsReady && clientsIsReady && teamIsReady")
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
            a.one-work(
              v-for="work in filteredWorks",
              :key="work.slug",
              @click="toWork(work)"
            )
              img.one-work__img(:src="'http://new.radar-online.mcdir.ru/'+work.cover.path", :alt="work.title")
              div
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
      filterId: this.$route.query.filter,
      worksIsReady: false,
      tagsIsReady: false,
      clientsIsReady: false,
      teamIsReady: false
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
        if (currentClient)
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
        if (!this.$route.query.team) {
          return "Работы";
        }
        var currentTeam = this.content.team.find(
          member => member.slug === this.$route.query.team
        );
        if (currentTeam != undefined) {
          return "Работы с участием " + currentTeam.name;
        }
        return "Работы";
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
    },
    toWork(work) {
      this.$router.push({
        path: "/all-works/" +work.slug,
      });
      document.title = 'Radar Advertising, ' +work.title;
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

      api.getCollectionByKey("clients").then(clients => {
        this.content.clients = clients;
        this.clientsIsReady = true;
      });

      api.getCollectionByKey("team").then(team => {
        this.content.team = team;
        this.teamIsReady = true;
      });
    });
  }
};
</script>

<style lang="scss">
</style>
