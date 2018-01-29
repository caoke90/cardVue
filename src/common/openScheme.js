//设置监听openScheme事件,同时拦截a标签的跳转事件
import Bus from '../marvel/bus';
export default Bus;

//判断是否需要app唤起跳转，flag: 1是android，0是ios
function isUseJsbr(params, flag) {
  if((/^sinaweibo:\/\//.test(params) == false) && (/^moviesdk:\/\//.test(params) == false)) {
    return false;
  }
  var arr = Bus.movieConfig.v.split(".")
  if(arr[1].length == 1) {
    arr[1] = "0" + arr[1]
  }
  if(arr[2].length == 1) {
    arr[2] = "0" + arr[2]
  }
  var vNum = parseInt(arr.join(""));
  if(vNum >= 71002 && flag == 0) {
    return true;
  } else if(vNum >= 10204 && flag == 1) {
    return true;
  } else {
    return false;
  }
}
//设置监听openScheme事件,同时拦截a标签的跳转事件
Bus.$on("openScheme", function(url) {
  //如果是ios
  if(Bus.browserType=="ios"&&isUseJsbr(url, 0)) {
    Bus.jsBridge.invoke("movieScheme", {
      scheme: url
    }, function(params, success, code) {
      if(success) {
        // alert("log日志发送成功！");
      }
    });
  }
  //如果是android
  else if(Bus.browserType=="android"&&isUseJsbr(url, 1)){
    Bus.jsBridge.callHandler("movieScheme", {
      scheme: url
    }, function(params, success, code) {
      if(success) {
        // alert("log日志发送成功！");
      }
    });
  }else {
    console.log(url);
    //兼容低版本
    location.href = url;
  }
});

//拦截a标签的跳转事件
document.addEventListener("click", function(e) {
  if(e.target.nodeName == "A") {
    e.preventDefault();
    if(e.target.href){
      Bus.$emit("openScheme", e.target.href)
    }
  }
  return false;
}, false)
