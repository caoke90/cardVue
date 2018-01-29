var fs = require('fs');
var path = require('path');
// console.log('process.cwd()', process.cwd());
function MakeFolder(folder) {
  try {
    if (!folder) return;
    folder = path.normalize(folder);
    var now = folder;
    while (now && !fs.existsSync(now)) {
      now = now.substr(0, now.lastIndexOf('/'));
      // console.log('now:', now);
    }
    if (now && now[now.length - 1] !== '/') now += '/';
    var append = folder.substr(now.length);
    var folders = append.split('/').filter(function (v) {
      return v.length > 0;
    });
    // console.log('folders:', folders);
    for (var i = 0; i < folders.length; i++) {
      now += folders[i] + '/';
      // console.log('mk-dir:', now);
      fs.mkdirSync(now);
    }
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

// const fs=require('fs')
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
process.chdir('../tingtest2');
MakeFolder("application/modules/Subject/views/h5/")
MakeFolder("application/modules/Admin/views/mobile/page/")

//card 编辑页
exec("cp ~/release_h5/cardVue/index.html ~/tingtest2/application/modules/Admin/views/mobile/page/h5edit.phtml")
exec("publish tingtest2 application/modules/Admin/views/mobile/page/h5edit.phtml")
//运营页
exec("cp ~/release_h5/cardVue/demo.html ~/tingtest2/application/modules/Subject/views/h5/index.phtml")
exec("publish tingtest2 application/modules/Subject/views/h5/index.phtml")


