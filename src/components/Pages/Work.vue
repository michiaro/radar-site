<template>
  <div v-if="currentWork" class="work-page">
    <div v-if="!isWorkLoading" class="work-page__inner">
      <appear :is-visible="getVisibility(0)" :on-next="showNext">
        <div
          v-observe-visibility="trackVisibility(0)"
          class="work-page__header-wrapper appear appear--up appear--duration-2000"
        >
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
            autoplay="autoplay"
            loop="loop"
            muted="muted"
            playsinline
            preload="auto"
          />
        </div>
      </appear>
      <div class="container">
        <div class="row">
          <div class="col col-xs-2 col-md-4 col-xl-6">
            <appear :is-visible="getVisibility(1)" :on-next="showNext">
              <h1
                v-observe-visibility="trackVisibility(1)"
                class="work-page__title appear appear--up appear--duration-1000"
              >
                {{ currentWork.title }}
              </h1>
            </appear>
          </div>
        </div>
        <div class="row">
          <div class="col col-xs-2 col-md-4 col-xl-6">
            <appear :is-visible="getVisibility(2)" :on-next="showNext">
              <div
                v-observe-visibility="trackVisibility(2)"
                class="work-page__about work-page__content appear appear--up appear--duration-1000"
                v-html="glueUpPrepositions(currentWork.about)"
              />
            </appear>
          </div>
          <div class="col col-xs-2 col-sm-2 col-md-2 col-xl-3">
            <appear :is-visible="getVisibility(3)" :on-next="showNext">
              <div
                v-observe-visibility="trackVisibility(3)"
                class="appear appear--up appear--duration-1000"
              >
                <h2 class="work-page__subtitle">Задача</h2>
                <div
                  class="work-page__task"
                  v-html="glueUpPrepositions(currentWork.task)"
                />
                <div
                  v-if="currentWork.instagram"
                  class="work-page__social-link appear appear--up appear--duration-1000 appear--delay-200"
                >
                  <a :href="currentWork.instagram">Instagram</a>
                </div>
                <div
                  v-if="currentWork.vkontakte"
                  class="work-page__social-link appear appear--up appear--duration-1000 appear--delay-400"
                >
                  <a :href="currentWork.vkontakte">Vkontakte</a>
                </div>
                <div
                  v-if="currentWork.facebook"
                  class="work-page__social-link appear appear--up appear--duration-1000 appear--delay-600"
                >
                  <a :href="currentWork.facebook">Facebook</a>
                </div>
              </div>
            </appear>
          </div>
          <div class="col col-xs-2 col-sm-2 col-md-2 col-xl-3">
            <appear :is-visible="getVisibility(4)" :on-next="showNext">
              <div
                v-observe-visibility="trackVisibility(4)"
                class="appear appear--up appear--duration-1000"
              >
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
              </div>
            </appear>

            <appear :is-visible="animationCounter >= 5 && isTagsVisible">
              <div
                v-observe-visibility="tagsVisibiliryChanged"
                class="appear appear--up appear--duration-1000"
              >
                <div v-if="tags" class="work-page__servces">
                  <h2 class="work-page__subtitle">Услуга</h2>
                  <span
                    v-for="(tag, index) in currentWork.tags"
                    :key="index"
                    class="work-page__service"
                  >
                    <router-link
                      v-if="isTagInFilter(tag)"
                      :to="getFilterLinkPath(tag)"
                    >
                      {{ tag }}
                    </router-link>
                    <span v-else>
                      {{ tag }}
                    </span>
                  </span>
                </div>
              </div>
            </appear>
          </div>
        </div>

        <div class="row">
          <div
            v-for="(item, index) in currentWork.layout"
            :key="index"
            class="col col-xs-2"
            :class="{ 'col-md-2': item.component === 'Text' }"
          >
            <appear :is-visible="getVisibility(5 + index)" :on-next="showNext">
              <div
                v-observe-visibility="trackVisibility(5 + index)"
                class="appear appear--up appear--duration-1000"
              >
                <component
                  :is="getLayoutComponent(item.component)"
                  :settings="item.settings"
                />
              </div>
            </appear>
          </div>
        </div>

        <div class="row">
          <div class="col col-xs-2 col-md-1 col-xl-2">
            <appear
              :is-visible="getVisibility(5 + currentWorkLayoutLength)"
              :on-next="showNext"
            >
              <h2
                v-observe-visibility="
                  trackVisibility(5 + currentWorkLayoutLength)
                "
                class="work-page__subtitle work-page__subtitle--team appear appear--up appear--duration-1000"
              >
                Команда
              </h2>
            </appear>
          </div>
          <div
            v-for="(position, index) in currentWork.credits"
            :key="index"
            class="col col-xs-1 col-md-1 col-xl-2"
            :class="{ 'col-xl-offset-2': isFifthTeammate(index) }"
          >
            <appear
              :is-visible="getVisibility(6 + currentWorkLayoutLength + index)"
              :on-next="showNext"
            >
              <div
                v-observe-visibility="
                  trackVisibility(6 + currentWorkLayoutLength + index)
                "
                class="appear appear--up appear--duration-2000"
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
            </appear>
          </div>
        </div>

        <div class="row">
          <div class="col col-xs-2">
            <appear
              :is-visible="
                getVisibility(
                  6 + currentWorkLayoutLength + currentWorkCreditsLength,
                )
              "
              :on-next="showNext"
            >
              <div
                v-observe-visibility="
                  trackVisibility(
                    6 + currentWorkLayoutLength + currentWorkCreditsLength,
                  )
                "
                class="appear appear--up appear--duration-1000"
              >
                <h2 class="work-page__next-work">
                  Следующий проект
                </h2>
              </div>
            </appear>
          </div>
        </div>
      </div>

      <div v-if="!isNextWorkLoading" class="work-page__cross-link cross-link">
        <appear
          :is-visible="
            getVisibility(
              7 + currentWorkLayoutLength + currentWorkCreditsLength,
            )
          "
          :on-next="showNext"
        >
          <div
            v-observe-visibility="
              trackVisibility(
                7 + currentWorkLayoutLength + currentWorkCreditsLength,
              )
            "
            class="appear appear--up appear--duration-2000"
          >
            <router-link
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
        </appear>
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
import Appear from '@/components/Appear.vue';

