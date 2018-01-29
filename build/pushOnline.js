
const fs=require('fs')
const child=require('child_process')
const exec = function (cmd) {
  var str=child.execSync(cmd)
  // console.log(str.toString())
  return str.toString();
};
exec("git pull origin")
process.chdir(__dirname+'/../../../release_h5');
exec("git checkout master")
exec("git clean -df")
exec("git reset --hard")
exec("git pull origin master")

var msg=exec("movieh5publish publish -version '' -msg 'pushOnline'")

console.log(msg.toString())
