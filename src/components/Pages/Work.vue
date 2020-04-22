<template>
  <h1>Work</h1>
  <!-- .wrapper(v-if="isReady")
    .block
      .work-top-block(
        :style="{'backgroundImage': 'url(https://radar-online.ru' +content.works[workIndex].header.path+')'}"
      )
      .content.work-top-block__content 
        .slider-content
          h1.slider-content__title(
            :class=" { 'dark' : content.works[workIndex].isInverse }"
          ) {{ content.works[workIndex].title}}
          p.slider-content__text(
            :class=" { 'dark' : content.works[workIndex].isInverse }"
          ) {{ content.works[workIndex].prescription}}
        .work-top-block__socials
          a.work-top-block__social-link.work-top-block__social-link--insta(
            v-if="content.works[workIndex].instagram",
            :href="content.works[workIndex].instagram",
            target="_blank"
          )
            svg(
              width="30",
              height="30",
              viewBox="0 0 30 30",
              fill="none",
              xmlns="http://www.w3.org/2000/svg"
            )
              path(
                :fill="content.works[workIndex].socialsColor",
                d="M22.6034 5.14745C21.6267 5.14745 20.8349 5.94622 20.8349 6.93163C20.8349 7.917 21.6267 8.71578 22.6034 8.71578C23.5801 8.71578 24.3718 7.917 24.3718 6.93163C24.3718 5.94622 23.5801 5.14745 22.6034 5.14745ZM14.7368 9.91226C17.4498 9.91226 19.6492 12.1312 19.6492 14.8684C19.6492 17.6056 17.4498 19.8246 14.7368 19.8246C12.0239 19.8246 9.82448 17.6056 9.82448 14.8684C9.82448 12.1312 12.0239 9.91226 14.7368 9.91226ZM14.7368 7.23326C10.5574 7.23326 7.16922 10.6516 7.16922 14.8684C7.16922 19.0852 10.5574 22.5035 14.7368 22.5035C18.9162 22.5035 22.3043 19.0852 22.3043 14.8684C22.3043 10.6516 18.9162 7.23326 14.7368 7.23326ZM14.7368 2.67899C18.6717 2.67899 19.1378 2.6941 20.6917 2.76563C22.1286 2.83179 22.9088 3.07402 23.4282 3.27763C24.116 3.54736 24.607 3.86955 25.1227 4.38981C25.6383 4.91013 25.9576 5.40543 26.2251 6.09945C26.4268 6.62335 26.6669 7.41065 26.7325 8.8603C26.8033 10.4281 26.8184 10.8984 26.8184 14.8684C26.8184 18.8384 26.8033 19.3087 26.7325 20.8765C26.6669 22.3262 26.4268 23.1135 26.2251 23.6374C25.9576 24.3314 25.6383 24.8267 25.1227 25.347C24.607 25.8673 24.116 26.1895 23.4282 26.4592C22.9088 26.6628 22.1286 26.905 20.6917 26.9712C19.138 27.0427 18.672 27.0578 14.7368 27.0578C10.8016 27.0578 10.3356 27.0427 8.78191 26.9712C7.34504 26.905 6.56472 26.6628 6.04542 26.4592C5.3576 26.1895 4.86663 25.8673 4.35097 25.347C3.8353 24.8267 3.5159 24.3314 3.24857 23.6374C3.04681 23.1135 2.80674 22.3262 2.74116 20.8765C2.67026 19.3087 2.65528 18.8384 2.65528 14.8684C2.65528 10.8984 2.67026 10.4281 2.74116 8.8603C2.80674 7.41065 3.04681 6.62335 3.24857 6.09945C3.5159 5.40543 3.8353 4.91013 4.35097 4.38987C4.86663 3.86955 5.3576 3.54736 6.04542 3.27763C6.56472 3.07402 7.34504 2.83179 8.78185 2.76563C10.3358 2.6941 10.8019 2.67899 14.7368 2.67899ZM14.7368 0C10.7346 0 10.2327 0.0171159 8.66087 0.089475C7.09226 0.161656 6.02102 0.413024 5.08359 0.7806C4.11457 1.16052 3.29268 1.66892 2.47341 2.4955C1.65409 3.32213 1.15025 4.15131 0.773635 5.12898C0.40931 6.07478 0.160226 7.15559 0.0886246 8.73822C0.0169059 10.324 0 10.8303 0 14.8684C0 18.9065 0.0169059 19.4128 0.0886246 20.9986C0.160226 22.5812 0.40931 23.662 0.773635 24.6078C1.15025 25.5855 1.65409 26.4147 2.47341 27.2413C3.29268 28.0679 4.11457 28.5762 5.08359 28.9563C6.02102 29.3238 7.09226 29.5752 8.66087 29.6474C10.2327 29.7197 10.7346 29.7368 14.7368 29.7368C18.7391 29.7368 19.241 29.7197 20.8128 29.6474C22.3814 29.5752 23.4526 29.3238 24.3901 28.9563C25.3591 28.5762 26.1809 28.0679 27.0002 27.2413C27.8195 26.4147 28.3234 25.5856 28.7 24.6078C29.0643 23.662 29.3135 22.5812 29.385 20.9986C29.4567 19.4128 29.4737 18.9065 29.4737 14.8684C29.4737 10.8304 29.4567 10.324 29.385 8.73822C29.3135 7.15559 29.0643 6.07478 28.7 5.12898C28.3234 4.15131 27.8195 3.32213 27.0002 2.4955C26.1809 1.66892 25.3591 1.16052 24.3901 0.7806C23.4526 0.413024 22.3814 0.161656 20.8128 0.089475C19.241 0.0171159 18.7391 0 14.7368 0Z"
              )
          a.work-top-block__social-link.work-top-block__social-link--fb(
            v-if="content.works[workIndex].facebook",
            :href="content.works[workIndex].facebook",
            target="_blank"
          )
            svg(
              width="30",
              height="30",
              viewBox="0 0 30 30",
              fill="none",
              xmlns="http://www.w3.org/2000/svg"
            )
              path(
                fill-rule="evenodd",
                clip-rule="evenodd",
                :fill="content.works[workIndex].socialsColor",
                d="M21.8115 18.6093L22.2416 15.2731H18.938V13.1482C18.938 12.1846 19.2056 11.528 20.5875 11.528L22.3388 11.5273V8.55216C22.034 8.51166 20.9886 8.42114 19.7722 8.42114C17.2328 8.42114 15.4942 9.97123 15.4942 12.818V15.2731H12.6316V18.6093H15.4942V27.1327H18.938V18.6093H21.8115Z"
              )
              path(
                :fill="content.works[workIndex].socialsColor",
                d="M13.9879 2.67899C17.7229 2.67899 19.663 2.6941 21.138 2.76563C22.5018 2.83179 23.2425 3.07402 23.7353 3.27763C24.3883 3.54736 24.8543 3.86955 25.3438 4.38981C25.8333 4.91013 26.1363 5.40543 26.3902 6.09945C26.5816 6.62335 26.8095 7.41065 26.8718 8.8603C26.939 10.4281 26.9533 10.8984 26.9533 14.8684C26.9533 18.8384 26.939 19.3087 26.8718 20.8765C26.8095 22.3262 26.5816 23.1135 26.3902 23.6374C26.1363 24.3314 25.8333 24.8267 25.3438 25.347C24.8543 25.8673 24.3883 26.1895 23.7353 26.4592C23.2425 26.6628 22.5018 26.905 21.138 26.9712C19.6633 27.0427 17.7232 27.0578 13.9879 27.0578C10.2527 27.0578 9.81033 27.0427 8.33563 26.9712C6.9718 26.905 6.23109 26.6628 5.73819 26.4592C5.08533 26.1895 4.61931 25.8673 4.12985 25.347C3.6404 24.8267 3.33723 24.3314 3.08348 23.6374C2.89197 23.1135 2.6641 22.3262 2.60185 20.8765C2.53456 19.3087 2.52035 18.8384 2.52035 14.8684C2.52035 10.8984 2.53456 10.4281 2.60185 8.8603C2.6641 7.41065 2.89197 6.62335 3.08348 6.09945C3.33723 5.40543 3.6404 4.91013 4.12985 4.38987C4.61931 3.86955 5.08533 3.54736 5.73819 3.27763C6.23109 3.07402 6.9718 2.83179 8.33557 2.76563C9.81059 2.6941 10.253 2.67899 13.9879 2.67899ZM13.9879 0C10.189 0 9.71263 0.0171159 8.22072 0.089475C6.7318 0.161656 5.71504 0.413024 4.82525 0.7806C3.90547 1.16052 3.12535 1.66892 2.34772 2.4955C1.57003 3.32213 1.09179 4.15131 0.734322 5.12898C0.38851 6.07478 0.152084 7.15559 0.0841207 8.73822C0.0160468 10.324 0 10.8303 0 14.8684C0 18.9065 0.0160468 19.4128 0.0841207 20.9986C0.152084 22.5812 0.38851 23.662 0.734322 24.6078C1.09179 25.5855 1.57003 26.4147 2.34772 27.2413C3.12535 28.0679 3.90547 28.5762 4.82525 28.9563C5.71504 29.3238 6.7318 29.5752 8.22072 29.6474C9.71263 29.7197 10.189 29.7368 13.9879 29.7368C17.7868 29.7368 19.7609 29.7197 21.2529 29.6474C22.7418 29.5752 23.7586 29.3238 24.6484 28.9563C25.5682 28.5762 26.3483 28.0679 27.1259 27.2413C27.9036 26.4147 28.3818 25.5856 28.7393 24.6078C29.0851 23.662 29.3216 22.5812 29.3895 20.9986C29.4576 19.4128 29.4737 18.9065 29.4737 14.8684C29.4737 10.8304 29.4576 10.324 29.3895 8.73822C29.3216 7.15559 29.0851 6.07478 28.7393 5.12898C28.3818 4.15131 27.9036 3.32213 27.1259 2.4955C26.3483 1.66892 25.5682 1.16052 24.6484 0.7806C23.7586 0.413024 22.7418 0.161656 21.2529 0.089475C19.7609 0.0171159 17.7868 0 13.9879 0Z"
              )
          a.work-top-block__social-link.work-top-block__social-link--vk(
            v-if="content.works[workIndex].vkontakte",
            :href="content.works[workIndex].vkontakte",
            target="_blank"
          )
            svg(
              width="30",
              height="30",
              viewBox="0 0 30 30",
              fill="none",
              xmlns="http://www.w3.org/2000/svg"
            )
              path(
                :fill="content.works[workIndex].socialsColor",
                d="M23.4321 21.0162H21.0411C20.2603 21.0162 20.1627 20.4417 18.7313 19.0625C17.5239 17.8605 17.0071 17.7655 16.7143 17.7655C16.4541 17.7655 16.2752 17.9625 16.2752 18.4222V20.261C16.2752 20.8029 15.9662 21.0162 14.6974 21.0162C12.6154 21.0162 10.3056 19.7193 8.54892 17.3223C5.93007 13.7596 5.26318 11.0998 5.26318 10.5253C5.26318 10.2133 5.49094 10 5.8 10H7.93079C8.48383 10 8.69527 10.1642 8.89046 10.7552C9.86644 13.6447 11.6069 16.1894 12.3388 16.1894C12.6154 16.1894 12.6479 15.9596 12.6479 15.3685V12.4297C12.6479 11.0054 11.8509 10.8868 11.8509 10.3611C11.8509 10.1527 12.0135 10 12.2738 10H15.6896C16.145 10 16.2101 10.1642 16.2101 10.7223V14.7118C16.2101 15.1671 16.3026 15.3357 16.5029 15.3357C16.7512 15.3357 16.98 15.1838 17.43 14.679C18.8317 13.1178 19.9838 10.6402 19.9838 10.6402C20.1302 10.3282 20.3091 10.1148 20.7971 10.1148H22.9279C23.3509 10.1148 23.5298 10.3447 23.4485 10.7552C23.2044 11.9043 20.7483 15.4014 20.7483 15.4014C20.5205 15.7625 20.423 15.9596 20.7483 16.3043C20.976 16.5999 21.6917 17.2402 22.1309 17.8312C23.2044 18.9804 23.9039 19.949 23.9039 20.4909"
              )
              path(
                :fill="content.works[workIndex].socialsColor",
                d="M13.9879 2.67899C17.7229 2.67899 19.663 2.6941 21.138 2.76563C22.5018 2.83179 23.2425 3.07402 23.7353 3.27763C24.3883 3.54736 24.8543 3.86955 25.3438 4.38981C25.8333 4.91013 26.1363 5.40543 26.3902 6.09945C26.5816 6.62335 26.8095 7.41065 26.8718 8.8603C26.939 10.4281 26.9533 10.8984 26.9533 14.8684C26.9533 18.8384 26.939 19.3087 26.8718 20.8765C26.8095 22.3262 26.5816 23.1135 26.3902 23.6374C26.1363 24.3314 25.8333 24.8267 25.3438 25.347C24.8543 25.8673 24.3883 26.1895 23.7353 26.4592C23.2425 26.6628 22.5018 26.905 21.138 26.9712C19.6633 27.0427 17.7232 27.0578 13.9879 27.0578C10.2527 27.0578 9.81033 27.0427 8.33563 26.9712C6.9718 26.905 6.23109 26.6628 5.73819 26.4592C5.08533 26.1895 4.61931 25.8673 4.12985 25.347C3.6404 24.8267 3.33723 24.3314 3.08348 23.6374C2.89197 23.1135 2.6641 22.3262 2.60185 20.8765C2.53456 19.3087 2.52035 18.8384 2.52035 14.8684C2.52035 10.8984 2.53456 10.4281 2.60185 8.8603C2.6641 7.41065 2.89197 6.62335 3.08348 6.09945C3.33723 5.40543 3.6404 4.91013 4.12985 4.38987C4.61931 3.86955 5.08533 3.54736 5.73819 3.27763C6.23109 3.07402 6.9718 2.83179 8.33557 2.76563C9.81059 2.6941 10.253 2.67899 13.9879 2.67899ZM13.9879 0C10.189 0 9.71263 0.0171159 8.22072 0.089475C6.7318 0.161656 5.71504 0.413024 4.82525 0.7806C3.90547 1.16052 3.12535 1.66892 2.34772 2.4955C1.57003 3.32213 1.09179 4.15131 0.734322 5.12898C0.38851 6.07478 0.152084 7.15559 0.0841207 8.73822C0.0160468 10.324 0 10.8303 0 14.8684C0 18.9065 0.0160468 19.4128 0.0841207 20.9986C0.152084 22.5812 0.38851 23.662 0.734322 24.6078C1.09179 25.5855 1.57003 26.4147 2.34772 27.2413C3.12535 28.0679 3.90547 28.5762 4.82525 28.9563C5.71504 29.3238 6.7318 29.5752 8.22072 29.6474C9.71263 29.7197 10.189 29.7368 13.9879 29.7368C17.7868 29.7368 19.7609 29.7197 21.2529 29.6474C22.7418 29.5752 23.7586 29.3238 24.6484 28.9563C25.5682 28.5762 26.3483 28.0679 27.1259 27.2413C27.9036 26.4147 28.3818 25.5856 28.7393 24.6078C29.0851 23.662 29.3216 22.5812 29.3895 20.9986C29.4576 19.4128 29.4737 18.9065 29.4737 14.8684C29.4737 10.8304 29.4576 10.324 29.3895 8.73822C29.3216 7.15559 29.0851 6.07478 28.7393 5.12898C28.3818 4.15131 27.9036 3.32213 27.1259 2.4955C26.3483 1.66892 25.5682 1.16052 24.6484 0.7806C23.7586 0.413024 22.7418 0.161656 21.2529 0.089475C19.7609 0.0171159 17.7868 0 13.9879 0Z"
              )
        .work-top-block__timing(
          :class=" { 'dark' : content.works[workIndex].isInverse }",
          v-if="content.works[workIndex].dates"
        ) {{ content.works[workIndex].dates }}
    .block.work-zone-block
      .content.work-zone__content
        .work-zone__text-block(
          :class=" { 'full' : fulltext }"
        )
          div(
            v-html="content.works[workIndex].about",
          )
          span.work-zone__text-block-readmore(
            v-show="!fulltext",
            @click="toggleText"
            ) Читать далее
          span.work-zone__text-block-readmore.work-zone__text-block-readmore--hide(
            v-show="fulltext",
            @click="toggleText"
            ) Скрыть
        .work-zone__slider
          img(
            :src="'https://radar-online.ru'+content.works[workIndex].logo.path", :alt="content.works[workIndex].title+ ' Логотип проекта'"
          )
        component(
          v-for="(layout, layoutIndex) in content.works[workIndex].layout",
          :settings="layout.settings",
          :is="layout.component",
          :key="content.works[workIndex]._id + layoutIndex",
        )
        .work-zone__low-part
          .who-did-it
            span.who-did-it__text
              .who-did-it__person(v-for="member in content.works[workIndex].credits") 
                span.who-did-it__position {{ member.value.position }}
                span.who-did-it__name(
                  v-for="name in member.value.staff",
                  @click="setTeamFilter(name._id)"
                ) {{ name.display }}
          .share-block
            .tags
              span.tags__link(
                v-for="tag in content.works[workIndex].tags",
                :key="tag._id",
                @click="setFilter(tag._id)"
              ) {{ '#'+workTags(tag._id) }} 
            .share-block__social Поделиться:
              social-sharing(
                :url="'https://radar-online.ru' +this.$route.fullPath",
                :title="'Radar Advertising, ' + content.works[workIndex].title",
                :description="'Radar Advertising, ' + content.works[workIndex].prescription",
                :hashtags="workHashtags",
                :media="'https://radar-online.ru' +content.works[workIndex].logo.path",
                inline-template
              )
                div
                  network(network="facebook")
                    i.icon.icon--facebook 
                  network(network="twitter")
                    i.icon.icon--twitter 
                  network(network="vk")
                    i.icon.icon--vk 
    .block.company-description-block
      .content.company-description-content
        .company-description__img
          img(
            v-if="clientsIsReady",
            :src="'https://radar-online.ru'+clientLogo(content.works[workIndex].client._id)",
            :alt="content.works[workIndex].client.display+ 'Логотип'",
            @click="setClientFilter(content.works[workIndex].client._id)"
          )
        p.company-description__text(
          v-html="content.works[workIndex].clientAbout"
        ) 
    div.next-work(
      v-if="nextWork > -1",
      @click="toNextWork(content.works[nextWork])"
    )
      .next-work__cover(
        :style="{'backgroundImage': 'url(https://radar-online.ru' +content.works[nextWork].header.path+')'}"
      ) 
      .content.next-work__content(
        :class=" { 'dark' : content.works[nextWork].isInverse }"
      )
        .next-work__title Следующий проект
          .next-work__arrow(
            :class=" { 'next-work__arrow--dark' : content.works[nextWork].isInverse }"
          )
        div
          .next-work__content_title {{ content.works[nextWork].title }}
          p.next-work__content_text {{ content.works[nextWork].prescription}} -->
