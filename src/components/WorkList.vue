<template>
  <div v-if="works.length" class="row">
    <div v-for="(work, index) in works" :key="work.slug" class="col col-xs-2 col-lg-2" :class="getColumnClass(index)">
      <appear :is-visible="getVisibility(index)" :counter-key="counterKey">
        <work-item v-observe-visibility="trackVisibility(index)" :work="work" />
      </appear>
    </div>
  </div>
</template>

<script>
import WorkItem from '@/components/WorkItem.vue';
import Appear from '@/components/Appear.vue';

export default {
  name: 'WorkList',
  components: {
    WorkItem,
    Appear,
  },
  props: {
    works: {
      type: Array,
      required: true,
    },
    counterKey: {
      type: String,
      default: 'page',
    },
    counterModifier: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      visibleWorks: {},
    };
  },
  computed: {
    animationCounter() {
      return this.$store.state.page.animationCounter[this.counterKey];
    },
  },
  methods: {
    getColumnClass(index) {
      switch (index % 8) {
        case 2:
        case 7:
          return 'col-xl-4';
        case 3:
        case 6:
          return 'col-xl-8';
        default:
          return 'col-xl-6';
      }
    },
    trackVisibility(index) {
      return (value) => {
        if (value) {
          // shallow copy для триггера реактивности
          this.visibleWorks = {
            ...this.visibleWorks,
            [index]: true,
          };
        }
      };
    },
    getVisibility(index) {
      return this.visibleWorks[index] === true && this.animationCounter >= index + this.counterModifier;
    },
    resetVisibility() {
      this.visibleWorks = {};
    },
  },
};
</script>
