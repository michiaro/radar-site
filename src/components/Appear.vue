<script>
import store from '@/store/index.js';

export default {
  name: 'Appear',
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    delay: {
      type: Number,
      default: 200,
    },
    isSilent: {
      type: Boolean,
      default: false,
    },
    onNext: {
      type: Function,
      default: null,
    },
    counterKey: {
      type: String,
      default: 'page',
    },
  },
  watch: {
    isVisible(next) {
      if (next) {
        if (this.onNext) {
          setTimeout(() => this.onNext(), this.delay);
        } else if (!this.isSilent) {
          setTimeout(
            () => store.commit('animateNext', { counterKey: this.counterKey }),
            this.delay,
          );
        }
      }
    },
  },
  render(h) {
    return h(
      'div',
      {
        class: {
          _ready: this.isVisible,
        },
      },
      [this.$slots.default],
    );
  },
};
</script>

<style lang="scss">
@import '~@/styles/shared/_globals.scss';

.appear {
  transition-duration: $--duration-2000, $--duration-2000;
  transition-timing-function: $--timing-in-out-spring, $--timing-in-out-spring;
  transition-property: opacity, transform;
  opacity: 0;
  @at-root ._ready & {
    opacity: 1;
  }

  &--up {
    transform: translate(0, 3vmax);
    @at-root ._ready & {
      transform: translate(0, 0);
    }
  }
  &--right {
    transform: translate(-3vmax, 0);
    @at-root ._ready & {
      transform: translate(0, 0);
    }
  }
  &--left {
    transform: translate(3vmax, 0);
    @at-root ._ready & {
      transform: translate(0, 0);
    }
  }

  &--duration-0 {
    transition-duration: $--duration-0;
  }
  &--duration-100 {
    transition-duration: $--duration-100;
  }
  &--duration-200 {
    transition-duration: $--duration-200;
  }
  &--duration-300 {
    transition-duration: $--duration-300;
  }
  &--duration-400 {
    transition-duration: $--duration-400;
  }
  &--duration-500 {
    transition-duration: $--duration-500;
  }
  &--duration-600 {
    transition-duration: $--duration-600;
  }
  &--duration-700 {
    transition-duration: $--duration-700;
  }
  &--duration-800 {
    transition-duration: $--duration-800;
  }
  &--duration-900 {
    transition-duration: $--duration-900;
  }
  &--duration-1000 {
    transition-duration: $--duration-1000;
  }
  &--duration-1500 {
    transition-duration: $--duration-1500;
  }
  &--duration-2000 {
    transition-duration: $--duration-2000;
  }
  &--duration-4000 {
    transition-duration: $--duration-4000;
  }

  &--delay-100 {
    transition-delay: $--delay-100;
  }
  &--delay-200 {
    transition-delay: $--delay-200;
  }
  &--delay-300 {
    transition-delay: $--delay-300;
  }
  &--delay-400 {
    transition-delay: $--delay-400;
  }
  &--delay-500 {
    transition-delay: $--delay-500;
  }
  &--delay-600 {
    transition-delay: $--delay-600;
  }
  &--delay-700 {
    transition-delay: $--delay-700;
  }
  &--delay-800 {
    transition-delay: $--delay-800;
  }
  &--delay-900 {
    transition-delay: $--delay-900;
  }
  &--delay-1000 {
    transition-delay: $--delay-1000;
  }
  &--delay-1500 {
    transition-delay: $--delay-1500;
  }
  &--delay-2000 {
    transition-delay: $--delay-2000;
  }
  &--delay-4000 {
    transition-delay: $--delay-4000;
  }
}
</style>
