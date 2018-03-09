<template>

  <div v-if="cardShow" :key="card.cardId">
    <h3 style="font-weight: 400;margin: 20px 0 20px; color: #409EFF;font-size: 18px;">
      {{helpItem.help}}
    </h3>
    <el-form :model="cardShow" label-position="left"  ref="ruleForm" :label-width="helpItem.labelWidth||'100px'" class="demo-ruleForm">
      <div  v-for="(v,k) in cardShow"  :key="k">
        <div v-if="Object.prototype.toString.call(v)=='[object Array]'" v-show="!helpItem.hide[k]" :key="key">
          <el-row style="font-size: 16px;color: #E6A23C;">
            {{helpItem.editHelp[k]}}
          </el-row>
          <div v-for="(v2,k2) in v" :key="k+'.'+k2" style="border-bottom: 1px solid #ddd;">
            <el-row style="position: relative;height: 24px;line-height: 24px;color: #67C23A;padding-left: 10px;">
              {{k2+1}}/{{v.length}}:
              <div  style="cursor:pointer;position:absolute;right:10px;top:0px;font-size: 22px;">
                <i @click="addv(k,k2)" class="el-icon-circle-plus" style="font-size: 22px;color: #409EFF;"></i>
                <i @click="delv(k,k2)" class="el-icon-error" style="color: #ef4f4f;"></i>
              </div>

            </el-row>
            <div v-if="Object.prototype.toString.call(v2)=='[object Object]'">
              <el-form-item :label="helpItem.editHelp[k+'.'+k3]" label-width="80px" :prop="k+'.'+k2+'.'+k3" :rules="rules[k+'.'+k3]" v-for="(v3,k3) in v2" :key="k+'.'+k3" style="padding-left: 20px;">
                <edititem   :v="v3" :card-show="cardShow" :path="k+'.'+k2+'.'+k3" :k="k+'.'+k3" :help-item="helpItem"  @elechange="elechange" @eleinit="eleinit"></edititem>
              </el-form-item>
            </div>
            <div v-else>
              <el-form-item :label="helpItem.editHelp[k+'.'+k2]" :prop="k+'.'+k2" :rules="rules[k]" label-width="80px" style="padding-left: 20px;">
                <edititem :v="v2" :k="k+'.'+k2" :path="k+'.'+k2" :card-show="cardShow" :help-item="helpItem" @elechange="elechange" @eleinit="eleinit"></edititem>
              </el-form-item>
            </div>
          </div>
        </div>
        <div v-else-if="Object.prototype.toString.call(v)=='[object Object]'" v-show="!helpItem.hide[k]">
          <el-row style="font-size: 16px;color: #E6A23C;">
            {{helpItem.editHelp[k]}}
          </el-row>
          <el-form-item :label="helpItem.editHelp[k+'.'+k2]" :prop="k+'.'+k2" :rules="rules[k+'.'+k2]">
            <edititem v-for="(v2,k2) in v" :path="k+'.'+k2" :v="v2" :card-show="cardShow" :k="k+'.'+k2" :help-item="helpItem" :key="k+'.'+k2" @elechange="elechange" @eleinit="eleinit"></edititem>
          </el-form-item>
        </div>
        <div v-else v-show="!helpItem.hide[k]">
          <el-form-item :label="helpItem.editHelp[k]" :prop="k" :rules="rules[k]">
            <edititem :k="k" :v="v" :path="k" :card="card" :card-show="cardShow" :help-item="helpItem" @elechange="elechange" @eleinit="eleinit"></edititem>
          </el-form-item>
        </div>
      </div>
    </el-form>


  </div>

</template>

