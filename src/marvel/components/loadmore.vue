<template>
  <div
    @mousedown="startDrag" @touchstart="startDrag"
    @mousemove="onDrag" @touchmove="onDrag"
    @mouseup="stopDrag" @touchend="stopDrag" @mouseleave="stopDrag"
    @transitionend="transitionEnd"
    :style="{transform:translate,transitionDuration:transition}">
    <div class="m-tips m-tips-tp">
      <div class="m-loading m-loading-dark" v-if='requesting'><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
      <i v-else class="m-font m-font-down m-font-down-ani" :class="{'up':dragging && dY > topDistance}"></i>
      <span class="main-link" v-text="status" v-if="showText"></span>
    </div>
    <slot></slot>
    <div style="position:fixed"></div><!-- 这个空标签是为了PC端chrome的一个难以言喻的bug，是关于下拉拖拽的，我也不知道为什么加上这个就好使了，如果删掉这个你啥事都没有，可能是这个bug已经被修复了，你就删掉它吧 -->
  </div>
</template>
<style>
  /** tip layer */
  .m-tips { font-size: 14px; text-align: center; height: 32px; line-height: 32px; position: relative; }

  .m-tips .m-font-arrow-right, .m-tips .m-font-close { position: absolute; right: 10px; top: 50%; transform: translate(0, -50%); color: #fff; font-size: 0.24rem; }

  .m-tips.m-tips-music { text-align: left; }

  .m-tips.m-tips-music .m-img-box { width: 0.32rem; vertical-align: top; }

  .m-tips.m-tips-music .main-link { font-size: 13px; margin: 0 0 0 12px; vertical-align: top; }

  .m-tips.m-tips-music .sub-link { font-size: 13px; opacity: 0.7; vertical-align: top; }

  .m-tips.m-tips-music .m-font-chart { font-size: 20px; vertical-align: top; margin: 0 0 0 9px; }

  .m-tips.m-tips-tp { font-size: 12px; }

  .m-tips.m-tips-tp .m-font { font-size: 18px; vertical-align: middle; }

  .m-tips.m-tips-tp .m-loading { vertical-align: middle; font-size: 9px; }

  .m-tips.m-tips-tp .main-link { margin: 0 0 0 11px; }

  .m-tips.m-tips-tps { font-size:11px; }

  .m-tips.m-tips-tps .m-font { vertical-align: top; margin: 0 5px 0 0; }
  .m-font-down-ani{
    transition: all .2s ease;
  }
  .m-font-down-ani.up{
    transform:rotate(180deg);
  }
  /** loading */
  .m-loading { font-size:16px; position: relative; display: inline-block; width: 2.3125em; height: 2.3125em; }

  .m-loading span { position: absolute; will-change: background-color; left: 1.10938em; bottom: 0; width: 0.09375em; height: 0.5em; border-radius: 0.25em; background-color: transparent; transform-origin: center -0.65625em; -webkit-backface-visibility: hidden; }

  .m-loading span:nth-child(1) { animation-delay: 0s; transform: rotate(0deg); }

  .m-loading span:nth-child(2) { animation-delay: 0.1s; transform: rotate(30deg); }

  .m-loading span:nth-child(3) { animation-delay: 0.2s; transform: rotate(60deg); }

  .m-loading span:nth-child(4) { animation-delay: 0.3s; transform: rotate(90deg); }

  .m-loading span:nth-child(5) { animation-delay: 0.4s; transform: rotate(120deg); }

  .m-loading span:nth-child(6) { animation-delay: 0.5s; transform: rotate(150deg); }

  .m-loading span:nth-child(7) { animation-delay: 0.6s; transform: rotate(180deg); }

  .m-loading span:nth-child(8) { animation-delay: 0.7s; transform: rotate(210deg); }

  .m-loading span:nth-child(9) { animation-delay: 0.8s; transform: rotate(240deg); }

  .m-loading span:nth-child(10) { animation-delay: 0.9s; transform: rotate(270deg); }

  .m-loading span:nth-child(11) { animation-delay: 1s; transform: rotate(300deg); }

  .m-loading span:nth-child(12) { animation-delay: 1.1s; transform: rotate(330deg); }

  .m-loading-dark span { animation: loading-fade-dark 1.1s infinite linear; }

  @keyframes loading-fade-dark { 0% { background-color: #5c5c5c; }
    100% { background-color: rgba(255, 255, 255, 0); } }

  .m-loading-light span { animation: loading-fade-light 1.1s infinite linear; }

  @keyframes loading-fade-light { 0% { background-color: #fff; }
    100% { background-color: rgba(255, 255, 255, 0); } }
</style>
<script>
  import Bus from '../bus';

  export default{
    name: 'loadmore',

    created() {
      this.$nextTick(() => {
        this.topBarHeight = this.$el.children[0].clientHeight;
      });
      Bus.$on('mvLoadEnd', () => {
        this.loadEnd();
      });
      Bus.$on('mvLoadStart', () => {
        document.body.scrollTop = 0;
        this.loadStart();
      });
    },

    props: {
      topDistance: {
        type: Number,
        default: 100
      },
      topPullText: {
        type: String,
        default: '下拉刷新'
      },
      topDropText: {
        type: String,
        default: '加载中...'
      },
      topLoadingText: {
        type: String,
        default: '释放更新'
      },
      showText: {
        type: Boolean,
        default: true
      },
      topMethod: {
        type: Function
      },
    },
    data() {
      return {
        topBarHeight: 0,
        requesting: false,
        dragging: false,
        startY: 0,
        dY: 0,
        reset: true,
      };
    },
    computed: {
      transition() {
        return (this.dragging || (this.dY === 0 && this.reset)) ? '0s' : '200ms';
      },
      translate() {
        const distance = 80 * Math.atan(this.dY / 200) - this.topBarHeight;
        return `translateY(${distance}px)`;
      },
      status() {
        if (this.dragging && this.dY > this.topDistance) {
          return this.topLoadingText;
        } else if (this.requesting) {
          return this.topDropText;
        }
        return this.topPullText;
      },
    },
    watch: {
      'requesting'(val) {
        if (!val) {
          this.dY = 0;
        }
      },
    },
    methods: {
      loadStart() {
        this.requesting = true;
        this.topMethod();
        this.dY = this.topDistance;
      },
      loadEnd() {
        this.requesting = false;
      },
      startDrag(e) {
        const TouchEvent = e.changedTouches ? e.changedTouches[0] : e;
        if (document.body.scrollTop <= 0) {
          this.startY = TouchEvent.pageY;
          this.dragging = true;
          this.reset = false;
        }
      },
      onDrag(e) {
        const TouchEvent = e.changedTouches ? e.changedTouches[0] : e;
        if (this.dragging && TouchEvent.pageY - this.startY > 0 && window.scrollY <= 0) {
          e.preventDefault();
          this.dY = TouchEvent.pageY - this.startY;
          if (this.requesting) {
            this.dY = this.dY + this.topDistance;
          }
        }
      },
      stopDrag() {
        this.dragging = false;
        if (this.dY > this.topDistance && window.scrollY <= 0) {
          this.loadStart();
        } else {
          this.dY = 0;
        }
      },
      transitionEnd() {
        if (this.dY === this.topDistance && !this.requesting) {
          this.dY = 0;
        }
        if (this.dY === 0) {
          this.reset = true;
        }
      },
    }
  };
</script>
