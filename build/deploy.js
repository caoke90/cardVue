const fs=require("fs")
const path=require("path")
const child=require('child_process')
//将git branch -a转换成json数据
function branchToJSON(log){

    var branchJSON={
        cur:"",
        localArr:[],
        remotesArr:[]
    }
    log.replace(/[*\w][^\n]+(?=\n)/g,function(m,p1,p2){
        if(m.indexOf("* ")>-1){
            m=m.replace("* ","")
            branchJSON.cur=m;
        }
        if(m.indexOf("remotes/origin/")>-1){
            m=m.replace("remotes/origin/","")
            branchJSON.remotesArr.push(m);
        }else{
            branchJSON.localArr.push(m);
        }
    })
    return branchJSON;
}
//将git tag转换成json数据
function tagToJSON(log){
    var tagArr={
        masterTag:"",
        devTag:"",
        allArr:[]
    }
    log.replace(/[\w][^\n]+(?=\n)/g,function(m,p1,p2){
        tagArr.allArr.push(m)
    })
    return tagArr;
}
//将git log转换成json数据
function logToJSON(log){
    var logArr=[]
    log.replace(/commit (\w+)/g,function(m,p1,p2){
        logArr.push(p1)
    })
    return logArr;
}

const exec = function (cmd) {
    var str=child.execSync(cmd)
    // console.log(str.toString())
    return str.toString();
};
/*
*private
* */

const dir=process.cwd()
// const dir=__dirname

//deploy 命令
var sp1=path.join(dir,"dist")
if(!fs.existsSync(sp1)){
    console.log(sp1,"目录不存在")
    console.log("请先执行命令","npm run build")
    return;
}else{
    console.log("1:",sp1,"目录存在")
}
var sp2=path.join(dir,"../../release_h5")
if(!fs.existsSync(sp2)){
    console.log(sp2,"目录不存在")
    console.log("请先执行命令","git pull http://git.intra.weibo.com/movie/release_h5.git")
    return;
}else{
    console.log("2:",sp2,"目录存在")
}
var status=exec("git status")
if(status.indexOf("nothing to commit, working tree clean")==-1){
  console.log("请先提交后h5，再执行deploy命令")
}
var deployLog=logToJSON(exec("git log|head"));

//进入release_h5目录
process.chdir(sp2);
exec("git clean -df")
//查看当前状态
console.log("3:检查当前状态")
var status=exec("git status")
if(status.indexOf("nothing to commit, working tree clean")>-1){
  console.log("ok")
}else{
  console.log("状态异常",status)
  return;
}

console.log("4:更新master")
exec("git checkout master")
exec("git clean -df")
// exec("git reset --hard")
exec("git pull origin master")

var masterLog=logToJSON(exec("git log|head"));

console.log("5:复制目录",sp1,sp2)
//复制dist目录中到
exec("cp -r "+sp1+"/ "+sp2+"/")

var status=exec("git status")
if(status.indexOf("nothing to commit, working tree clean")>-1){
  console.log("6：没有改变，end")
}else{
  console.log("6:有改变，添加提交")
  exec("git add .")
  exec("git commit -m 'cardVue "+deployLog[0]+"'")
  exec("git push origin master")
}


console.log("----------")
console.log("----------")
console.log("统计信息")
console.log("h5:")
console.log("deployLog:",deployLog[0])
console.log("release_h5:")
console.log("master:",masterLog[0])

