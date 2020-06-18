<template>
  <div class="test">
    <transition-sequence :is-visible="step > 0" @startNext="startNext">
      <div class="test__pad">1</div>
    </transition-sequence>
    <transition-sequence :is-visible="step > 1" @startNext="startNext">
      <div class="test__pad">2</div>
    </transition-sequence>
    <transition-sequence :is-visible="step > 2" @startNext="startNext">
      <div class="test__pad">3</div>
    </transition-sequence>
  </div>
</template>

<script>
import TransitionSequence from '@/components/services/TransitionSequence.vue';

export default {
  name: 'Test',
  components: {
    TransitionSequence,
  },
  data() {
    return {
      step: 0,
    };
  },
  mounted() {
    this.startNext();
  },
  methods: {
    startNext() {
      this.step++;
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/shared/_globals.scss';
.test {
  display: flex;
  &__pad {
    width: 300px;
    height: 300px;
    margin-right: 30px;
    background: #000;
    font-size: 90px;
    color: white;
  }
}
</style>
