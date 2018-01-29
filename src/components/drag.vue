<template>
  <div
    @click="click"
       @touchstart="mousedown"
       @touchend="mouseup"
       @mousedown="mousedown"
       @mousemove="mousemove"
       @mouseup="mouseup">

    <slot></slot>
  </div>
</template>

<script>
  var $ = require('jquery');
  var cardsDic = require('./cardsDic');
  import Bus from '../marvel/bus';
  function getCardNum(cardName){
    return (""+cardName).replace(/\D+/g,"")
  }
  function getCardType(cardName){
    return cardName.replace(/\d+/g,"")
  }
  Bus.addCard=function (cardname) {
    var card=cardsDic.getCardData(cardname)

    if(card.type=="box"||card.card_group){
      Bus.root.mainChild.push(card)
      Bus.parentCardArr=Bus.root.mainChild;
      Bus.root.editCardData=card
    }else if(card.type=="ui"){
      Bus.root.mainChild.push(card)
      Bus.parentCardArr=Bus.root.mainChild;
      Bus.root.editCardData=card
//      var uiBox=null;
//      for(var i=0;i<Bus.root.mainChild.length;i++){
//        var item=Bus.root.mainChild[i]
//        if(getCardNum(item.card_type)=="1"){
//          uiBox=item;
//        }
//      }
//      if(uiBox){
//        uiBox.card_group.push(card);
//      }else{
//        var uicard=cardsDic.getCardData("card1")
//        uicard.card_group.push(card)
//        Bus.root.mainChild.push(uicard)
//        Bus.parentCardArr=Bus.root.mainChild;
//        Bus.root.editCardData=card
//      }
    }else{
      //编辑状态
      if(Bus.root.editCardData){
        //插入到容器
        if(Bus.root.editCardData.type=='box'&&Array.isArray(Bus.root.editCardData.card_group)){
          Bus.root.editCardData.card_group.push(card)
        }else if(Bus.root.editCardData.type=='ui'){
          var card10=cardsDic.getCardData("card10")
          card10.card_group.push(card)
          Bus.root.mainChild.push(card10)
          Bus.parentCardArr=Bus.root.mainChild;
          Bus.root.editCardData=card
        }else{
          //插入card
          var index=Bus.parentCardArr.indexOf(Bus.root.editCardData)
          Bus.parentCardArr.splice(index+1,0,card)
          Bus.root.editCardData=card
        }
      }else{
        var card10=cardsDic.getCardData("card10")
        card10.card_group.push(card)
        Bus.root.mainChild.push(card10)
        Bus.parentCardArr=card10.card_group;
        Bus.root.editCardData=card
      }
    }

    //选中了容器card10
//    if(Bus.root.editCardData&&getCardType(card.card_type)=="box"){
//      if(Bus.root.editCardData.card_group){
//        if(getCardNum(Bus.root.editCardData.card_type)==10){
//          Bus.root.editCardData.card_group.push(card)
//        }
//      }else{
//        //插入card
//        var index=Bus.parentCardArr.indexOf(Bus.root.editCardData)
//        Bus.parentCardArr.splice(index+1,0,card)
//        Bus.root.editCardData=card
//      }
//
//    }else{
//      if(card.card_group){
//        Bus.root.mainChild.push(card)
//      }else{
//        var card10=cardsDic.getCardData("card10")
//        card10.card_group.push(card)
//        Bus.root.mainChild.push(card10)
//      }
//
//    }
//    console.log(Bus.parentCardArr)
//    console.log(cardsDic.getCardData(cardname))
//    console.log(cardsDic.getCardData("card10"))


  }
  export default{
    props:['item'],
    data:function () {
      return {
        hover:true
      }
    },
    components:{
      'mod': require('./mod.vue'),
    },

    methods:{

      findVue:function (uid,$root) {
        if($root._uid==uid){
          return $root
        }
        if($root.$children&&$root.$children.length>0){
          for(var i=0;i<$root.$children.length;i++){
            var back=this.findVue(uid,$root.$children[i])
            if(back){
              return back;
            }
          }
        }
      },
      //添加一个box
      addOne:function (box,upbox) {
        console.log(box.card.card_group)

        var obj=JSON.parse(JSON.stringify(box.card))
        obj.cardId="c"+(Bus.index++)
        //激活挂件
        if(obj.style){
          obj.style.left="1.3rem"
          obj.style.top="2rem"
          Bus.root.mainChild.push(obj)
          return;
        }
        if(!upbox){
          if(!box.card.card_group) {
            Bus.root.mainChild.push({
              card_group: [obj],
              "card_type": "card10",
              "card_id": 0,
              "title": "",
            })
          }else{
            Bus.root.mainChild.push(obj)
          }

        }else{
          var index=Bus.root.mainChild.indexOf(upbox.card)
          Bus.root.mainChild.splice(index+1,0,obj)
        }
      },
      exchange:function (box,upbox) {
        var index=Bus.root.mainChild.indexOf(box.card)
        var index2=Bus.root.mainChild.indexOf(upbox.card)
        var temp=Bus.root.mainChild[index];
        Bus.root.mainChild[index]=Bus.root.mainChild[index2];
        Bus.root.mainChild[index2]=temp;
        //更新
        Bus.root.mainChild=JSON.parse(JSON.stringify(Bus.root.mainChild))
      },
      boxAddItem:function (upbox,box,boxTarget) {
        if(boxTarget){
          var index=upbox.card.card_group.indexOf(boxTarget.card)
          upbox.card.card_group.splice(index+1,0,JSON.parse(JSON.stringify(box.card)))
        }else{
          upbox.card.card_group.push(JSON.parse(JSON.stringify(box.card)))
        }
      },
      boxDel:function (upbox,box) {
        if(box){
          var index=upbox.card.card_group.indexOf(box.card)
          upbox.card.card_group.splice(index,1)
        }else{
          var index=Bus.root.mainChild.indexOf(upbox.card)
          Bus.root.mainChild.splice(index,1)
        }
      },
      boxExchange:function (upbox,box,boxTarget) {
        var index=upbox.card.card_group.indexOf(box.card)
        var index2=upbox.card.card_group.indexOf(boxTarget.card)

        var temp=upbox.card.card_group[index];
        upbox.card.card_group[index]=upbox.card.card_group[index2];
        upbox.card.card_group[index2]=temp;
        //更新
        upbox.card.card_group=[].concat(upbox.card.card_group)

      },
      click:function (e) {
        //触发编辑操作
        var cContain=$(e.target).parents("[contain]").attr("contain")
        if(cContain=="mainChild"){
          var mid=$(e.target).parents("[mid]").attr("mid")

          if(mid){
            var cid=$(e.target).parents("[cid]").attr("cid")

            if(cid){
              //选中了卡片
              Bus.parentCardArr=this.findVue(mid, this.$root).card.card_group;

              //删除卡片
              if($(e.target).attr("cardType")=="del"){
                Bus.root.editCardData=this.findVue(cid,this.$root).card;
                Bus.root.editCardData.cardId=cid
                Bus.parentCardArr.splice(Bus.parentCardArr.indexOf(Bus.root.editCardData),1)
                Bus.root.editCardData=null
              }else{
//                Bus.root.editCardData=this.findVue(cid,this.$root).card;
//                Bus.root.editCardData.cardId=cid
                Bus.$emit("edit",this.findVue(cid,this.$root).card,cid)
              }
            }else{
              //选中了容器
              Bus.parentCardArr=Bus.root.mainChild;

              //删除容器
              if($(e.target).attr("cardType")=="del"){
                Bus.root.editCardData=this.findVue(mid, this.$root).card;
                Bus.root.editCardData.cardId=mid;
                Bus.parentCardArr.splice(Bus.parentCardArr.indexOf(Bus.root.editCardData),1)
                Bus.root.editCardData=null
              }else{
//                Bus.root.editCardData=this.findVue(mid, this.$root).card;
//                Bus.root.editCardData.cardId=mid;
                Bus.$emit("edit",this.findVue(mid, this.$root).card,mid)
              }

            }
          }else{
            Bus.parentCardArr=null;
            Bus.root.editCardData=null
          }
        }
      },
      mousedown:function (e) {

        Bus.dContain=$(e.target).parents("[contain]").attr("contain")
        if(!Bus.dContain){
          return;
        }
        Bus.downP={
          x:e.x,
          y:e.y,
        }
        Bus.downTarget=e.target;

        Bus.downBox= this.findVue($(e.target).parents("[mid]").attr("mid"), this.$root)

        if($(e.target).parents("[cid]").attr("cid")){
          $("#dragbox #dragClone").remove();
          Bus.clone=$(Bus.downTarget).parents("[cid]").clone().appendTo("#dragbox").css({
            position:"absolute",
            left:e.x+"px",
            top:e.y+10+"px",
            "z-index":100,
            "opacity":0.5,
            width:$(Bus.downTarget).parents("[mid]").width(),
            height:$(Bus.downTarget).parents("[mid]").height(),
          }).attr("id",'dragClone')

        }else{
          $("#dragbox #dragClone").remove();
          Bus.clone=$(Bus.downTarget).parents("[mid]").clone().appendTo("#dragbox").css({
            position:"absolute",
            left:e.x+"px",
            top:e.y+10+"px",
            "z-index":100,
            "opacity":0.5,
            width:$(Bus.downTarget).parents("[mid]").width(),
            height:$(Bus.downTarget).parents("[mid]").height(),
          }).attr("id",'dragClone')
        }
        e.preventDefault()
      },
      mousemove:function (e) {
        if(Bus.clone){
          Bus.clone.css({
            transform:"translate("+[(e.x-Bus.downP.x)+"px",(e.y-Bus.downP.y)+"px"].join(",")+")"
          })
        }

      },
      mouseup:function (e) {

        if(Bus.clone){

          Bus.clone.remove();
          Bus.clone=null
        }

        if (!Bus.downBox) {
          return;
        }

        Bus.uContain=$(e.target).parents("[contain]").attr("contain")
        if(!Bus.uContain){
          return;
        }

        Bus.upP = {
          x: e.x,
          y: e.y,
        }
        Bus.upTarget = e.target;
        Bus.upRoot = this;
        var dbox=Bus.downBox;
        //添加新的
        if (Bus.dContain == "children" && Bus.uContain == "mainChild") {
          var bid = $(e.target).parents("[mid]").attr("mid")
//          var dbox = this.findVue($(Bus.downTarget).parents("[mid]").attr("mid"), Bus.downBox)
          //如果在box中
          if (bid) {
            console.log("插入一个新的")
            //获取原来的box
            var upbox = this.findVue($(Bus.upTarget).parents("[mid]").attr("mid"), this.$root)

            //把box插入到upbox
            if (!dbox.card.card_group && upbox.card.card_group) {
              //某些card不能插入
              if([11,13].indexOf(parseInt(upbox.card.card_type.replace("card","")))>-1){
                console.log("不能放card，插入fail")
                return;
              }
              var cid = $(Bus.upTarget).parents("[cid]").attr("cid")
              if (cid) {
                //卡片插入到box
                this.boxAddItem(upbox, dbox, this.findVue(cid, upbox))
              } else {
                this.boxAddItem(upbox, dbox)
              }
            } else {
                this.addOne(dbox, upbox)


            }
          } else {
            console.log("添加一个新的")
            //获取原来的box
            this.addOne(dbox)
          }
        }
        //删除
        if (Bus.dContain == "mainChild" && Bus.uContain == "children") {
          var cid = $(Bus.downTarget).parents("[cid]").attr("cid")

          if(cid&&Array.isArray(dbox.card.card_group)){
            var box1 = this.findVue(cid, dbox)
            this.boxDel(dbox, box1)
          }else{
            this.boxDel(dbox)
          }
        }

        //移动
        if (Bus.dContain == "mainChild" && Bus.uContain == "mainChild") {

//          var dbox = this.findVue($(Bus.downTarget).parents("[mid]").attr("mid"), Bus.downBox)
          var upbox = this.findVue($(Bus.upTarget).parents("[mid]").attr("mid"), this.$root)

          //不可移动容器内部交换
          if(dbox&&upbox&&dbox._uid==upbox._uid&&!dbox.card.style){
            var cid = $(Bus.downTarget).parents("[cid]").attr("cid")
            var cid2 = $(Bus.upTarget).parents("[cid]").attr("cid")
            if (cid2 && cid && cid != cid2) {
              var box1 = this.findVue(cid, dbox)
              var box2 = this.findVue(cid2, dbox)
              this.boxExchange(dbox, box1, box2)
              console.log("box内部交换")
            }
          }
          //可移动容器内部交换
          if(dbox&&upbox&&dbox._uid==upbox._uid&&dbox.card.style){
            var cid = $(Bus.downTarget).parents("[cid]").attr("cid")
            var cid2 = $(Bus.upTarget).parents("[cid]").attr("cid")
            if (cid2 && cid && cid != cid2) {
              var box1 = this.findVue(cid, dbox)
              var box2 = this.findVue(cid2, dbox)
              this.boxExchange(dbox, box1, box2)
              console.log("box内部交换")
            }else{
              this.boxMove(dbox)
              console.log("box内部移动")
            }
          }
          //如果在box中
          if(dbox&&upbox&&dbox._uid!=upbox._uid&&!dbox.card.style&&!upbox.card.style){
            this.exchange(dbox, upbox)
//            if($(Bus.downTarget).attr("cardType")=="box"){
//              console.log("box和box交换")
//
//            }else{
//              console.log("必须拖动box才能交换")
//            }

          }
          //可移动容器
          if((dbox&&!upbox&&dbox.card.style)||(dbox&&upbox&&dbox!=upbox&&dbox.card.style)){
            console.log("移动位置")
            this.boxMove(dbox)
          }
          Bus.downBox = null;
        }
        e.preventDefault();
      },
      boxMove:function (dbox) {
        if(dbox.card.style.right){
          dbox.card.style.right =this.toDw(dbox.card.style.right,(Bus.downP.x-Bus.upP.x ));
        }else{
          dbox.card.style.left =this.toDw(dbox.card.style.left,(Bus.upP.x - Bus.downP.x));
        }
        if(dbox.card.style.bottom){
          dbox.card.style.bottom = this.toDw(dbox.card.style.bottom,( Bus.downP.y-Bus.upP.y));
        }else{
          dbox.card.style.top = this.toDw(dbox.card.style.top,(Bus.upP.y - Bus.downP.y));
        }
      },
      //单位转换
      toDw:function (x,relative) {
        if(x.indexOf("px")>-1){
          return parseFloat(x)+relative+"px";
        }else if(x.indexOf("%")>-1){
          return parseInt(parseFloat(x)+parseFloat(relative/375)*100)+"%";
        }else if(x.indexOf("rem")>-1){
          return parseInt(parseFloat(parseFloat(x)+parseInt(relative)/50)*10)/10+"rem";
        }
      }
    },
  };

</script>
