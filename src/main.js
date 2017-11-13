
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

Vue.use(require('./filters'));
import mvImg  from './marvel/components/img.vue'
Vue.component(mvImg.name, mvImg);
const app = new Vue({

  name: 'App',

  render: h => h(require("./views/main")),
  created(){

  }
}).$mount('#app');


