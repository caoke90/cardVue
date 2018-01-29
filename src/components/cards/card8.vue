<template>
  <div class="card m-panel card8">
    <div class="card-wrap">
      <div class="card-main">
        <h2 class="card-title" v-if="card.title_sub">
          {{card.title_sub}}
        </h2>
        <div class="m-box">
          <div class="m-img-box" @click="openUrl(card.scheme)">
            <img :src="card.pic">
          </div>
          <div class="m-box-col m-box-dir m-box-center" @click="openUrl(card.scheme)">
            <div class="m-text-box">
              <h3 class="m-text-cut" v-html="card.desc1"></h3>
              <h4 class="m-text-cut-2" v-text="card.desc2"></h4>
            </div>
          </div>
          <div class="box-right m-box-center-a m-box-center  m-btn-box">
            <div class="m-diy-btn m-box-col m-box-center m-box-center-a" @click="openUrl(card.button.params.scheme)">
              <img :src="card.button.pic" height="24" width="24">
              <h4>{{card.button.name}}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Bus from '@/marvel/bus';
  export default {
    data() {
      return {};
    },
    name: "card8",
    props: ['card'],
    components: {
    },
    methods: {
      openUrl:function (url) {
        if(url){
          Bus.$emit("openScheme",url);
        }
      },

    },
  };
</script>
<style rel="stylesheet/scss" type="text/css" lang="scss" scoped>

  .card8{
    .card-wrap{
      .card-main{
        margin: 0;
        padding: 0.2rem 0;
      }
    }
    .m-img-box{
      width: 1.4rem;
      height: 1.4rem;
      margin: 0 0.2rem 0 0;
    }
    .card-title{
      font-size: 0.28rem;
      color: #939393;
      margin-bottom: 0.2rem;
    }
    .m-link-icon2{
      width: 0.88rem;
      height:0.28rem;
    }
  }

</style>
