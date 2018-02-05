<template>
  <!--http://ting.weibo.com/admin/mobile_page/edit?id=6225-->
  <drag id="dragbox">
    <div class="g-bd5 f-cb">
      <div class="g-sd51" style="z-index: 100;position:fixed;">
        <leftedit :children="children"></leftedit>

      </div>
      <div class="g-mn5" contain="card_group">
        <div class="g-mn5c" >
          <mainedit :children="card_group" :key="cardId"></mainedit>
        </div>
      </div>
      <div class="g-sd52">

        <div class="right">
          <div style="margin-bottom: 10px;">
            <mt-button size="small" style="cursor: pointer" v-on:click="fabu">发布</mt-button>
            <mt-button size="small" style="cursor: pointer" v-on:click="show">预览</mt-button>
            <mt-button size="small" style="cursor: pointer" v-on:click="save">保存</mt-button>
          </div>
          <div style="">
            <editor :card="editCardData"></editor>
          </div>
        </div>
      </div>
    </div>
  </drag>
</template>

<script>
  require("../common/marvel.css");

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
        children:[{
          "title":"容器",
          "col":"2",
          "items":[
            "card10",

          ],
        },{
          "title":"ui挂件",
          "col":"2",
          "items":[
            "card11",
            "card13",

          ],
        },{
          "title":"基础类",
          "col":"2",
          "items":[
            "card2",
            "card3",
            "card8",
            "card9",
            "card20",
            "card21",
            "card22",
            "card23",
            "card24",
            "card25",
            "card26",
            "card28",
            "card29",
          ],
        },{
          "title":"业务类",
          "col":"2",
          "items":[
            "card2008",
            "card3001",
          ],
        },{
          "title":"other",
          "col":"2",
          "items":[
            "card100",
          ],
        }],
        cardId:Bus.index++,
        card_group:[],
//        editPageData:null,
        editCardData:null
      };
    },
    components: {
      'drag': require('../components/drag.vue'),

      'leftedit': require('../components/leftEdit.vue'),
      'mainedit': require('../components/mainEdit.vue'),
      'editor': require('../components/editor.vue')
    },
    methods:{

      fabu:function () {
        var the=this
        this.$http.get("/subject/h5/publishpage?page_id="+Bus.params.id).then(function (rst) {
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
          window.open("/cardVue/demo.html?preview=1")
        }else{
          window.open("http://movie.weibo.com/subject/h5/index?page_id="+Bus.params.id+"&preview=1")
        }

      },
      //点击保存
      save:function () {
        var obj=JSON.parse(JSON.stringify(this.card_group))
        obj.map(function (item,k) {
          delete item.cardId
          if(typeof item.card_type=="string") {
            item.card_type = parseInt(item.card_type.replace(/\D+/g, ""))
          }
          if(item.card_group&&item.card_group.length>0){
            item.card_group.forEach(function (witem) {
              delete witem.cardId
              if(typeof witem.card_type=="string"){
                witem.card_type=parseInt(witem.card_type.replace(/\D+/g,""))
              }

            })
          }
          return item
        })
        console.log(obj)

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

      this.$http.get("/subject/h5/getcardinfo?page_id="+Bus.params.id+"&preview=1").then(function (rst) {
        the.card_group=rst.data.data.cards.map(function (item) {
          item.cardId=Bus.index++
          if(item.card_group){
            item.card_group.map(function (item2) {
              item2.cardId=Bus.index++
              return item2;
            })
          }

          return item;
        });

      })


    },
  };



  export default app;

</script>

<style rel="stylesheet/scss" type="text/css" lang="scss" >

  .g-bd5{
    width: 100%;
  }
  .g-sd51,.g-sd52{position:relative;float:left;width:300px;margin:0 -300px 0 0;}
  .g-sd52{float:right;width:300px;margin:0 0 0 -300px;}
  .g-mn5{float:left;width:100%;}
  .g-mn5c{margin:0 310px 0 375px;}


  .right{
    overflow: scroll;height: 100vh;
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
  .mint-tab-item-label{
    color: #404040;
  }
  .mint-tab-item.is-selected .mint-tab-item-label{
    color: #26a2ff;
  }
</style>
