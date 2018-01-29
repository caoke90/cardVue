<template>

  <div v-if="cardShow" :key="card.cardId">

    <div class="weui-article" style="margin-bottom: -15px;line-height: 40px;font-size: 16px;color: #26a2ff;position: relative;">
      {{helpItem.help}}
    </div>

    <div v-for="(v,k) in cardShow" :key="key">
      <div v-if="Object.prototype.toString.call(v)=='[object Object]'">
        <group>
          <div class="weui-cells__title" style="padding: 0;margin-top: 0;" slot="title">
            {{helpItem.editHelp[k]}}
          </div>
        </group>
        <div v-on:click="selected3==k?selected3='':selected3=k">
          <mt-cell :title="k+':'">
            <a v-if="selected3!=k">{…}</a>
            <a v-else>-</a>
          </mt-cell>
        </div>
        <group v-show="selected3==k" style="margin-top: -30px;">
          <div v-for="(v2,k2) in v" :key="k2">
            <x-input v-if="helpItem.propsType&&helpItem.propsType[k+'.'+k2]=='Rem'" :title="k2" v-model="cardShow[k][k2]">
              <span slot="right">px</span>
            </x-input>
            <selector v-else-if="helpItem.propsType&&helpItem.propsType[k+'.'+k2]=='Selector'" :title="k2+':'" placeholder="请输入" v-model="cardShow[k][k2]" :options="helpItem.propsType[k+'.'+k2+'Options']"></selector>
            <x-input type="number" v-else-if="helpItem.propsType&&helpItem.propsType[k+'.'+k2]=='Number'" :title="k2+':'" placeholder="请输入数字" v-model="cardShow[k][k2]"></x-input>
            <x-input v-else-if="helpItem.propsType&&helpItem.propsType[k+'.'+k2]=='imgUrl'" :title="k2" v-model="cardShow[k][k2]">
              <button slot="right" @click="uploadFile(k,k2)">图片上传</button>
            </x-input>
            <x-input v-else-if="helpItem.propsType&&helpItem.propsType[k+'.'+k2]=='Url'" :title="k2+':'" placeholder="请输入url" v-model="cardShow[k][k2]"></x-input>
            <x-input v-else :title="k2+':'" placeholder="请输入" v-model="cardShow[k][k2]"></x-input>
          </div>
        </group>
      </div>
      <div v-else-if="Object.prototype.toString.call(v)=='[object Array]'">
        <group>
          <div class="weui-cells__title" style="padding: 0;margin-top: 10px;color: #333;" slot="title">
            {{helpItem.editHelp[k]}}
          </div>
        </group>
        <div>
          <div v-for="(v2,k2) in v" :key="k2" style="position: relative;">
            <div @click="delv(k,k2)" style="z-index:10;font-size:12px;cursor:pointer;position:absolute;right:0;top: -10px;text-align:center;line-height:20px;border-radius: 50%;display: block;width: 20px;height: 20px;background: #ef4f4f;color: #fff;">X</div>

            <group v-if="Object.prototype.toString.call(v2)=='[object Object]'" style="margin-top: -15px;">
              <div v-for="(v3,k3) in v2">
                <x-input v-if="helpItem.propsType&&helpItem.propsType[k+'.'+k3]=='Rem'" :title="helpItem.editHelp[k+'.'+k3]" v-model="cardShow[k][k2][k3]">
                  <span slot="right">px</span>
                </x-input>
                <selector v-else-if="helpItem.propsType&&helpItem.propsType[k+'.'+k3]=='Selector'" :title="helpItem.editHelp[k+'.'+k3]" placeholder="请选择" v-model="cardShow[k][k2][k3]"  :options="helpItem.propsType[k+'.'+k3+'Options']"></selector>
                <x-input type="number" v-else-if="helpItem.propsType&&helpItem.propsType[k+'.'+k3]=='Number'" :title="helpItem.editHelp[k+'.'+k3]" placeholder="请输入" v-model="cardShow[k][k2][k3]"></x-input>
                <x-input v-else-if="helpItem.propsType&&helpItem.propsType[k+'.'+k3]=='imgUrl'" :title="helpItem.editHelp[k+'.'+k3]" placeholder="请输入" v-model="cardShow[k][k2][k3]">
                  <button slot="right" @click="uploadFile(k,k2,k3)">图片上传</button>
                </x-input>
                <x-input v-else-if="helpItem.propsType&&helpItem.propsType[k+'.'+k3]=='Url'" placeholder="请输入url" :title="helpItem.editHelp[k+'.'+k3]" v-model="cardShow[k][k2][k3]"></x-input>
                <x-input v-else placeholder="请输入" :title="helpItem.editHelp[k+'.'+k3]" v-model="cardShow[k][k2][k3]"></x-input>
              </div>
             </group>
            <group v-else style="margin-top: -15px;">
              <x-input v-if="helpItem.propsType&&helpItem.propsType[k]=='Rem'" :title="helpItem.editHelp[k+'.']" v-model="cardShow[k][k2]">
                <span slot="right">px</span>
              </x-input>
              <selector v-else-if="helpItem.propsType&&helpItem.propsType[k]=='Selector'" :title="helpItem.editHelp[k+'.']" placeholder="请选择" v-model="cardShow[k][k2]" :options="helpItem.propsType[k+'Options']"></selector>
              <x-input type="number" v-else-if="helpItem.propsType&&helpItem.propsType[k]=='Number'" :title="helpItem.editHelp[k+'.']" placeholder="请输入" v-model="cardShow[k][k2]"></x-input>
              <x-input v-else-if="helpItem.propsType&&helpItem.propsType[k]=='imgUrl'" :title="helpItem.editHelp[k+'.']" placeholder="请输入" v-model="cardShow[k][k2]">
                <button slot="right" @click="uploadFile(k,k2)">图片上传</button>
              </x-input>
              <x-input v-else-if="helpItem.propsType&&helpItem.propsType[k]=='Url'" placeholder="请输入url" :title="helpItem.editHelp[k+'.']" v-model="cardShow[k][k2]"></x-input>
              <x-input v-else placeholder="请输入" :title="helpItem.editHelp[k+'.']" v-model="cardShow[k][k2]"></x-input>
            </group>

          </div>
          <div><mt-button size="small" style="cursor: pointer" @click="addv(k)">添加</mt-button></div>
        </div>
      </div>
      <group v-else >
        <x-input v-if="helpItem.propsType&&helpItem.propsType[k]=='Rem'" :title="helpItem.editHelp[k]" placeholder="请输入" v-model="cardShow[k]">
          <span slot="right">px</span>
        </x-input>
        <selector :title="helpItem.editHelp[k]" v-else-if="helpItem.propsType&&helpItem.propsType[k]=='Selector'" placeholder="请选择" v-model="cardShow[k]" :options="helpItem.propsType[k+'Options']"></selector>
        <x-input :title="helpItem.editHelp[k]" type="number" v-else-if="helpItem.propsType&&helpItem.propsType[k]=='Number'" placeholder="请输入数字" v-model="cardShow[k]"></x-input>
        <x-input :title="helpItem.editHelp[k]" v-else-if="helpItem.propsType&&helpItem.propsType[k]=='imgUrl'" placeholder="请输入" v-model="cardShow[k]">
          <button slot="right" @click="uploadFile(k)">图片上传</button>
        </x-input>
        <x-input v-else-if="helpItem.propsType&&helpItem.propsType[k]=='Url'" :title="helpItem.editHelp[k]" placeholder="请输入url" v-model="cardShow[k]"></x-input>
        <x-input v-else :title="helpItem.editHelp[k]" placeholder="请输入" v-model="cardShow[k]"></x-input>
      </group>
    </div>


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
  var helpJSON=require("./helpJSON")
  import Bus from '../marvel/bus';
  import $ from 'jquery';
  import File from '@/utils/file';
  import { XInput,Selector,XButton,XNumber, Flexbox, FlexboxItem, Group, XTextarea, Cell } from 'vux'
  var editVue;
  $("body").delegate("input","change",function (e) {
    setTimeout(function () {
      editVue&&editVue.saveCard()
    },0)
  })
  $("body").delegate("select","change",function (e) {
    setTimeout(function () {
      editVue&&editVue.saveCard()
    },0)
  })

  //编辑
  Bus.$on("edit",function (card,id) {
    var cardNum=(""+card.card_type).replace(/\D+/g,"")
    //存在异步数据
    if(cardNum=="20"){
      var helpItem=helpJSON["card"+cardNum]
      Bus.$http.get("/admin/mobile_page/ajax_getpolllist").then(function (rst) {
        if (rst.data) {
          helpItem.propsType.left_themeidOptions=[];
          helpItem.propsType.right_themeidOptions=[];
          for(var k in rst.data.votethemelist){
            helpItem.propsType.left_themeidOptions.push({key: k, value: rst.data.votethemelist[k]})
            helpItem.propsType.right_themeidOptions.push({key: k, value: rst.data.votethemelist[k]})
          }
          Bus.root.editCardData=card;
          Bus.root.editCardData.cardId=id;
        }
      })
      return;

    }else{
      Bus.root.editCardData=card;
      Bus.root.editCardData.cardId=id;
    }

  })

  export default{
    components: {
      XInput,
      XButton,
      XNumber,
      XTextarea,
      Group,
      Selector,
      Flexbox,
      FlexboxItem,
      Cell
    },
    data() {
      return {
        helpItem:null,
        //展示的数据
        cardShow:null,
        selected3:'',
        key:0
      };
    },
    props:['card'],

    watch:{
      card:function () {
        if(!this.card){
          editVue=null;
          this.helpItem=null;
          this.cardShow=null;
          this.selected3=-1;
          return;
        }
        var the=this

        console.log(this.card.card_type)
        editVue=this;
        this.helpItem=helpJSON["card"+(""+this.card.card_type).replace(/\D+/g,"")]
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
      uploadFile:function (k,k2,k3) {
        var len=arguments.length;
        var the=this
        File.get(function (data) {
          var data=data;
          console.log(len)
          console.log(k,k2,k3)
          if(process.env.NODE_ENV=="development"){
            if(len==3){
              the.cardShow[k][k2][k3]=data.data
            }else if(len==2){
              the.cardShow[k][k2]=data.data
            }else{
              the.cardShow[k]=data.data
            }
          }else{
            the.$http.post("/subject/h5/ajaxuploadphoto?page_id=6225&uploadtype=file",{
              file:data.data
            }).then(function (response) {
              var url=response.data.data.url
              if(len==3){
                the.cardShow[k][k2][k3]=url
              }else if(len==2){
                the.cardShow[k][k2]=url
              }else{
                the.cardShow[k]=url
              }
            })
          }
          the.key++
        })
      },
      delv:function (k,k2) {
        if(this.cardShow[k].length>1){
          this.cardShow[k].splice(k2,1)
          this.key++
        }
      },
      addv:function (k) {
        this.cardShow[k].push(JSON.parse(JSON.stringify(this.cardShow[k][0])));
        this.key++
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

        this.card.cardId=Bus.index++

      },
      //删除
      delCard:function () {
        Bus.parentCardArr.splice(Bus.parentCardArr.indexOf(this.card),1)
        Bus.root.editCardData=null
      },
    }
  };

</script>
<style >
  .weui-cell__bd{
    background: #efefef;
  }

  .weui-label{
    color: #999;
  }

</style>
