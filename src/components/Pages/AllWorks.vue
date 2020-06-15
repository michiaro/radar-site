<template>
  <div class="all-works">
    <div class="container">
      <div class="row">
        <h1 v-if="currentClient && client" class="col col-xs-2">Наши работы для {{ client.title }}</h1>
        <div v-else class="col col-xs-2 col-lg-2 col-lg-offset-2 col-xl-6 col-xl-offset-6">
          <div v-if="!isFilterLoading" class="filter">
            <div class="filter__item" :class="getFilterClass(null)" @click="setFilter(null)">
              Все
            </div>
            <div
              v-for="{ slug, title } in filterTags"
              :key="slug"
              class="filter__item"
              :class="getFilterClass(slug)"
              @click="setFilter(slug)"
            >
              {{ title }}
            </div>
          </div>
          <div v-if="isFilterLoading" class="filter filter--dummy loading" />
        </div>
      </div>
      <div class="all-works__list">
        <template v-if="!isWorksLoading">
          <work-list ref="workList" :works="works" />
        </template>
        <div v-else class="row">
          <div class="col col-xs-2 col-sm-3 col-md-2 col-lg-6 col-2xl-4">
            <p class="dummy-title">
              Кейсов по&nbsp;этому направлению пока&nbsp;нет
            </p>
          </div>
        </div>
      </div>
      <div v-if="isLoadMoreVisible" class="row">
        <div class="col col-xs-12">
          <button class="all-works__show-more" @click="fetchWorks">
            ещё работы
          </button>
        </div>
      </div>
    </div>

    <page-footer />
  </div>
</template>

<script>
import { getCollectionByKey } from '@/api/index.js';
import WorkList from '@/components/WorkList.vue';
import PageFooter from '@/components/PageFooter.vue';
import { WORKS_TO_LOAD_COUNT } from '@/settings.js';

export default {
  name: 'AllWorks',
  components: {
    WorkList,
    PageFooter,
  },
  data() {
    return {
      isFilterLoading: false,
      isWorksLoading: false,
      client: null,
    };
  },
  computed: {
    tags() {
      return this.$store.state.staticData.collections.tags || null;
    },
    filterTags() {
      const { tags } = this;
      return tags.filter((tag) => tag.inFilter);
    },
    works() {
      return this.$store.state.works.content || null;
    },
    total() {
      return this.$store.state.works.total || null;
    },
    isLoadMoreVisible() {
      const { works, total } = this;

      return works.length ? works.length < total : false;
    },
    currentFilter() {
      const filterInStore = this.$store.state.works.filter;
      const filterQuery = this.$route.query.filter;

      return filterQuery || filterInStore || null;
    },
    currentFilterTitle() {
      const { tags, currentFilter } = this;

      return tags && currentFilter ? tags.find((tag) => tag.slug === currentFilter).title : null;
    },
    currentClient() {
      const clientQuery = this.$route.query.client;
      return clientQuery || null;
    },
  },
  async created() {
    const { tags, works, currentFilter, currentClient } = this;

    if (!tags) {
      this.fetchTags();
    }
    if (!works.length) {
      await this.fetchWorks();
    } else {
      // this.animationStep = works.length;
    }

    if (currentFilter || currentClient) {
      this.fetchWorks({ resetSkip: true });
      this.fetchClient();
    }
  },
  methods: {
    async fetchTags() {
      // убрать подсветку загрузки
      this.isFilterLoading = true;

      const { data } = await getCollectionByKey({
        key: 'tags',
      });
      const tagsArray = data;

      this.$store.commit('setStaticCollectionData', {
        title: 'tags',
        collection: tagsArray,
      });

      this.isFilterLoading = false;
    },
    async fetchWorks({ resetSkip } = { resetSkip: false }) {
      const { works, currentFilterTitle, currentClient } = this;

      this.isWorksLoading = true;

      let filterSettings = { isPublished: true };
      if (currentFilterTitle) {
        filterSettings = {
          ...filterSettings,
          tagsNewField: { $has: currentFilterTitle },
        };
      }
      if (currentClient) {
        filterSettings = {
          ...filterSettings,
          'client.display': currentClient,
        };
      }

      const { data, total } = await getCollectionByKey({
        key: 'works',
        filter: filterSettings,
        options: {
          limit: WORKS_TO_LOAD_COUNT,
          skip: resetSkip ? 0 : works.length,
          sort: { _o: 1 },
        },
      });

      this.$store.commit('setWorksContent', { data, reset: resetSkip });
      this.$store.commit('setWorksTotal', { total });

      this.isWorksLoading = false;
    },
    async fetchClient() {
      const { currentClient } = this;

      const { data } = await getCollectionByKey({
        key: 'clients',
        filter: {
          slug: currentClient,
        },
      });

      this.client = data[0];
    },
    getFilterClass(filter) {
      return filter === this.currentFilter ? 'filter__item--active' : false;
    },
    setFilter(tag) {
      if (this.currentFilter !== tag) {
        // обнуляем счетчик анимаций
        this.$store.commit('resetAnimations', { counterKey: 'page' });

        if (this.$refs.workList) {
          this.$refs.workList.resetVisibility();
        }

        this.$router.push({
          path: '/all-works',
          query: tag ? { filter: tag } : {},
        });

        this.$store.commit('setWorksFilter', {
          filter: tag,
        });

        this.fetchWorks({ resetSkip: true });
      }
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/shared/_globals.scss';

.all-works {
  &__list {
    min-height: calc(100vh - #{$--header-height});
  }

  &__show-more {
    font-size: $--font-size-120;
    text-align: center;
    letter-spacing: $--letter-spacing;
    color: $--color-text--muted;

    border: none;
    border-radius: unset;
    background: unset;

    display: block;
    margin: auto;
    cursor: pointer;
    transition: color $--duration-200 $--timing-in-out-cubic;

    margin-top: 28px;

    @include from('md') {
      font-size: $--font-size-180;
    }

    &:hover {
      color: $--color-brand;
    }
  }
}

.filter {
  display: flex;
  flex-flow: row wrap;
  padding-bottom: 12px;
  margin: 0 -12px;

  @include from('lg') {
    flex-wrap: nowrap;
    justify-content: space-between;
  }

  &__item {
    font-size: $--font-size-90;
    letter-spacing: $--letter-spacing;
    color: $--color-text--muted;
    text-transform: lowercase;
    line-height: 1.3;
    cursor: pointer;
    transition: color $--duration-200 $--timing-in-out-cubic;
    padding: 0 12px;

    &--active,
    &:hover {
      color: $--color-brand;
    }
  }

  &--dummy {
    height: $--font-size-90 * 1.3;
    background: $--color-text--muted;
    width: 100%;
    padding-bottom: 0;
    margin: 0 0 12px;
  }
}

.dummy-title {
  margin: 0;

  font-weight: normal;
  font-size: 23px;
  letter-spacing: $--letter-spacing;

  margin-bottom: 62px;
  @include from('md') {
    margin-bottom: 104px;
    font-size: 44px;
  }
}
</style>
