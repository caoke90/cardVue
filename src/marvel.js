
/**
 * 主入口文件
 */
import 'es6-promise/auto';
import Vue from 'vue';

import '@/assets/js/ios';
import '@/assets/css/base.css';
//公用的组件
Vue.component('mv-modal', {
  template:'<div>' +
  '<mv-toast></mv-toast>' +
  '<mv-msgbox></mv-msgbox>' +
  '<mv-actionsheet></mv-actionsheet>' +
  '<mv-pswp></mv-pswp>' +
  '</div>'
});
Vue.component('mv-toast', require('@/marvel/components/toast.vue'));
Vue.component('mv-msgbox', require('@/marvel/components/msgbox.vue'));
Vue.component('mv-actionsheet', require('@/marvel/components/actionsheet.vue'));
Vue.component('mv-pswp', require('@/marvel/components/pswp.vue'));

import Marvel from './marvel';
Vue.use(Marvel);

import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(Mint);

//公用的组件
Vue.component('card', require("./components/cardDev.vue"));

//公用的ajax
import ajax from '@/common/ajax';
Vue.use(ajax);

const app = new Vue({

  name: 'App',
  components: {
    "router-view": require("./views/main")
  },
  created(){

  }
}).$mount('#app');


