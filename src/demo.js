
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

//引入字体
import '@/assets/font/font.css';
import '@/assets/font/sprite.css';

import 'vux/src/styles/close.less';
import 'vux/src/styles/1px.less';

import mvImg  from './marvel/components/img.vue'
Vue.component("mvImg", mvImg);
Vue.use(require('./filters'));
const app = new Vue({
  name: 'App',

  components: {
    "router-view": require('./views/demo.vue'),
    "mv-modal": require('./marvel/components/pswp.vue')
  },
}).$mount('#app');


