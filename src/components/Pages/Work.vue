<template>
  <div v-if="currentWork" class="work-page">
    <div v-if="!isWorkLoading" class="work-page__inner">
      <div class="work-page__header-wrapper">
        <img
          v-if="!isVideo(currentWork.header.path)"
          class="work-page__header work-page__header--image"
          :src="baseURL + currentWork.header.path"
          :alt="currentWork.title"
        />
        <video
          v-if="isVideo(currentWork.header.path)"
          class="work-page__header work-page__header--video"
          :src="baseURL + currentWork.header.path"
        />
      </div>

      <div class="container">
        <div class="row">
          <div class="col col-xs-2 col-md-4 col-xl-6">
            <h1 class="work-page__title">{{ currentWork.title }}</h1>
          </div>
        </div>
        <div class="row">
          <div class="col col-xs-2 col-md-4 col-xl-6">
            <div
              class="work-page__about work-page__content"
              v-html="glueUpPrepositions(currentWork.about)"
            />
          </div>
          <div class="col col-xs-2 col-sm-2 col-md-2 col-xl-3">
            <h2 class="work-page__subtitle">Задача</h2>
            <div
              class="work-page__task"
              v-html="glueUpPrepositions(currentWork.task)"
            />
          </div>
          <div class="col col-xs-2 col-sm-2 col-md-2 col-xl-3">
            <h2 class="work-page__subtitle">Клиент</h2>
            <router-link
              :to="{
                name: 'AllWorks',
                query: { client: currentWork.client.slug },
              }"
              class="work-page__client"
            >
              {{ currentWork.client.title }} —
            </router-link>
            <p class="work-page__client-about">
              {{ currentWork.clientAbout }}
            </p>
            <div v-if="tags" class="work-page__servces">
              <h2 class="work-page__subtitle">Услуга</h2>
              <router-link
                v-for="(tag, index) in currentWork.tags"
                :key="index"
                class="work-page__service"
                :to="{
                  name: 'AllWorks',
                  query: {
                    filter: getFilterTag(tag),
                  },
                }"
              >
                {{ tag }}
              </router-link>
            </div>
          </div>
        </div>

        <div class="row">
          <div
            v-for="(item, index) in currentWork.layout"
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
            v-for="(position, index) in currentWork.credits"
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
        <router-link
          v-if="!isNextWorkLoading"
          :to="`/all-works/${nextWork.slug}`"
          class="work-page__cross-link cross-link"
        >
          <div class="cross-link__wrapper">
            <img
              v-if="!isVideo(nextWork.header.path)"
              class="cross-link__cover cross-link__cover--image"
              :src="baseURL + nextWork.header.path"
              :alt="nextWork.title"
            />
            <video
              v-if="isVideo(nextWork.header.path)"
              class="cross-link__cover cross-link__cover--video"
              :src="baseURL + nextWork.header.path"
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
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { baseURL, getCollectionByKey } from '@/api/index.js';
import { glueUpPrepositions, isVideo } from '@/utils/index.js';
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
      baseURL,
      tags: null,
    };
  },
  computed: {
    workSlug() {
      return this.$route.params.slug;
    },
  },
  async created() {
    const { tags } = this;
    // check if works in vuex are exist
    // load current work if needed
    // load next work

    await this.fetchWork();
    this.fetchNextWork();

    if (!tags) {
      this.fetchTags();
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
        populate: 1,
      });

      this.currentWork = data[0];

      this.isWorkLoading = false;
    },
    async fetchNextWork() {
      const { currentWork } = this;
      this.isNextWorkLoading = true;

      const { data } = await getCollectionByKey({
        key: 'works',
        filter: {
          _o: currentWork._o + 1,
        },
      });

      this.nextWork = data[0];

      this.isNextWorkLoading = false;
    },
    async fetchTags() {
      const { data } = await getCollectionByKey({
        key: 'tags',
      });
      this.tags = data;
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
    getFilterTag(tagTitle) {
      const { tags } = this;
      return tags.find((tag) => tag.title === tagTitle).slug;
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
      margin-top: 1.7vmax;
    }
  }
  &__subtitle {
  }
  &__client,
  &__task,
  &__client-about {
    font-size: $--font-size-80;
    line-height: 1.67;
    color: $--color-text--muted;
    margin: 0;
    display: block;
  }
  &__task {
    margin-bottom: 1.25vmax;
  }
  &__client {
    &:hover {
      color: $--color-brand;
    }
  }
  &__client-about {
    margin-bottom: 3.25vmax;
  }
  &__subtitle {
  }
  &__service {
    font-size: $--font-size-80;
    line-height: 1.67;
    color: $--color-text--muted;
    margin: 0;
    text-transform: lowercase;
    display: block;

    &:last-of-type {
      margin-bottom: 1.25vmax;
    }

    &:hover {
      color: $--color-brand;
    }
  }
  &__subtitle {
    font-weight: normal;
    font-size: $--font-size-120;
    margin: 0;
    margin-bottom: 0.65vmax;
  }
  &__position {
    font-size: $--font-size-80;
    color: $--color-text--muted;
  }
  &__teammate {
    font-size: $--font-size-80;
    margin: 0.65vmax 0 1.25vmax;
  }
  &__next-work {
    font-size: $--font-size-100;
    font-weight: normal;
    margin-top: 5.5vmax;
  }
  &__cross-link {
  }
}

.cross-link {
  $cross-link: &;

  position: relative;
  display: block;

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
    transition: transform $--duration-2000 $--timing-in-out-cubic;

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
    transition: color $--duration-200 $--timing-in-out-cubic;
  }

  &:hover {
    #{$cross-link}__cover {
      transform: scale(1.1);
    }
    #{$cross-link}__title {
      color: $--color-brand;
    }
  }
}
</style>
