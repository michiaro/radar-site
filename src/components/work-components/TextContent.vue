<template>
  <div class="work-content" v-html="glueUpPrepositions(settings.content)" />
</template>

<script>
import { glueUpPrepositions } from '@/utils/index.js';

export default {
  name: 'TextContent',
  props: {
    settings: {
      type: Object,
      required: true,
    },
  },
  methods: {
    glueUpPrepositions,
  },
};
</script>

<style lang="scss">
@import '~@/styles/shared/_globals.scss';

.work-content {
  font-weight: normal;
  font-size: $--font-size-160;
  line-height: 1.25;

  margin: 4vmax 0 5.5vmax;

  p {
    margin: 0;
  }
  p + p {
    margin-top: 1.7vmax;
  }
}
</style>
