
const fs=require('fs')
const child=require('child_process')
const exec = function (cmd) {
  var str=child.execSync(cmd)
  // console.log(str.toString())
  return str.toString();
};
exec("git pull origin dev:dev")

process.chdir(__dirname+'/../../../release_h5');

exec("git clean -df")
exec("git reset --hard")
exec("git checkout master")
exec("git pull origin master")

var msg=exec("publishs3 movietest -msg 'pushTest' cardVue/")

console.log(msg)
//更新index文件
// process.chdir('../tingtest2');
// //首页
// exec("cp ~/release_h5/weiboh5/index.html ~/tingtest2/application/modules/Movieapp/views/homepage/index.phtml")
// exec("publish tingtest2 application/modules/Movieapp/views/homepage/index.phtml")
//
// //视频排行版
// exec("cp ~/release_h5/weiboh5/pm.html ~/tingtest2/application/modules/Movieapp/views/videopoll/index.phtml")
// exec("publish tingtest2 application/modules/Movieapp/views/videopoll/index.phtml")
