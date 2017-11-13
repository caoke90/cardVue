<template>
  <img :src="lazysrc" />
</template>
<script>
  import Bus from '../bus';
  import nonepng from '../../assets/img/none.png';
  var config={
    loaded:false
  };


  var list=[]
  var running=false;
  var lazyFuc=function (e) {
    if(!config.loaded){return;}
    if(running){
      return;
    }
    running=true;
    var windowHeight=document.documentElement.clientHeight || window.innerHeight;
    var windowWidth=document.documentElement.clientWidth || window.innerWidth;
    var temp=[]
    for(var i=0;i<list.length;i++){
      var obj=list[i].$el.getBoundingClientRect()
      if((obj.top  < windowHeight+320) && (obj.right-100 < windowWidth)){
        list[i].isShow=true
      }
      if(!list[i].isShow){
        temp.push(list[i])
      }
    }
    list=temp;
    running=false;

  }

  window.addEventListener('scroll', lazyFuc);
  window.addEventListener('touchstart', lazyFuc);
  window.addEventListener('touchend', lazyFuc);
  //首屏加载图片优化
  window.onload = function () {
    config.loaded=true;
    Bus.loaded=true;
  };

  var cache=[];
  export default{
    name: 'img',
    data:function () {
      return {
        isShow:false,
        config:config
      }
    },
    mounted:function(){
      if(this.needlazy&&!this.isShow){
        list.push(this);
      }
      var windowHeight=document.documentElement.clientHeight || window.innerHeight;
      var windowWidth=document.documentElement.clientWidth || window.innerWidth;
      var obj=this.$el.getBoundingClientRect()
      if((obj.top  < windowHeight) && (obj.right-100 < windowWidth)){
        this.isShow=true;
      }

    },
    computed:{
      lazysrc() {
        if(cache.indexOf(this.src)>-1){
          return this.src;
        }

        if(!this.needlazy||this.isShow){
          this.isShow=true;
          var hsrc=this.src.replace("http:","https:")
          cache.push(hsrc)
          return hsrc;
        }else{
          return nonepng;
        }
      }
    },

    props: {
      needlazy: {
        type: Boolean,
        default: false,
      },
      src: {
        type: String,
        default: '',
      },
    }
  };
</script>
