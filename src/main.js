
/**
 * 主入口文件
 */
import 'es6-promise/auto';
import Vue from 'vue';

//750兼容方案
(function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
      var clientWidth = docEl.clientWidth;
      if(!clientWidth) return;
      if(clientWidth >= 375) {
        docEl.style.fontSize = '50px';
      } else {
        docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
      }
    };
  if(!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

import './common/base.css';

//公用的组件
Vue.component('card', require("./components/cardDev.vue"));

//公用的ajax
import ajax from '@/common/ajax';
Vue.use(ajax);
//查看大图
import './common/moviePic';
//引入字体
import '@/assets/font/font.css';
import '@/assets/font/sprite.css';

import 'vux/src/styles/1px.less';

Vue.component("mvImg", require('././marvel/components/img.vue'));
Vue.component("mvFile", require('././marvel/components/file.vue'));
Vue.component("mvPswp", require('././marvel/components/pswp.vue'));
Vue.use(require('./filters'));
const app = new Vue({
  name: 'App',

  components: {
    "router-view": require('./views/main.vue'),
    "mv-modal": {
      template:"<div><mv-file></mv-file><mv-pswp></mv-pswp></div>"
    },
  },
}).$mount('#app');


