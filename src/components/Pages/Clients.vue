<template lang="pug">
  .wrapper(v-if="isReady")
    .block.products
      .content.products__content
        .devider
          h1.common-title Клиенты
          .products__about
            .products__text(
              v-html="content.aboutClients.content"
            )
            .products__filter(
              @click="toggleFilterVisible",
              v-if="isMobile"
            ) По отраслям
            nav.works-menu.products-menu(v-show="filterIsVisible")
              ul.works-menu__list.products-menu__list
                li.works-menu__item.products-menu__item(
                ) 
                  span.works-menu__link(
                    key="all",
                    :class=" { 'works-menu__link--active' : !filterId} ",
                    @click="resetFilterId"
                  ) Всё
                li.works-menu__item.products-menu__item(
                  v-for="tag in content.clientsTags",
                  @click="setFilterId(tag.slug)",
                )
                  span.works-menu__link(
                    :key="tag.slug",
                    :class=" { 'works-menu__link--active' : tag.slug == filterId} ",
                  ) 
                    |{{ tag.title }}
        .works-pack.works-pack--clients
          .products__img-wrapper.one-work.one-work--client(
            v-lazyload,
            v-for="client in filteredClients",
            v-if="client.color_logo.path",
            :id="client.slug"
            :key="client._id",
          )
            img.products__img(
              :data-url="'https://radar-online.ru'+client.color_logo.path",
              :alt="client.title",
              :class=" { 'products__img--color' : isActiveClient(client._id) }",
              @click="isActiveClient(client._id) ? openClientWorks(client.slug, client._id) : null"
            )
</template>

<script>
import api from "../../api/";

export default {
  name: "Clients",
  props: {
    isMobile: Boolean
  },
  data() {
    return {
      content: {
        aboutClients: "",
        clients: [],
        clientsTags: [],
        works: []
      },
      filterIsVisible: true,
      isReady: false,
      filterId: this.$route.query.filter
    };
  },
  computed: {
    filteredClients() {
      if (this.$route.query.filter && this.isReady) {
        var currentTag = this.content.clientsTags.find(
          tag => tag.slug === this.$route.query.filter
        );
        var filteredClients = this.content.clients.filter(client => {
          return client.industry._id === currentTag._id;
        });
        return filteredClients;
      } else {
        return this.content.clients;
      }
    }
  },
  methods: {
    toggleFilterVisible() {
      this.filterIsVisible = !this.filterIsVisible;
    },
    openClientWorks(slug, id) {
      var clientWorks = this.content.works.filter(
        work => work.client._id == id
      );
      if (clientWorks.length > 1) {
        this.$router.push({
          path: "/all-works",
          query: { client: slug }
        });
      } else {
        this.$router.push({
          path: "/" + clientWorks[0].slug
        });
      }
    },
    setFilterId(slug) {
      this.filterId = slug;
      this.$router.push({ path: "/clients", query: { filter: slug } });
    },
    resetFilterId() {
      this.filterId = null;
      this.$router.push({ path: "/clients" });
    },
    isActiveClient(id) {
      return this.content.works.some(work => {
        return work.client._id === id;
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      api.getSingletonsByKey("aboutClients").then(aboutClients => {
        this.content.aboutClients = aboutClients;
      });

      api.getCollectionByKey("clients").then(clients => {
        this.content.clients = clients;
      });

      api.getCollectionByKey("clientsTags").then(clientsTags => {
        this.content.clientsTags = clientsTags;
        this.isReady = true;
      });

      api.getCollectionByKey("works").then(works => {
        this.content.works = works;
      });

      if (this.isMobile) this.filterIsVisible = false;
    });
  }
};
</script>

<style lang="scss">
.products__content {
  padding: 120px 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  min-height: 100vh;
}

.products__img {
  width: 100%;
  filter: grayscale(100%);
  cursor: initial;

  &-wrapper {
    width: 41%;
    margin: 0 10px;

    @media screen and (min-width: 680px) {
      width: 22%;
    }

    @media screen and (min-width: 1200px) {
      width: 15%;
    }
  }

  &--color:hover {
    filter: grayscale(0%);
    transition: filter 0.3s linear;
    cursor: pointer;
  }
}

.products__about {
  display: flex;
  flex-flow: row wrap;

  @media screen and (min-width: 1200px) {
    flex-wrap: nowrap;
    margin-top: 40px;
  }
}

.products__text {
  line-height: 1.3;
  color: #292e35;
  margin: 0 10px;
  /* hide about text on Clients */
  display: none;

  @media screen and (min-width: 1200px) {
    max-width: 35%;
    margin: 0 8% 0 1px;
  }
}

.products-menu {
  margin-top: 20px;

  @media screen and (min-width: 680px) {
    margin-left: 3px;
  }

  @media screen and (min-width: 922px) {
    margin-left: 8px;
  }

  @media screen and (min-width: 1200px) {
    display: inline-block;
    margin-top: 0;
    /* hide about text on Clients */
    margin-left: -25px;
  }

  &.active {
    display: inline-block;
  }

  &__list {
    @media screen and (min-width: 1200px) {
      margin-left: 16px;
    }
  }

  &__item {
    margin: 0 20px 15px 10px;
    height: 20px;

    @media screen and (min-width: 1200px) {
      margin: 0 20px 15px 10px;
    }

    & span {
      font-size: 16px;
    }
  }
}

.products__filter {
  color: #292e35;
  display: block;
  height: 20px;
  box-sizing: border-box;
  cursor: pointer;
  border-bottom: 1px solid #292e35;
  /* hide about text on Clients */
  margin: 10px 0 -15px 8px;
  /* margin: 30px 0 -15px; uncomment this string*/

  &:hover {
    border: none;
  }

  @media screen and (min-width: 680px) {
    margin-left: 18px;
  }
}
</style>