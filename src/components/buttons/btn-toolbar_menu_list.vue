<template>
<div class="toolbar_menu_list m-box-col m-box-center m-box-center-a" @click="listShow = !listShow">
  <span>
    <slot></slot>
    <i class="m-font m-font-bars" v-if="icon"></i><h4 v-if="btn.name" v-text="btn.name"></h4>
  </span>
  <transition name="list">
  <div class="m-pop m-pop-s" v-show="listShow">
    <ul>
      <li v-for="list in btn.params.menu_list">
        <buttons :btn="list"></buttons>
      </li>
    </ul>
  </div>
  </transition>
</div>
</template>
<style>
  .list-enter-active, .list-leave-active {
    transition: all .2s ease;
  }
  .list-enter, .list-leave-active {
    opacity: 0;
    transform:translateY(50%);
  }
  .toolbar_menu_list .box-right.m-btn-box{
    width: 100%;
    margin-left: 0;
  }
  .m-tab-bar .m-ctrl-box .m-diy-btn .toolbar_menu_list li h4{
    color: #333;
    font-size: 0.875rem;
  }
  .toolbar_menu_list.m-box-col{
    position: relative;
  }
  .toolbar_menu_list.m-box-center-a.m-box-center{
    position: relative;
  }
  .toolbar_menu_list .m-pop-s{
    bottom:125%;
    right:1%;
    width:98%;
  }
</style>
<script>
  export default{
    props: {
      btn: {
        type: Object
      },
      icon: {
        type: Boolean,
        default: true,
      }
    },
    created() {
      const self = this;
      document.body.addEventListener('touchstart', self.hideMenu);
    },
    data() {
      return {
        listShow: false,
      };
    },
    components: {
      buttons: require('./buttons.vue'),
    },
    methods: {
      hideMenu(e) {
        let p = e.target;
        while (this.$el !== p && document.body !== p) {
          p = p.parentNode;
        }
        if (p !== this.$el) {
          this.listShow = false;
        }
      }
    },
    destroyed() {
      const self = this;
      document.body.removeEventListener('touchstart', self.hideMenu);
    }
  };
</script>
