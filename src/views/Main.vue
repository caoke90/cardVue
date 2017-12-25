<template>
  <!--http://ting.weibo.com/admin/mobile_page/edit?id=6225-->
  <drag id="dragbox">
    <div class="g-bd5 f-cb">
      <div class="g-sd51" style="z-index: 1;position:fixed;">
        <mt-navbar v-model="selected2">
          <mt-tab-item v-for="(v,k) in childrenList" :id="'l'+k" :key="'l'+k">{{v.title}}</mt-tab-item>
        </mt-navbar>

        <mt-tab-container style="overflow:scroll;height:90vh;" v-model="selected2">
          <mt-tab-container-item v-for="(item,k) in childrenList" :id="'l'+k" :key="'l'+k" contain="children">
            <div v-for="(v,k) in item.children" :key="v.cardId">
              <mod :card="v" contain="children"></mod>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>

      </div>
      <div class="g-mn5" contain="mainChild">
        <div class="g-mn5c" >

          <div class="main">
            <div v-for="(v,k) in mainChild" :key="v.cardId">
              <mod :card="v" contain="mainChild"></mod>
            </div>
          </div>

        </div>
      </div>
      <div class="g-sd52">
        <div class="right">
          <div style="margin-bottom: 10px;">
            <mt-button size="small" style="cursor: pointer" v-on:click="fabu">发布</mt-button>
            <mt-button size="small" style="cursor: pointer" v-on:click="show">预览</mt-button>
            <mt-button size="small" style="cursor: pointer" v-on:click="save">保存</mt-button>
          </div>
          <div>
            <mt-navbar v-model="selected">
              <mt-tab-item id="e1">数据</mt-tab-item>
              <mt-tab-item id="e2">页面信息</mt-tab-item>
            </mt-navbar>
            <mt-tab-container v-model="selected">
              <mt-tab-container-item id="e1">
                <editor :card="editCardData"></editor>
              </mt-tab-container-item>
              <mt-tab-container-item id="e2">
                <!--<editor :card="editPageData"></editor>-->
              </mt-tab-container-item>
            </mt-tab-container>

          </div>
        </div>


      </div>
    </div>
  </drag>
</template>

<script>
  import { XInput,Selector,XButton,XNumber, Flexbox, FlexboxItem, Group, XTextarea, Cell } from 'vux'
  var $ = require('jquery');

  import Bus from '../marvel/bus';
  import Vue from 'vue';
  import Mint from 'mint-ui';
  import 'mint-ui/lib/style.css';
  Vue.use(Mint);

  import querystring from 'vux/src/tools/querystring'
  Bus.params={
    id:querystring.parse().id||6225
  }
  //所有卡片的辅助信息
  Bus.index=0;
  const app={
    data:function () {
      return {
        selected:"e1",////右边
        selected2:"l1",//左边
        selected3:"",//右边
        helpJSON:require("../components/helpJSON"),
        childrenList:require("../components/childrenList").splice(0,2),
        mainChild:[],
//        editPageData:null,
        editCardData:null
      };
    },
    components: {
      XInput,
      XButton,
      XNumber,
      XTextarea,
      Group,
      Selector,
      Flexbox,
      FlexboxItem,
      Cell,
      'drag': require('../components/drag.vue'),
      'mod': require('../components/modDev.vue'),
      'editor': require('../components/editor.vue')
    },
    methods:{

      fabu:function () {
        var the=this
        this.$http.get("/subject/h5/publishpage?page_id=6225").then(function (rst) {
          if (rst.data && rst.data.status==1) {
            the.$toast({
              message: '发布成功！'
            })
          }
        })
      },
      //点击预览
      show:function () {
        if(process.env.NODE_ENV=="development"){
          window.open("demo.html")
        }else{
          window.open("http://movie.weibo.com/subject/h5/index?page_id=6225&preview=1")
        }

      },
      //点击保存
      save:function () {
        var obj=JSON.parse(JSON.stringify(this.mainChild))
        obj.map(function (item,k) {
          delete item.cardId
          if(typeof item.card_type=="string") {
            item.card_type = parseInt(item.card_type.replace(/\D+/g, ""))
          }
          if(item.card_group&&item.card_group.length>0){
            item.card_group.forEach(function (witem) {
              if(typeof witem.card_type=="string"){
                witem.card_type=parseInt(witem.card_type.replace(/\D+/g,""))
              }

            })
          }
          return item
        })
      console.log(obj)
//        var obj2=JSON.parse(JSON.stringify(this.editPageData))
//        delete obj2.cardId;
//        delete obj2.card_type;
//        console.log(obj2)

          var the=this;
          this.$http.post("/subject/h5/savecard",{
            page_id:Bus.params.id,
            cardlist:JSON.stringify(obj),
//            cardlist:JSON.stringify(obj2)
          }).then(function (rst) {
            if (rst.data && rst.data.status==1) {
              the.$toast({
                message: '已保存！'
              })
            }
          })


      },

    },
    mounted:function () {
      var the=this
      Bus.root=this;
//      this.editCardData={
//        cardId:"demo",
//        card_type:"demo",
//        imgUrl:"http://tva1.sinaimg.cn/crop.0.0.534.534.180/8937b4a0ly1feoq7ihfotj20eu0euq3d.jpg",
//        Rem:"1rem",
//        Number:1,
//        String:"字符",
//        "Object":{
//          "imgUrl":"图片",
//          "Rem":"1rem",
//          "Number":"数字",
//          "Selector":true,
//          "String":"字符",
//        },
//        "Array": [
//          {
//            "imgUrl":"图片",
//            "Rem":"1rem",
//            "Number":"数字",
//            "Selector":true,
//            "String":"字符",
//          },
//          {
//            "imgUrl":"图片",
//            "Rem":"1rem",
//            "Number":"数字",
//            "Selector":true,
//            "String":"字符",
//          }
//        ],
//        "Selector":true,
//        "ArrayimgUrl": [
//          "http://tva1.sinaimg.cn/crop.0.0.534.534.180/8937b4a0ly1feoq7ihfotj20eu0euq3d.jpg"
//        ]
//      }


      this.$http.get("/subject/h5/getcardinfo?page_id="+Bus.params.id+"&preview=1").then(function (rst) {
        the.mainChild=rst.data.data.cards.map(function (item) {

          return item;
        });
//          the.editPageData=rst.data.data.page_info;
      })

    },
  };



  export default app;

</script>

<style rel="stylesheet/scss" type="text/css" lang="scss" >

  .g-bd5{
    width: 100%;
  }
  .g-sd51,.g-sd52{position:relative;float:left;width:375px;margin:0 -375px 0 0;}
  .g-sd52{float:right;width:300px;margin:0 0 0 -300px;}
  .g-mn5{float:left;width:100%;}
  .g-mn5c{margin:0 310px 0 375px;}

  .main{
    margin: 0 auto;
    width: 375px;
    height: 100vh;
    background: #fff;
    position: relative;
  }

  /*@media screen and (min-width: 1500px){*/
  /*.main{*/
  /*width: 750px;*/
  /*}*/
  /*}*/
  .right{

  }
  .right .mint-field-core{
    color: #0bb20c;
  }
  .right .mint-field-core::placeholder{
    color: #0bb20c;
    opacity: 0.4;
  }

  .right .mint-cell-value a{
    cursor: pointer;
    color: #26a2ff;
  }


</style>
