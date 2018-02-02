
/**
 * 主入口文件
 */
import 'es6-promise/auto';
import Vue from 'vue';

import './common/base.css';
import './common/750rem.css';

//公用的组件
Vue.component('card', require("./components/card.vue"));
//查看大图
import './common/moviePic';
//公用的ajax
import ajax from '@/common/ajax';
Vue.use(ajax);
//设置监听openScheme事件,同时拦截a标签的跳转事件
import  './common/openScheme';
//引入字体
import '@/assets/font/font.css';
import '@/assets/font/sprite.css';

import 'vux/src/styles/close.less';
import 'vux/src/styles/1px.less';


Vue.component("mvImg", require('././marvel/components/img.vue'));
Vue.component("mvFile", require('././marvel/components/file.vue'));
Vue.component("mvPswp", require('././marvel/components/pswp.vue'));
Vue.use(require('./filters'));
const app = new Vue({
  name: 'App',

  components: {
    "router-view": require('./views/demo.vue'),
    "mv-modal": {
      template:"<div><mv-file></mv-file><mv-pswp></mv-pswp></div>"
    },
  },
}).$mount('#app');


