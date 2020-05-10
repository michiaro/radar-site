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
              @click="resetFilter"
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
          <button class="all-works__show-more" @click="loadMore">
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

//dummyCovers
import cover1 from '@/images/cases/case-preview-1.jpg';
import cover2 from '@/images/cases/case-preview-2.jpg';
import cover3 from '@/images/cases/case-preview-3.jpg';
import cover4 from '@/images/cases/case-preview-4.jpg';
import cover5 from '@/images/cases/case-preview-5.jpg';
import cover6 from '@/images/cases/case-preview-6.jpg';
import cover7 from '@/images/cases/case-preview-7.jpg';
import cover8 from '@/images/cases/case-preview-8.jpg';

const dummyWorks = [
  {
    cover: cover1,
    title: 'Solo',
    description: 'Разработка айдентики для клубного дома Solo',
    tags: ['design', 'campaign'],
  },
  {
    cover: cover2,
    title: 'Friendly',
    description: 'Разработка айдентики для кафе',
    tags: ['branding'],
  },
  {
    cover: cover3,
    title: 'Завтраки и еда',
    description: 'Разработка айдентики для фудбара',
    tags: ['digital'],
  },
  {
    cover: cover4,
    title: 'Белый кит',
    description:
      'Разработка айдентики и персонажей для новой детской стоматологии',
    tags: ['branding', 'digital'],
  },
  {
    cover: cover5,
    title: 'Ametis',
    description:
      'Разработка новой торговой марки для производителя керамического гранита',
    tags: ['design', 'campaign'],
  },
  {
    cover: cover6,
    title: 'Endorf',
    description:
      'Позиционирование, нейминг и дизайн упаковки новой торговой марки сыров',
    tags: ['design', 'digital'],
  },
  {
    cover: cover7,
    title: 'Горизонт',
    description: 'Брендинг жилого комплекса',
    tags: ['design', 'branding'],
  },
  {
    cover: cover8,
    title: 'Slastnik',
    description:
      'Разработка айдентики для производителя кондитерского инвентаря',
    tags: ['design'],
  },
];

export default {
  name: 'AllWorks',
  components: {
    WorkItem,
    PageFooter,
  },
  data() {
    return {
      works: [],
      total: null,
      currentFilter: this.$route.query.filter || null,

      isFilterLoading: false,
      isWorksLoading: false,
    };
  },
  computed: {
    tags() {
      return this.$store.state.staticData.collections.tags;
    },
    isLoadMoreVisible() {
      const { works, total } = this;
      return works.length < total;
    },
  },
  created() {
    this.fetchTags();
    this.fetchWorks();
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
    fetchWorks() {
      this.isWorksLoading = true;

      this.works = dummyWorks;
      this.total = 24;

      this.isWorksLoading = false;
    },
    loadMore() {
      this.isWorksLoading = true;
      this.works = [...this.works, ...dummyWorks];
      this.isWorksLoading = false;
    },
    setFilter(tag) {
      if (this.currentFilter !== tag) {
        this.currentFilter = tag;
        this.$router.push({ path: '/all-works', query: { filter: tag } });
        this.fetchWorks();
      }
    },
    resetFilter() {
      if (this.currentFilter !== null) {
        this.currentFilter = null;
        this.$router.push({ path: '/all-works' });
        this.fetchWorks();
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
