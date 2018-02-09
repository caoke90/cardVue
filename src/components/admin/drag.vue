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
  var helpJSON = require('./cardshelp');
  import Bus from '../../marvel/bus';

  //添加card
  Bus.addCard=function (cardname) {
    var card=cardsDic.getCardData(cardname)
    card.cardId=Bus.index++
    if(card.type=="box"||card.card_group){
      Bus.root.card_group.push(card)
      Bus.editCard(card)
    }else if(card.type=="ui"){
      Bus.root.card_group.push(card)
      Bus.editCard(card)
    }else{
      //编辑状态
      if(Bus.root.editCardData){
        var temp=Bus.findCard(Bus.root.editCardData);
        //插入到容器
        if(Bus.root.editCardData.type=='box'&&Array.isArray(Bus.root.editCardData.card_group)){
          Bus.root.editCardData.card_group.push(card)
        }else if(Bus.root.editCardData.type=='ui'){
          var card10=cardsDic.getCardData("card10")
          card10.card_group.push(card)
          Bus.root.card_group.push(card10)
          Bus.editCard(card)
        }else{
          //插入card
          temp.parentCardArr.splice(temp.index+1,0,card)
          Bus.editCard(card)
        }
      }else{
        var card10=cardsDic.getCardData("card10")
        card10.card_group.push(card)
        Bus.root.card_group.push(card10)
        Bus.editCard(card)
      }
    }

  }
  //删除card
  Bus.delCard=function (card) {
    var temp=Bus.findCard(card)
    temp.parentCardArr.splice(temp.index,1)
    Bus.root.editCardData=null
  }
  //查找card
  Bus.findCard=function (card) {
    var index=0;
    var parentCardArr=null;
    var parentCard=null;
    Bus.root.card_group.forEach(function (item,i) {
      var item=item;
      if(item.cardId==card.cardId){
        parentCard=Bus.root;
        parentCardArr=Bus.root.card_group;
        index=i;
        return;
      }
      if(item.card_group){
        item.card_group.forEach(function (item2,i2) {
          if(item2.cardId==card.cardId){
            parentCard=item;
            parentCardArr=item.card_group;
            index=i2;
            return;
          }
        })
      }
    })
    return {
      index:index,
      parentCardArr:parentCardArr,
      parentCard:parentCard,
    }
  },
  //编辑card
  Bus.editCard=function (card) {
    var helpItem=helpJSON.getCardData(card.card_type);
    //存在异步数据
    if(helpItem.sync){
      Bus.root.editCardData=card;
      helpItem.sync(function () {
        Bus.root.editCardData=card;
      })
    }else{
      Bus.root.editCardData=card;
    }

  }
  //往上
  Bus.upCard=function (card) {
    console.log("up")
    var temp=Bus.findCard(card)
    if(temp.index>0){
      var index2=temp.index-1

      while(temp.parentCardArr[index2]&&temp.parentCardArr[index2].type=="ui"){
        index2--
      }
      console.log(temp.index)
      console.log(index2)
      if(index2<0){return;}
      var cache=temp.parentCardArr[index2]
      temp.parentCardArr[index2]=card
      temp.parentCardArr[temp.index]=cache;

      //更新dom
      Bus.root.cardId++
    }
  }
  //往下
  Bus.downCard=function (card) {
    console.log("down")
    var temp=Bus.findCard(card)
    console.log(temp.parentCardArr.length)
    if(temp.index<temp.parentCardArr.length-1){
      console.log(temp.index)
      var index2=temp.index+1
      while(temp.parentCardArr[index2]&&temp.parentCardArr[index2].type=="ui"){
        index2++
      }
      if(index2>=temp.parentCardArr.length){
        return;
      }
      var cache=temp.parentCardArr[index2]
      temp.parentCardArr[index2]=card
      temp.parentCardArr[temp.index]=cache;
      //更新dom
      Bus.root.cardId++
    }
  }

  Bus.findDom=function(card,$root) {
    if(!$root){
      $root=Bus.root;
    }
    if($root.card&&$root.card.cardId==card.cardId){
      return $root.$el;
    }
    for(var i=0;i<$root.$children.length;i++){
      var back=Bus.findDom(card,$root.$children[i])
      if(back){
        return back;
      }
    }
  },
  $(document).keyup(function(event){
    console.log(event.keyCode)
    if(Bus.root.editCardData&&Bus.root.editCardData.type!="ui"){
      if (event.keyCode === 40||event.keyCode === 39){
        Bus.downCard(Bus.root.editCardData)
      }
      if ( event.keyCode === 38||event.keyCode === 37){
        Bus.upCard(Bus.root.editCardData)
      }
    }

  });
  export default{
    props:['item'],
    data:function () {
      return {
        hover:true
      }
    },
    components:{
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
      exchange:function (box,upbox) {
        var index=Bus.root.card_group.indexOf(box.card)
        var index2=Bus.root.card_group.indexOf(upbox.card)
        var temp=Bus.root.card_group[index];
        Bus.root.card_group[index]=Bus.root.card_group[index2];
        Bus.root.card_group[index2]=temp;
        //更新
        Bus.root.cardId++
      },

      boxExchange:function (upbox,box,boxTarget) {
        var index=upbox.card.card_group.indexOf(box.card)
        var index2=upbox.card.card_group.indexOf(boxTarget.card)

        var temp=upbox.card.card_group[index];
        upbox.card.card_group[index]=upbox.card.card_group[index2];
        upbox.card.card_group[index2]=temp;
        //更新
        upbox.card.cardId++

      },
      click:function (e) {
        //触发编辑操作
        var cContain=$(e.target).parents("[contain]").attr("contain")
        if(cContain=="card_group"){
          var mid=$(e.target).parents("[mid]").attr("mid")
          if(!mid){
            Bus.root.editCardData=null
            return;
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
        if(Bus.downBox){
          if(Bus.downBox.card&&(Bus.downBox.card.card_type==11||Bus.downBox.card.card_type=="card11")){
            $("#dragbox #dragClone").remove();
            e.preventDefault()
            return;
          }
        }

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
        //移动
        if (Bus.dContain == "card_group" && Bus.uContain == "card_group") {

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
              dbox.card.style=JSON.parse(JSON.stringify(dbox.card.style));
              console.log("box内部移动")
            }
          }
          //如果在box中
          if(dbox&&upbox&&dbox._uid!=upbox._uid&&!dbox.card.style&&!upbox.card.style){
            this.exchange(dbox, upbox)

          }
          //可移动容器
          if((dbox&&!upbox&&dbox.card.style)||(dbox&&upbox&&dbox!=upbox&&dbox.card.style)){
            console.log("移动位置")
            this.boxMove(dbox)
            dbox.card.style=JSON.parse(JSON.stringify(dbox.card.style));
          }
          Bus.downBox = null;
        }
        e.preventDefault();
      },
      boxMove:function (dbox) {
        var card=dbox.card;
        var rect=dbox.$el.getBoundingClientRect();
        if(card.style.right){
          var right =this.toDw(card.style.right,(Bus.downP.x-Bus.upP.x ));
          if(parseFloat(card.style.right)>3.5){
            card.style.left=(7.5-parseFloat(card.style.right)-rect.width/50).toFixed(2)+"rem";
            delete card.style.right;
          }else{
            card.style.right=right;
          }
        }else{
          var left =this.toDw(card.style.left,(Bus.upP.x - Bus.downP.x));
          if(parseFloat(left)>3.5){
            card.style.right=(7.5-parseFloat(left)-rect.width/50).toFixed(2)+"rem";
            delete card.style.left;
          }else{
            card.style.left=left;
          }
        }
        if(card.style.bottom){
          var bottom= this.toDw(card.style.bottom,( Bus.downP.y-Bus.upP.y));
          if(card.style.position=="fixed"&&parseFloat(card.style.bottom)>window.innerHeight/100){
            card.style.top=(window.innerHeight/50-parseFloat(card.style.bottom)-rect.height/50).toFixed(2)+"rem";
            delete card.style.bottom;

          }else{
            card.style.bottom=bottom;
          }
        }else{
          var top = this.toDw(card.style.top,(Bus.upP.y - Bus.downP.y));
          if(card.style.position=="fixed"&&parseFloat(card.style.top)>window.innerHeight/100){
            card.style.bottom=(window.innerHeight/50-parseFloat(card.style.top)-rect.height/50).toFixed(2)+"rem";
            delete card.style.top;
          }else{
            card.style.top=top;
          }


        }
      },
      //单位转换
      toDw:function (x,relative) {
        if(x.indexOf("px")>-1){
          return parseFloat(x)+relative+"px";
        }else if(x.indexOf("%")>-1){
          return parseInt(parseFloat(x)+parseFloat(relative/375)*100)+"%";
        }else if(x.indexOf("rem")>-1){
          return (parseInt(parseFloat(parseFloat(x)+parseInt(relative)/50)*5)/5||0)+"rem";
        }
      }
    },
  };

</script>