</template>

<script>
// import api from "../../api/";
// import Picture from "../work-components/Picture.vue";
// import Slider from "../work-components/Slider.vue";
// import Video from "../work-components/Video.vue";
// import Audio from "../work-components/Audio.vue";
// import Col_1_3_2_3 from "../work-components/Col_1_3_2_3.vue";
// import Col_2_3_1_3 from "../work-components/Col_2_3_1_3.vue";
// import Cols_1_2 from "../work-components/Cols_1_2.vue";

export default {
  name: "Work",
  components: {
    // Picture,
    // Slider,
    // Video,
    // Audio,
    // Col_1_3_2_3,
    // Col_2_3_1_3,
    // Cols_1_2
  },
  data() {
    return {
    //   content: {
    //     works: [],
    //     team: [],
    //     tags: [],
    //     clients: []
    //   },
    //   fulltext: false,
    //   isReady: false,
    //   clientsIsReady: false
    };
  },
  // computed: {
  //   workIndex() {
  //     const myWorks = this.content.works;
  //     var workSlug = this.$route.params.slug;

  //     for (var i = 0; i < myWorks.length; i += 1) {
  //       if (myWorks[i].slug == workSlug) {
  //         return i;
  //       }
  //     }
  //     return -1;
  //   },
  //   nextWork() {
  //     const myWorks = this.content.works;
  //     var workSlug = this.$route.params.slug;

  //     for (var i = 0; i < myWorks.length - 1; i += 1) {
  //       if (myWorks[i].slug == workSlug) {
  //         return myWorks[i + 1].isPublished ? i + 1 : i + 2;
  //       }
  //     }
  //     return -1;
  //   },
  //   workHashtags() {
  //     var tagsArray = this.content.works[this.workIndex].tags.map(
  //       tag => tag.display
  //     );
  //     return tagsArray.join(", ");
  //   }
  // },
  // methods: {
  //   toggleText() {
  //     this.fulltext = !this.fulltext;
  //   },
  //   workTags(id) {
  //     var myTags = this.content.tags;

  //     for (var i = 0; i < myTags.length; i += 1) {
  //       if (myTags[i]._id == id) {
  //         return myTags[i].slug;
  //       }
  //     }
  //     return -1;
  //   },
  //   setFilter(id) {
  //     var currentTag = this.content.tags.find(tag => tag._id === id);
  //     this.$router.push({
  //       path: "/all-works",
  //       query: { filter: currentTag.slug }
  //     });
  //   },
  //   clientLogo(id) {
  //     var currentClient = this.content.clients.find(
  //       client => client._id === id
  //     );
  //     if (currentClient.logo) return currentClient.logo.path;
  //     return null;
  //   },
  //   setClientFilter(id) {
  //     var clientWorks = this.content.works.filter(
  //       work => work.client._id == id
  //     );
  //     var currentClient = this.content.clients.find(
  //       client => client._id === id
  //     );
  //     if (clientWorks.length > 1) {
  //       this.$router.push({
  //         path: "/all-works",
  //         query: { client: currentClient.slug }
  //       });
  //     } else {
  //       this.$router.push({
  //         path: "/" + clientWorks[0].slug
  //       });
  //       window.scrollTo(0, 0);
  //     }
  //   },
  //   setTeamFilter(id) {
  //     var currentMember = this.content.team.find(member => member._id === id);
  //     this.$router.push({
  //       path: "/all-works",
  //       query: { team: currentMember.slug }
  //     });
  //   },
  //   toNextWork(work) {
  //     this.$router.push({
  //       path: "/" + work.slug
  //     });
  //     document.title = "Radar Advertising, " + work.title;
  //   }
  // },
  // mounted() {
  //   this.$nextTick(() => {
  //     api.getCollectionByKey("works").then(works => {
  //       this.content.works = works;
  //       this.isReady = true;
  //     });

  //     api.getCollectionByKey("team").then(team => {
  //       this.content.team = team;
  //     });

  //     api.getCollectionByKey("tags").then(tags => {
  //       this.content.tags = tags;
  //     });

  //     api.getCollectionByKey("clients").then(clients => {
  //       this.content.clients = clients;
  //       this.clientsIsReady = true;
  //     });
  //   });
  // }
};
</script>

<style lang="scss">
// @import "../../styles/work.scss";
</style>
