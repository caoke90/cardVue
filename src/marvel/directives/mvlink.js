
module.exports = {
  bind: function (el, binding, vnode) {
    function touchHandler(ev) {
      ev.stopPropagation();
      // 过滤a,img,video标签
      // if (!ev.target.isSameNode(el)) {
      //   let p = ev.target;
      //   while (!p.isSameNode(el)) {
      //     if (['a', 'video', 'img'].indexOf(p.tagName.toLowerCase()) !== -1) {
      //       return;
      //     }
      //     p = p.parentNode;
      //   }
      // }
      if (!binding.value.scheme
        && !binding.value.actionlog
        && !binding.value.toLogin
        && !binding.value.callback
        && !el.getAttribute('callback')) {
        return;
      }
      el.classList.add('m-active');

      setTimeout(() => {
        el.classList.remove('m-active');
        if (binding.value.actionlog) {
          // 打码
          const actionlog = binding.value.actionlog;
          delete actionlog.uicode;
          try {
            actionlog.uicode = vnode.context.$route.meta.uicode;
          } catch (e) {
            // ..
          }

          vnode.context.$http.get('h5logs/actionLog', {
            params: actionlog
          });
        }
        if (binding.value.toLogin) {
          // TODO 登陆页
        } else {
          // 正常跳转。
          if (binding.value.callback) {
            binding.value.callback.call();
          } else if (el.getAttribute('callback')) {
            // 指定了回调函数,则执行之。
            const epr = el.getAttribute('callback').replace(/\(\)/g, '');
            vnode.context[epr].call();
          } else {
            if (binding.value.scheme) {
              window.location.href = binding.value.scheme;
            }
          }
        }
      }, 100);
    }
    el.addEventListener('click', touchHandler);
  }
};
