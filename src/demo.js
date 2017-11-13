
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
      if(clientWidth >= 750) {
        docEl.style.fontSize = '100px';
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
Vue.component('card', require("./components/card.vue"));

//公用的ajax
import ajax from '@/common/ajax';
Vue.use(ajax);

Vue.use(require('./filters'));
import XImg  from 'vux/src/components/x-img'
Vue.component(XImg.name, XImg);
const app = new Vue({
  components: {
    XImg
  },
  name: 'App',

  render: h => h(require("./views/demo")),
  created(){

  }
}).$mount('#app');


