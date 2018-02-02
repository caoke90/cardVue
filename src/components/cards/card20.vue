<template>
  <div class="card m-panel card20" :class="['m-col-'+card.col]">
    <div class="card-wrap">
      <div class="card-main">
        <h2 class="card-title" v-if="card.title" v-text="card.title"></h2>
        <div v-for="itemNum in itemsNum">
          <div class=" m-auto-list">
            <div class="m-auto-box" v-for="index in itemNum" @touchstart="touchstart($event)" @touchmove="touchmove($event)" @touchend="touchmove($event)">
              <div class="m-img-box m-imghold-wide" @click="imgclick(card.items[index])">
                <mv-img :style="{height:card.height}" :needlazy="true" :src="card.items[index].pic"></mv-img>
                <div class="m-btn-round m-btn-media" v-if="card.items[index].media_info">
                  <img src="../../assets/img/common_icon_play.png"/>
                </div>
              </div>
              <div class="m-text-box" @click="openUrl(card.items[index].scheme)">
                <h3 class="m-text-cut" v-text="card.items[index].title"></h3>
                <h4 v-html="card.items[index].title_sub"></h4>
              </div>
            </div>
          </div>
          <div class="m-panel">
            <div class="m-item-box" v-for="index in itemNum" v-if="card.col==2">
              <div v-if="card.items[index].bottom_info.scheme" @touchstart="touchstart($event)" @touchmove="touchmove($event)" @touchend="touchmove($event)" class="m-diy-btn m-box-col  m-box-center-a" @click="openUrl(card.items[index].bottom_info.scheme)"><mv-img  :src="card.items[index].bottom_info.pic" ></mv-img><h4 v-text="card.items[index].bottom_info.text"></h4></div>
              <div v-else class="m-diy-btn m-box-col  m-box-center-a"><mv-img :src="card.items[index].bottom_info.pic"></mv-img><h4 v-text="card.items[index].bottom_info.text"></h4></div>
            </div>
            <div class="m-item-box" v-for="index in itemNum" v-if="card.col==4">
              <div v-if="card.items[index].bottom_info.scheme" @touchstart="touchstart($event)" @touchmove="touchmove($event)" @touchend="touchmove($event)" class="m-diy-btn m-box-col m-box-center" @click="openUrl(card.items[index].bottom_info.scheme)"><h4 v-text="card.items[index].bottom_info.text"></h4></div>
              <div v-else class="m-diy-btn m-box-col  m-box-center"><h4 v-text="card.items[index].bottom_info.text"></h4></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import Bus from '../../marvel/bus';
  export default {
    data() {
      return {
      };
    },
    name: "card20",
    props: ['card'],
    components: {},
    created:function () {
      if(!this.card.col){
        this.card.col=2;
      }
    },
    computed:{
      itemsNum:function () {
        var arr=[]
        var col=this.card.col;
        this.card.items.forEach(function (item,num) {
          if(num%col==0){
            arr[parseInt(num/col)]=[]
          }
          arr[parseInt(num/col)].push(num)
        })
        return arr;
      }
    },
    methods: {
      touchstart:function (e) {
        if(Bus.mActive){
          Bus.mActive.classList.remove("m-active")
        }
        Bus.mActive=e.currentTarget;
        Bus.mActive.classList.add("m-active")

      },
      touchmove:function (e) {
        if(Bus.mActive){
          Bus.mActive.classList.remove("m-active")
          Bus.mActive=null
        }
      },
      imgclick:function (item) {
        if(item.media_info&&item.media_info.stream_url){
          Bus.$emit("openScheme",item.media_info.stream_url);
        }else{
          this.openUrl(item.scheme)
        }
      },
      openUrl:function (url) {
        if(url){
          Bus.$emit("openScheme",url);
        }
      },
    },
  };
</script>
<style rel="stylesheet/scss" type="text/css" lang="scss">
  .card20 .m-text-box h4 .txta{
    color: #FF8200;
  }
</style>
<style rel="stylesheet/scss" type="text/css" lang="scss" scoped>

  .card20 {
    .card-title{
      height: 0.8rem;
      line-height: 0.8rem;
      font-size: 0.34rem;
      color: #333333;
      margin-left:0.24rem;
      margin-bottom: 0 - 0.2rem;
    }
    //均分栅格 上下内间距,左右内间距,列间距,行间距。
    .m-auto-list{
      margin-left: -0.08rem;
      margin-right: -0.08rem;
      margin-bottom: -0.16rem;
      padding: 0.2rem 0.24rem;
    }
    .m-auto-box {
      padding-left: 0.08rem;
      padding-right: 0.08rem;
      margin-bottom: 0.16rem;
      .m-img-box{
        position: relative;
      }
      .m-img-box .m-btn-media{
        position: absolute;
        z-index: 9;
        font-size: 0.168rem;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      .m-text-box{
        position: relative;
        margin:0.14rem 0 0 0;
        h3{
          font-size: 0.3rem;
          max-height: 0.84rem;
        }
        h4{
          .txta{
            color: #FF8200;
            margin: 0 0.16rem 0 0;
          }
        }
      }
    }
  }

  .card20 .card-wrap .card-main {
    margin-bottom: -1px; }

  .card20 .m-item-box {
    /*调用itembox组件,参看sasscore*/
    height: 0.88rem;
    line-height: 0.88rem;
    text-align: center;
    padding: 0 0.16rem 0 0.24rem; }
  .card20 .m-item-box::before {
    top: 0.16rem;
    bottom: 0.16rem; }
  .card20 .m-item-box::after {
    left: 0.16rem;
    right: 0.16rem; display: none;}
  .card20 .m-item-box .m-diy-btn img {
    width: 0.48rem;
    height: 0.48rem;margin-right: 0.32rem; }
  .card20 .m-item-box .m-diy-btn h4 {
    font-size: 0.32rem;
    margin: 0; }
  .card20.m-col-4 .m-item-box{
    height: 0.66rem;
    line-height: 0.66rem;
  }
  .card20.m-col-4 .m-item-box .m-diy-btn h4 {
    font-size: 0.24rem;
  }

</style>
