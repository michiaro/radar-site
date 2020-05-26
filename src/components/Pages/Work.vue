<template>
  <div class="work-page">
    <div v-if="!isWorkLoading" class="work-page__inner">
      <div class="work-page__header-wrapper">
        <img
          v-if="!isVideo(work.header.path)"
          class="work-page__header work-page__header--image"
          :src="BASE_URL + work.header.path"
          :alt="work.title"
        />
        <video
          v-if="isVideo(work.header.path)"
          class="work-page__header work-page__header--video"
          :src="BASE_URL + work.header.path"
        />
      </div>

      <div class="container">
        <div class="row">
          <div class="col col-xs-2 col-md-4 col-xl-6">
            <h1 class="work-page__title">{{ work.title }}</h1>
          </div>
        </div>
        <div class="row">
          <div class="col col-xs-2 col-md-4 col-xl-6">
            <div
              class="work-page__about work-page__content"
              v-html="glueUpPrepositions(work.about)"
            />
          </div>
          <div class="col col-xs-2 col-sm-2 col-md-2 col-xl-3">
            <h2 class="work-page__subtitle">Задача</h2>
            <div
              class="work-page__task"
              v-html="glueUpPrepositions(work.task)"
            />
          </div>
          <div class="col col-xs-2 col-sm-2 col-md-2 col-xl-3">
            <h2 class="work-page__subtitle">Услуга</h2>
            <p
              v-for="(tag, index) in work.tags"
              :key="index"
              class="work-page__service"
            >
              {{ tag }}
            </p>
          </div>
        </div>

        <div class="row">
          <div
            v-for="(item, index) in work.layout"
            :key="index"
            class="col col-xs-2"
            :class="{ 'col-md-2': item.component === 'Text' }"
          >
            <component
              :is="getLayoutComponent(item.component)"
              :settings="item.settings"
            />
          </div>
        </div>

        <div class="row">
          <div class="col col-xs-2 col-md-1 col-xl-2">
            <h2 class="work-page__subtitle">
              Команда
            </h2>
          </div>
          <div
            v-for="(position, index) in work.credits"
            :key="index"
            class="col col-xs-1 col-md-1 col-xl-2"
          >
            <div class="work-page__position">
              {{ position.value.position }}
            </div>
            <div
              v-for="(teammate, teammateIndex) in position.value.staff"
              :key="teammateIndex"
              class="work-page__teammate"
            >
              {{ teammate.display }}
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col col-xs-2">
            <h2 class="work-page__next-work">
              Следующий проект
            </h2>
          </div>
        </div>
      </div>

      <div v-if="!isNextWorkLoading" class="work-page__cross-link cross-link">
        <div class="cross-link__wrapper">
          <img
            v-if="!isVideo(nextWork.header.path)"
            class="cross-link__cover cross-link__cover--image"
            :src="BASE_URL + nextWork.header.path"
            :alt="nextWork.title"
          />
          <video
            v-if="isVideo(nextWork.header.path)"
            class="cross-link__cover cross-link__cover--video"
            :src="BASE_URL + nextWork.header.path"
          />
        </div>
        <div class="cross-link__content">
          <div class="container">
            <div class="row">
              <div class="col col-xs-2">
                <div class="cross-link__title">
                  {{ nextWork.title }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCollectionByKey } from '@/api/index.js';
import { glueUpPrepositions, isVideo } from '@/utils/index.js';
import { BASE_URL } from '@/settings.js';

import TextContent from '@/components/work-components/TextContent.vue';
import PictureArray from '@/components/work-components/PictureArray.vue';
import Media from '@/components/work-components/Media.vue';

export default {
  name: 'Work',
  components: {
    TextContent,
    PictureArray,
    Media,
  },
  data() {
    return {
      isWorkLoading: false,
      isNextWorkLoading: true,
      currentWork: null,
      nextWork: null,
      BASE_URL,
    };
  },
  computed: {
    works() {
      return this.$store.state.works.content || null;
    },
    workSlug() {
      return this.$route.params.slug;
    },
    work() {
      const { works, workSlug, currentWork } = this;
      return works.find(({ slug }) => slug === workSlug) || currentWork || null;
    },
  },
  async created() {
    const { work } = this;
    // check if works in vuex are exist
    // load current work if needed
    // load next work

    if (work === null) {
      await this.fetchWork();
      this.fetchNextWork();
    } else {
      this.fetchNextWork();
    }
  },
  methods: {
    isVideo,
    glueUpPrepositions,
    async fetchWork() {
      const { workSlug } = this;
      this.isWorkLoading = true;

      const { data } = await getCollectionByKey({
        key: 'works',
        filter: {
          slug: workSlug,
        },
      });

      this.currentWork = data[0];

      this.isWorkLoading = false;
    },
    async fetchNextWork() {
      const { work } = this;
      this.isNextWorkLoading = true;

      const { data } = await getCollectionByKey({
        key: 'works',
        filter: {
          _o: work._o + 1,
        },
      });

      this.nextWork = data[0];

      this.isNextWorkLoading = false;
    },
    getLayoutComponent(layoutItem) {
      switch (layoutItem) {
        case 'Text':
          return TextContent;
        case 'PictureArray':
          return PictureArray;
        case 'Media':
          return Media;
      }
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/shared/_globals.scss';

.work-page {
  letter-spacing: $--letter-spacing;

  &__inner {
  }
  &__header-wrapper {
    height: 70vh;
    overflow: hidden;
    margin-bottom: 50px;
  }
  &__header {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
    &--image {
    }
    &--video {
    }
  }
  &__title {
    font-weight: normal;
    font-size: $--font-size-250;

    margin: 0;
    margin-bottom: 24px;
  }
  &__about {
    margin-bottom: 78px;
  }
  &__content {
    font-weight: normal;
    font-size: $--font-size-160;
    line-height: 1.25;

    p {
      margin: 0;
    }
    p + p {
      margin-top: 32px;
    }
  }
  &__subtitle {
  }
  &__task {
    font-size: $--font-size-80;
    line-height: 1.67;
    color: $--color-text--muted;
    margin: 0;
    margin-bottom: 24px;
  }
  &__subtitle {
  }
  &__service {
    font-size: $--font-size-80;
    line-height: 1.67;
    color: $--color-text--muted;
    margin: 0;
    text-transform: lowercase;

    &:last-of-type {
      margin-bottom: 24px;
    }
  }
  &__subtitle {
    font-weight: normal;
    font-size: $--font-size-120;
    margin: 0;
    margin-bottom: 12px;
  }
  &__position {
    font-size: $--font-size-80;
    color: $--color-text--muted;
  }
  &__teammate {
    font-size: $--font-size-80;
    margin: 12px 0 24px;
  }
  &__next-work {
    font-size: $--font-size-100;
    font-weight: normal;
    margin-top: 50px;

    @include from('lg') {
      margin-top: 100px;
    }
  }
  &__cross-link {
  }
}

.cross-link {
  position: relative;

  &__wrapper {
    height: 60vh;
    overflow: hidden;
  }
  &__cover {
    filter: brightness(0.8);
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: bottom;

    &--image {
    }
    &--video {
    }
  }
  &__content {
    position: absolute;
    top: 5%;
    left: 0;
  }
  &__title {
    font-weight: normal;
    font-size: $--font-size-250;
    @include from('lg') {
      font-size: $--font-size-360;
    }

    color: $--color-text--contrast;
  }
}
</style>
