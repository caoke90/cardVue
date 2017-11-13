<template>
  <popup
    v-model="show"
    @on-hide="log('hide')" @on-show="log('show')">
    <div class="screenimg">
      <img :src="card.src" style="height: 100vh;width:100%;" />
      <div class="jump" @click="jump()">跳过</div>
    </div>
  </popup>
</template>

<script>
  //slider
  import Popup from 'vux/src/components/popup'


  export default{
    name:"screenimg",
    props:['card'],
    data:function () {
      return {
        show:true
      }
    },
    components: {
      Popup,
    },
    methods:{
      log:function (msg) {
          console.log(msg)
      },
      jump:function () {
        this.show=false
      }
    },
    mounted:function () {
      setTimeout(()=>{
        this.show=false
      },3000)
    }
  };

</script>
<style rel="stylesheet/scss" type="text/css" lang="scss" >
  .screenimg{
    position: relative;
    width: 7.5rem;
    margin: 0 auto;
    .jump{
      color: #666;
      position: absolute;
      right: 0.5rem;
      bottom: 0.5rem;
      border-radius: 0.6rem;
      height: 0.6rem;
      line-height: 0.6rem;
      padding: 0 0.3rem;
      border: 1px solid #ddd;
      background: #fff;
      display: inline-block;
    }
  }
</style>
