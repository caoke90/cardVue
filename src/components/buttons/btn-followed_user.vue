<template>
<div class="toolbar_menu_list m-box-col m-box-center m-box-center-a" @click="listShow = !listShow">
  <span>
    <i class="m-font m-font-bars"></i>
    <h4 v-text="(userInfo && userInfo.follow_me) ? '互相关注':'已关注'"></h4>
  </span>
  <transition name="list">
  <div class="m-pop m-pop-s" v-show="listShow">
    <ul>
      <li @click="setFriendGroup(btn.params)">
        <div class="m-diy-btn m-box-col m-box-center m-box-center-a">
          <h4>设置分组</h4>
        </div>
      </li>
      <li @click="unfollow">
        <div class="m-diy-btn m-box-col m-box-center m-box-center-a">
          <h4>取消关注</h4>
        </div>
      </li>
    </ul>
  </div>
  </transition>
</div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Bus from '@/marvel/bus';
export default{
  props: ['btn'],
  created() {
    const self = this;
    document.body.addEventListener('touchstart', self.hideMenu);
  },
  data() {
    return {
      listShow: false,
    };
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  methods: {
    ...mapActions([
      'setFriendGroup',
    ]),
    hideMenu(e) {
      let p = e.target;
      while (this.$el !== p && document.body !== p) {
        p = p.parentNode;
      }
      if (p !== this.$el) {
        this.listShow = false;
      }
    },
    unfollow() {
      Bus.$emit('mvMsgbox', {
        title: '确定不再关注此人？',
        type: 'confirm',
      }, () => {
        this.$http.post('api/friendships/destory', this.btn.params).then((response) => {
          if (response.data && response.data.ok > 0) {
            this.$emit('changeSubType');
            Bus.$emit('mvMsgbox', false);
          } else {
            Bus.$emit('mvToast', {
              type: 'error',
              text: '取消关注失败'
            });
          }
        }).catch((err) => {
          console.error(err);
        });
      });
    }
  },
  components: {
    buttons: require('./buttons.vue'),
  },
  destroyed() {
    const self = this;
    document.body.removeEventListener('touchstart', self.hideMenu);
  }
};
</script>
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
    width:97%;
  }
</style>
