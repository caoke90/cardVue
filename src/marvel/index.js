import VueTouch from './vue-touch';
module.exports.install = function (Vue) {
  /*
    所有在./components目录下的.vue组件自动注册
    以<mv-***></mv-***>为组件标签名，***是组件的.name，没有name的时候是组件的文件名
   */
  Vue.use(VueTouch);
  const requireAll = context => context.keys().map(context);

  const component = require.context('./components', false, /\.vue$/);

  requireAll(component).forEach((item) => {
    const name = (item.name || /(\S+\/)(\S+)\.vue/.exec(item.hotID)[2]).toLowerCase();
    Vue.component(`mv-${name}`, item);
  });

};

