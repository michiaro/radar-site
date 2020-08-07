<script>
export default {
  name: 'TransitionSequence',
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    delay: {
      type: Number,
      default: 200,
    },
    transitionName: {
      type: String,
      default: 'fade-up',
    },
    onNext: {
      type: Function,
      default: null,
    },
  },
  computed: {
    _isVisible() {
      return !this.isBlocked && this.isVisible;
    },
  },
  methods: {
    onEnter() {
      setTimeout(() => this.$emit('startNext'), this.delay);
    },
  },
  render(h) {
    return h(
      'transition',
      {
        props: {
          name: this.transitionName,
        },
        on: {
          enter: this.onEnter,
        },
      },
      [this._isVisible && this.$slots.default],
    );
  },
};
</script>

<style lang="scss">
@import '~@/styles/shared/_globals.scss';

.fade-enter-active,
.fade-up-enter-active,
.fade-down-enter-active {
  transition-duration: $--duration-2000, $--duration-2000;
}

.fade-leave-active,
.fade-up-leave-active,
.fade-down-leave-active {
  transition-duration: $--duration-500, $--duration-500;
}

.fade-leave-active,
.fade-enter-active,
.fade-up-leave-active,
.fade-up-enter-active,
.fade-down-leave-active,
.fade-down-enter-active {
  transition-timing-function: $--timing-in-out-spring, $--timing-in-out-spring;
  transition-property: opacity, transform;
}

.fade-enter {
  opacity: 0;
}

.fade-up-enter {
  opacity: 0;
  transform: translate(0, 3vmax);
}

.fade-down-enter {
  opacity: 0;
  transform: translate(0, -3vmax);
}

.fade-leave-to,
.fade-up-leave-to,
.fade-down-leave-to {
  opacity: 0;
}
</style>