export default {
  name: 'Work',
  components: {
    TextContent,
    PictureArray,
    Media,
    Appear,
  },
  data() {
    return {
      isWorkLoading: false,
      isNextWorkLoading: true,
      currentWork: null,
      nextWork: null,
      baseURL,
      tags: null,
      animationCounter: -1,
      visibleElements: {},
      isTagsVisible: false,
    };
  },
  computed: {
    workSlug() {
      return this.$route.params.slug;
    },
    currentWorkLayoutLength() {
      if (this.currentWork) {
        if (this.currentWork.layout) {
          return this.currentWork.layout.length;
        }
      }
      return 0;
    },
    currentWorkCreditsLength() {
      if (this.currentWork) {
        if (this.currentWork.credits) {
          return this.currentWork.credits.length;
        }
      }
      return 0;
    },
  },
  watch: {
    async workSlug() {
      await this.fetchWork();
      this.fetchNextWork();
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
      // запускаем анимацию
      this.$nextTick(() => {
        this.showNext();
      });
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
    isTagInFilter(tagTitle) {
      const { tags } = this;
      const tag = tags.find((tag) => tag.title === tagTitle);
      if (tag) {
        return true;
      }
      return false;
    },
    getFilterLinkPath(tagTitle) {
      const { tags } = this;
      const tag = tags.find((tag) => tag.title === tagTitle);
      let path = {
        name: 'AllWorks',
      };

      if (tag) {
        path = {
          ...path,
          query: {
            filter: tag.slug,
          },
        };
      }

      return path;
    },
    isFifthTeammate(index) {
      const order = Number(index) % 5;
      return order === 0 && index > 0;
    },

    showNext() {
      this.animationCounter++;
    },
    trackVisibility(index) {
      return (value) => {
        if (value) {
          // shallow copy для триггера реактивности
          this.visibleElements = {
            ...this.visibleElements,
            [index]: true,
          };
        }
      };
    },
    getVisibility(index) {
      return (
        this.visibleElements[index] === true && this.animationCounter >= index
      );
    },
    // теги может не быть, и они не должны влиять на флоу показа элементов
    tagsVisibiliryChanged(isVisible) {
      this.isTagsVisible = isVisible;
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
    margin-bottom: 28px;

    @include from('xl') {
    margin-bottom: 78px;

    }
  }
  &__content {
    font-weight: normal;
    line-height: 1.67;
    font-size: $--font-size-80;

    @include from('xl') {
    line-height: 1.25;
      font-size: $--font-size-160;
    }

    p {
      margin: 0;
    }
    p + p {
      margin-top: 1.7vmax;
    }
  }

  &__client,
  &__task,
  &__social-link,
  &__client-about {
    font-size: $--font-size-80;
    line-height: 1.67;
    color: $--color-text--muted;
    margin: 0;
    display: block;
  }
  &__client {
    &:hover {
      color: $--color-brand;
    }
  }
  &__client-about,
  &__task,
  &__social-link:last-of-type {
    margin-bottom: 3.25vmax;
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

    a {
      color: inherit;
    }

    span {
      color: $--color-text--muted;
    }
  }
  &__subtitle {
    font-weight: normal;
    font-size: $--font-size-120;
    margin: 0;
    margin-bottom: 0.65vmax;

    &--team {
      margin-bottom: 2vmax;

      @include from('xl') {
        margin-bottom: 0.65vmax;
      }
    }
  }
  &__position {
    font-size: $--font-size-80;
    color: $--color-text--muted;
  }
  &__teammate {
    font-size: $--font-size-80;
    margin: 0.65vmax 0;

    &:last-of-type {
      margin-bottom: 2vmax;
    }
  }
  &__next-work {
    font-size: $--font-size-100;
    font-weight: normal;
    margin-top: 5.5vmax;
  }
  &__cross-link {
    overflow: hidden;
  }
  &__social-link {
    a {
      color: inherit;
    }
    &:hover {
      color: $--color-brand;
    }
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
