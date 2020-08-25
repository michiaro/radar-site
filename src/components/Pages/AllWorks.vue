<template>
  <div class="all-works">
    <div class="container">
      <div class="row">
        <div class="col col-xs-2">
          <h1 v-if="currentClient && client" class="all-works__dummy-title">
            <p v-if="works.lenght > 0">Наши работы для {{ client.title }}</p>
            <p v-else>
              Наши работы для {{ client.title }} <br />
              скоро появятся.
            </p>
          </h1>
        </div>
        <div
          class="col col-xs-2 col-lg-2 col-lg-offset-2 col-xl-6 col-xl-offset-6"
        >
          <template v-if="isFilterReady">
            <appear :is-visible="isFilterVisible" is-silent>
              <div class="filter">
                <div
                  class="filter__item appear appear--duration--500"
                  @click="setFilter(null)"
                >
                  <span class="filter__label" :class="getFilterClass(null)"
                    >Все</span
                  >
                </div>
                <div
                  v-for="({ slug, title }, index) in filterTags"
                  :key="slug"
                  class="filter__item appear appear--duration--500"
                  :class="'appear--delay-' + (index + 1) * 200"
                  @click="setFilter(slug)"
                >
                  <span class="filter__label" :class="getFilterClass(slug)">{{
                    title
                  }}</span>
                </div>
              </div>
            </appear>
          </template>
        </div>
      </div>
      <div
        class="all-works__list"
        :class="{ 'all-works__list--empty': works.length === 0 }"
      >
        <template v-if="isWorksReady">
          <work-list ref="workList" :works="works" />
        </template>
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
import Appear from '@/components/Appear.vue';
import PageFooter from '@/components/PageFooter.vue';
import WorkList from '@/components/WorkList.vue';
import { WORKS_TO_LOAD_COUNT } from '@/settings.js';
export default {
  name: 'AllWorks',
  components: {
    Appear,
    PageFooter,
    WorkList,
  },
  data() {
    return {
      isFilterReady: false,
      isFilterVisible: false,
      isWorksReady: false,
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

      return tags && currentFilter
        ? tags.find((tag) => tag.slug === currentFilter).title
        : null;
    },
    currentClient() {
      const clientQuery = this.$route.query.client;
      return clientQuery || null;
    },
  },
  async created() {
    const { tags, works, currentFilter, currentClient } = this;

    if (!tags && !currentClient) {
      this.fetchTags();
    } else if (!currentClient) {
      this.isFilterReady = true;
    }

    if (!works.length && !currentClient) {
      await this.fetchWorks();
    } else {
      this.isWorksReady = true;
    }

    if (currentFilter || currentClient) {
      this.fetchWorks({ resetSkip: true });
      this.fetchClient();
    }

    // показываем фильтр примерно после подгрузки четырех работ
    setTimeout(() => {
      this.isFilterVisible = true;
    }, 1000);
  },
  methods: {
    async fetchTags() {
      const { data } = await getCollectionByKey({
        key: 'tags',
      });
      const tagsArray = data;

      this.$store.commit('setStaticCollectionData', {
        title: 'tags',
        collection: tagsArray,
      });

      this.isFilterReady = true;
    },
    async fetchWorks({ resetSkip } = { resetSkip: false }) {
      const { works, currentFilterTitle, currentClient } = this;

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

      this.isWorksReady = true;
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
      return filter === this.currentFilter ? 'filter__label--active' : false;
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
  &__dummy-title {
    font-weight: normal;
    font-size: $--font-size-300;
    letter-spacing: $--letter-spacing;
    color: $--color-text;
  }

  &__list {
    min-height: calc(100vh - #{$--header-height});

    &--empty {
      min-height: unset;
    }
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
  min-height: $--font-size-140 * 1.3;
  box-sizing: border-box;

  @include from('lg') {
    flex-wrap: nowrap;
    justify-content: space-between;
  }

  &__item {
    padding: 0 12px;
  }

  &__label {
    font-size: $--font-size-90;
    letter-spacing: $--letter-spacing;
    text-transform: lowercase;
    line-height: 1.3;
    cursor: pointer;
    transition: color $--duration-200 $--timing-in-out-cubic;
    color: $--color-text--muted;
    &--active,
    &:hover {
      color: $--color-brand;
    }
  }
}
</style>
