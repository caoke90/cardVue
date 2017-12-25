//设置监听movieConfig事件
import Bus from '../marvel/bus';
import storage from '../utils/storage';
export default Bus;
//默认是微博浏览器打开
Bus.browser = "weibo";
Bus.movieConfig = {
  v: "7.9.0",
  a_n: "MovieSDK",
  from_type: "html",
};
if (storage.hasData('movieConfig')){
  Bus.movieConfig=storage.getData('movieConfig')
}
//触发movieConfig事件
const u = window.navigator.userAgent;
if (process.env.NODE_ENV == "development") {
  Bus.browser = '';
} else if (u.indexOf('Android') > -1) {
  function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
      callback(WebViewJavascriptBridge);
    } else {
      document.addEventListener('WebViewJavascriptBridgeReady',function () {
        callback(WebViewJavascriptBridge)
      },false);
    }
  }

  connectWebViewJavascriptBridge(function (bridge) {
    Bus.browserType="android";
    Bus.jsBridge=bridge;
    bridge.init(function (message, responseCallback) {
      var data = {
        'Javascript Responds': 'Wee!'
      };
      responseCallback(data);
    });

    bridge.callHandler("movieConfig", {}, function (params) {
      Bus.bridgeReady=true
      if (typeof params == "string") {
        Object.assign(Bus.movieConfig, JSON.parse(params));
      } else {
        Object.assign(Bus.movieConfig, params);
      }
      storage.setData("movieConfig",Bus.movieConfig)
      Bus.$emit("movieConfig", Bus.movieConfig);
    });
  })
} else if (u.match(/(ip[honead]+)(?:.*os\s([\w]+)*\slike\smac|;\sopera)/i) && u.match(/Weibo\s*\((.*?)\)/i)) {
  function bridgeReady() {
    Bus.browserType="ios";
    Bus.jsBridge=WeiboJSBridge;
    WeiboJSBridge.invoke("movieConfig", {}, function (params, success, code) {
      if (success) {
        Bus.bridgeReady=true
        if (typeof params == "string") {
          Object.assign(Bus.movieConfig, JSON.parse(params));
        } else {
          Object.assign(Bus.movieConfig, params);
        }
        storage.setData("movieConfig",Bus.movieConfig)
        Bus.$emit("movieConfig", Bus.movieConfig);
      }
    });
  }

  if (window.WeiboJSBridge) {
    bridgeReady();
  } else {
    document.addEventListener('WeiboJSBridgeReady', function () {
      bridgeReady();
    });
  }
}else{
  Bus.browser = '';
}
