//设置监听openScheme事件,同时拦截a标签的跳转事件
import Bus from './movieConfig';
export default Bus;

//判断是否需要app唤起跳转，flag: 1是android，0是ios
function isUseJsbr( flag) {
  var arr = Bus.movieConfig.v.split(".")
  if(arr[1].length == 1) {
    arr[1] = "0" + arr[1]
  }
  if(arr[2].length == 1) {
    arr[2] = "0" + arr[2]
  }
  var vNum = parseInt(arr.join(""));
  if(vNum >= 71101 && flag == 0) {  //IOS
    return true;
  } else if(vNum >= 10206 && flag == 1) {   //安卓
    return true;
  } else {
    return false;
  }
}
//设置监听openScheme事件,同时拦截a标签的跳转事件
Bus.$on("moviePic", function(index, list) {
  var Picdata={
  	   "index":index,
  	   "fileList":list.map((data)=>data.src),
  	   "isFromFeed":true
  }
  //如果是ios
  if(Bus.browserType=="ios"&&isUseJsbr(0)) {
    Bus.jsBridge.invoke("moviePic", {
      "Picdata":Picdata
    }, function(params, success, code) {
      if(success) {
         //alert("IOS图片查看成功！");
      }
    });
  }
  //如果是android
  else if(Bus.browserType=="android"&&isUseJsbr(1)){
    Bus.jsBridge.callHandler("moviePic", {
      "Picdata":Picdata
    }, function(params, success, code) {
      if(success) {
        //alert("安卓图片查看成功！");
      }
    });
  }else {
    Bus.$emit('mvGallery', index, list);
  }
});