<script>
  //数据映射函数
  function hget(result,path,def){
    var result = result || {};
    (path || '').split('.').forEach(function(key){
      if(key && (typeof result !== 'undefined')){
        result = result[key];
      }
    });
    if(typeof result === 'undefined'){
      return def;
    } else {
      return result;
    }
  }
  function hset(result,path, value){
    if(typeof value === 'undefined'){
      for(var k in path){
        this[k]=path[k];
      }
    } else {
      path = String(path || '').trim();
      if(path){
        var paths = path.split('.'),
          last = paths.pop(),
          data = result || {};
        paths.forEach(function(key){
          var type = typeof data[key];
          if(type === 'object'){
            data = data[key];
          } else if(type === 'undefined'){
            data = data[key] = {};
          } else {
            console.error('forbidden to set property[' + key + '] of [' + type + '] data');
          }
        });
        data[last] = value;
      }
    }
    return result;
  }
  import Bus from '../../marvel/bus';
  import $ from 'jquery';
  import File from '@/utils/file';
  Bus.editVue;
  export default{
    components: {
      edititem:require("./editorItem.vue")
    },
    computed:{
      rules:()=>{
        return Bus.root.helpItem.rules;
      }
    },
    data() {
      return {
        helpItem:null,
        //展示的数据
        cardShow:null,
        key:0
      };
    },
    props:['card'],

    watch:{
      card:function () {
        if(!this.card){
          Bus.editVue=null;
          this.helpItem=null;
          this.cardShow=null;
          return;
        }

        var the=this

        console.log(this.card.card_type)
        Bus.editVue=this;
        this.helpItem=Bus.root.helpItem;
      console.log("watch",this.helpItem.watch)
        this.helpItem.rules=this.helpItem.rules||{};
        this.helpItem.propsType=this.helpItem.propsType||{};
        this.helpItem.hide=this.helpItem.hide||{};
        this.helpItem.watch=this.helpItem.watch||{};



        this.cardShow={}
        //数据映射
        if(this.helpItem.dataMap){
          for(var k in this.helpItem.dataMap){
            hset(this.cardShow,this.helpItem.dataMap[k],hget(this.card,k,""))
          }
        }
        if(this.helpItem.propsType){
          for(var k in this.helpItem.propsType){

            if(this.helpItem.propsType[k]=="Rem"){
              if(k.indexOf(".")==-1){
                if(Object.prototype.toString.call(this.card[k])=='[object Array]'){
                  this.card[k].forEach(function (item,k2) {
                    the.cardShow[k][k2]=parseFloat(item)*100;
                  })
                }else{

                  this.cardShow[k]=parseFloat(this.card[k])*100;
                }
              }else{
                var arr=k.split(".")
                //如果是数组
                if(Object.prototype.toString.call(this.card[arr[0]])=='[object Array]'){
                  for(var kk in this.card[arr[0]]){
                    //数组里面是对象
                    this.cardShow[arr[0]][kk][arr[1]]=parseFloat(this.card[arr[0]][kk][arr[1]])*100
                  }
                }
                if(Object.prototype.toString.call(this.card[arr[0]])=='[object Object]'){
                  this.cardShow[arr[0]][arr[1]]=parseFloat(this.card[arr[0]][arr[1]])*100
                }
              }
            }

          }
        }

      },
    },
    methods:{

      eleinit:function (nv,ov,path) {
        this.helpItem.watch[path]&&this.helpItem.watch[path].call(this.helpItem,nv,ov,this)
      },
      elechange:function (nv,ov,path) {
        hset(this.cardShow,path,nv);
        if(this.helpItem.watch[path]){
          this.helpItem.watch[path].call(this.helpItem,nv,ov,this)
        }
        this.saveCard()
      },
      delv:function (k,k2) {
        if(this.cardShow[k].length>1){
          this.cardShow[k].splice(k2,1)
          this.key++
          this.$message({   message:'已删除',type: 'warning'});
        }else{
          this.$message({message:'最后一条不能再删除了',type: 'warning'});
        }
      },
      addv:function (k,k2) {
        this.cardShow[k].splice(k2,0,JSON.parse(JSON.stringify(this.cardShow[k][k2])));
        this.key++
        this.$message({
          message:'已添加',type: 'success'
        });
      },

      //属性发生变化
      change:function () {
        if(this.helpItem.watch){
          for(var k in this.helpItem.watch){
            var key=this.helpItem.dataMap[k]||k;//编辑器的key
            if(hget(this.cardShow,key,'')!=hget(this.card,k,'')){
              this.helpItem.watch[k].call(this.helpItem,hget(this.cardShow,key,''),hget(this.card,k,''),this)
            }
          }
        }
        this.saveCard()
      },
      //保存
      saveCard:function () {
        console.log("saveCard")
        var the=this;

        //数据映射
        if(this.helpItem.dataMap){
          for(var k in this.helpItem.dataMap){
            hset(this.card,k,hget(this.cardShow,this.helpItem.dataMap[k],""))
          }
        }

        for(var k in this.helpItem.propsType){
          if(this.helpItem.propsType[k]=="Rem"){
            if(k.indexOf(".")==-1){
              if(Object.prototype.toString.call(this.card[k])=='[object Array]'){
                this.cardShow[k].forEach(function (item,k2) {
                  the.card[k][k2]=item/100+"rem";
                })
              }else{
                this.card[k]=this.cardShow[k]/100+"rem";
              }
            }else{
              var arr=k.split(".")
              //如果是数组
              if(Object.prototype.toString.call(this.cardShow[arr[0]])=='[object Array]'){
                for(var kk in this.cardShow[arr[0]]){
                  //数组里面是对象
                  this.card[arr[0]][kk][arr[1]]=this.cardShow[arr[0]][kk][arr[1]]/100+"rem"
                }
              }
              if(Object.prototype.toString.call(this.cardShow[arr[0]])=='[object Object]'){
                this.card[arr[0]][arr[1]]=this.cardShow[arr[0]][arr[1]]/100+"rem"
              }
            }
          }
        }


      },
    }
  };

</script>
<style>


</style>
