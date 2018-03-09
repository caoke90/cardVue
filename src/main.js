
/**
 * 主入口文件
 */
import 'es6-promise/auto';
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, { size: 'small' });
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

//公用的ajax
import ajax from './common/ajax';
Vue.use(ajax);

//引入字体
import '@/assets/font/font.css';
import '@/assets/font/sprite.css';

//公用modal中的组件
import Bus from './marvel/bus';
Bus.modalComponent=[];
Bus.addModalComponent=function (model) {
  if(Bus.modalComponent.indexOf(model.name)==-1){
    Bus.modalComponent.push(model.name)
    Vue.component("mv-"+model.name, model);
  }

}
//公用的card
Vue.component('card', require("./components/admin/cardDev.vue"));
const component = require.context('./components/cards', false, /card(2|3|8|9|10|11|13|20|21|22|23|24|25|26|28|29|30|31|32|33)\.vue$/);
const requireAll = context => context.keys().map(context);
requireAll(component).forEach((card) => {
  const name = (card.name || /(\S+\/)(\S+)\.vue/.exec(item.hotID)[2]).toLowerCase();
  Vue.component(name, card);
});
Vue.component("mvImg", require('././marvel/components/img.vue'));

const app = new Vue({
  name: 'App',

  components: {
    "router-view": require('./views/main.vue'),
    "mv-modal": require('./marvel/components/modal.vue'),
  },
}).$mount('#app');


