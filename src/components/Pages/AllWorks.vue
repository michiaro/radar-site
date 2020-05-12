<template>
  <div class="all-works">
    <div class="container">
      <div class="row">
        <div
          class="col col-xs-2 col-lg-2 col-lg-offset-2 col-xl-6 col-xl-offset-6"
        >
          <div class="filter">
            <div
              class="filter__item"
              :class="{ 'filter__item--active': currentFilter === null }"
              @click="setFilter(null)"
            >
              Все
            </div>
            <div
              v-for="tag in tags"
              :key="tag.slug"
              class="filter__item"
              :class="{ 'filter__item--active': currentFilter === tag.slug }"
              @click="setFilter(tag.slug)"
            >
              {{ tag.title }}
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <work-item
          v-for="(work, index) in works"
          :key="work.slug"
          :index="index"
          :work="work"
        />
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
import WorkItem from '@/components/WorkItem.vue';
import PageFooter from '@/components/PageFooter.vue';

export default {
  name: 'AllWorks',
  components: {
    WorkItem,
    PageFooter,
  },
  data() {
    return {
      isFilterLoading: false,
      isWorksLoading: false,
    };
  },
  computed: {
    tags() {
      return this.$store.state.staticData.collections.tags || null;
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

      return filterInStore || filterQuery || null;
    },
    currentFilterTitle() {
      const { tags, currentFilter } = this;

      return tags && currentFilter
        ? tags.find((tag) => tag.slug === currentFilter).title
        : null;
    },
  },
  created() {
    const { tags, works } = this;

    if (!tags) {
      this.fetchTags();
    }
    if (!works.length) {
      this.fetchWorks();
    }
  },
  methods: {
    async fetchTags() {
      this.isFilterLoading = true;

      const { data } = await getCollectionByKey({
        key: 'tags',
        filter: { inFilter: true },
      });
      const tagsArray = data;

      this.$store.commit('setStaticCollectionData', {
        title: 'tags',
        collection: tagsArray,
      });

      this.isFilterLoading = false;
    },
    async fetchWorks({ resetSkip } = { resetSkip: false }) {
      const { works, currentFilterTitle } = this;

      this.isWorksLoading = true;

      let filterSettings = { isPublished: true };
      if (currentFilterTitle) {
        filterSettings = {
          ...filterSettings,
          tagsNewField: { $has: currentFilterTitle },
        };
      }

      const { data, total } = await getCollectionByKey({
        key: 'works',
        filter: filterSettings,
        options: {
          limit: 8,
          skip: resetSkip ? 0 : works.length,
          sort: { _o: 1 },
        },
      });

      this.$store.commit('setWorksContent', { data, reset: resetSkip });
      this.$store.commit('setWorksTotal', { total });

      this.isWorksLoading = false;
    },
    setFilter(tag) {
      if (this.currentFilter !== tag) {
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
}
</style>
