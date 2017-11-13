<template>
  <x-dialog v-model="show2" class="dialog-demo">
    <div class="img-box">
      <img :src="card.src" style="max-width:7.5rem;">
    </div>
    <div @click="show2=false">
      <span class="vux-close"></span>
    </div>
  </x-dialog>
</template>

<script>
  import 'vux/src/styles/close.less';
  //slider
  import xDialog from 'vux/src/components/x-dialog'


  export default{
    name:"screendialog",
    props:['card'],
    data:function () {
      return {
        show2:true
      }
    },
    components: {
      xDialog,
    },
    methods:{
      log:function (msg) {
          console.log(msg)
      },
      jump:function () {
        this.show2=false
      }
    },
    mounted:function () {
      setTimeout(()=>{
        this.show2=false
      },3000)
    }
  };

</script>
<style rel="stylesheet/scss" type="text/css" lang="scss" >

  .dialog-demo {
    .weui-dialog{
      border-radius: 8px;
      padding-bottom: 8px;
    }
    .dialog-title {
      line-height: 30px;
      color: #666;
    }
    .img-box {
      height: 350px;
      overflow: hidden;
    }
    .vux-close {
      margin-top: 8px;
      margin-bottom: 8px;
    }
  }
</style>
