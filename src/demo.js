
/**
 * 主入口文件
 */
import 'es6-promise/auto';
import Vue from 'vue';

import './common/base.css';
import './common/750rem.css';

//公用的ajax
import ajax from './common/ajax';
Vue.use(ajax);
//设置监听openScheme事件,同时拦截a标签的跳转事件
import  './common/openScheme';
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
Vue.component('card', require("./components/card.vue"));
Vue.component("mvImg", require('././marvel/components/img.vue'));


const app = new Vue({
  name: 'App',

  components: {
    "router-view": require('./views/demo.vue'),
    "mv-modal": require('./marvel/components/modal.vue'),
  },
}).$mount('#app');


