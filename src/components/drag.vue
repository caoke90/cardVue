<template>
  <div
    @click="click"
       @touchstart="mousedown"
       @touchend="mouseup"
       @mousedown="mousedown"
       @mouseup="mouseup">

    <slot></slot>
  </div>
</template>

<script>
  var $ = require('jquery');
  import Bus from '../marvel/bus';

  export default{
    props:['item','contain'],
    data:function () {
      return {
        hover:true
      }
    },
    components:{
      'mod': require('./mod.vue'),
    },

    methods:{
      click:function (e) {
        //触发编辑操作
        if(this.contain=="mainChild"){
          var mid=$(e.target).parents("[mid]").attr("mid")
          if(mid){
            var cid=$(e.target).parents("[cid]").attr("cid")
            if(cid){
              Bus.editCardData=this.findVue(cid,this).card;
              Bus.$emit("edit")
            }else{
              Bus.editCardData=this.findVue($(e.target).parents("[mid]").attr("mid"),this).card;
              Bus.$emit("edit")
            }
          }
        }
      },
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
        if(!box.card.card_group){
          console.log("不能添加card，需要放入box中")
          alert("不能直接添加card，需要放入容器中")
          return;
        }
        console.log(box.card.card_group)

        var obj=JSON.parse(JSON.stringify(box.card))
        obj.cardId="c"+(Bus.index++)
        //激活挂件
        if(obj.style){
          obj.isPandent=true
          obj.style.left="1.3rem"
          obj.style.top="2rem"
          Bus.root.mainChild.push(obj)
          return;
        }
        if(!upbox){
          Bus.root.mainChild.push(obj)
        }else{
          var index=Bus.root.mainChild.indexOf(upbox.card)
          Bus.root.mainChild.splice(index+1,0,box.card)
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
          upbox.card.card_group.splice(index+1,0,box.card)
        }else{
          upbox.card.card_group.push(box.card)
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

      mousedown:function (e) {

//        if(Bus.downBox&&Bus.downBox.card.isPandent){
//          console.log("我是挂件")
//          return;
//        }
        Bus.downP={
          x:e.x,
          y:e.y,
        }
        Bus.downTarget=e.target;
        Bus.downRoot=this;
        Bus.downBox= this.findVue($(Bus.downTarget).parents("[mid]").attr("mid"), Bus.downRoot)
		e.preventDefault();
      },
      mouseup:function (e) {
        if (!Bus.downBox) {
          return;
        }
        console.log(e.x, e.y)
        Bus.upP = {
          x: e.x,
          y: e.y,
        }
        Bus.upTarget = e.target;
        Bus.upRoot = this;
        var dbox=Bus.downBox;
        //添加新的
        if (Bus.downRoot.contain == "children" && Bus.upRoot.contain == "mainChild") {
          var bid = $(e.target).parents("[mid]").attr("mid")
//          var dbox = this.findVue($(Bus.downTarget).parents("[mid]").attr("mid"), Bus.downRoot)
          //如果在box中
          if (bid) {
            console.log("插入一个新的")
            //获取原来的box
            var upbox = this.findVue($(Bus.upTarget).parents("[mid]").attr("mid"), Bus.upRoot)

            //把box插入到upbox
            if (!dbox.card.card_group && upbox.card.card_group) {
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
        if (Bus.downRoot.contain == "mainChild" && Bus.upRoot.contain == "children") {
//          var dbox = this.findVue($(Bus.downTarget).parents("[mid]").attr("mid"), Bus.downRoot)
          var cid = $(Bus.downTarget).parents("[cid]").attr("cid")

          if(cid&&Array.isArray(dbox.card.card_group)){
            var box1 = this.findVue(cid, dbox)
            this.boxDel(dbox, box1)
          }else{
            this.boxDel(dbox)
          }
        }

        //移动
        if (Bus.downRoot.contain == "mainChild" && Bus.upRoot.contain == "mainChild") {

//          var dbox = this.findVue($(Bus.downTarget).parents("[mid]").attr("mid"), Bus.downRoot)
          var upbox = this.findVue($(Bus.upTarget).parents("[mid]").attr("mid"), Bus.upRoot)

          //不可移动容器内部交换
          if(dbox&&upbox&&dbox._uid==upbox._uid&&!dbox.card.isPandent){
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
          if(dbox&&upbox&&dbox._uid==upbox._uid&&dbox.card.isPandent){
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
          if(dbox&&upbox&&dbox._uid!=upbox._uid&&!dbox.card.isPandent&&!upbox.card.isPandent){

            if($(Bus.downTarget).attr("cardType")=="box"){
              console.log("box和box交换")
              this.exchange(dbox, upbox)
            }else{
              console.log("必须拖动box才能交换")
            }

          }
          //可移动容器
          if((dbox&&!upbox&&dbox.card.isPandent)||(dbox&&upbox&&dbox!=upbox&&dbox.card.isPandent)){
            console.log("移动位置")
            this.boxMove(dbox)
          }
          Bus.downBox = null;
        }
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
