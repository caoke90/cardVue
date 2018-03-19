<template>
  <div class="mainEdit" >
    <div class="maintop">
      {{toptext}}
      <!--<el-button round @click="set">页面设置</el-button>-->
    </div>
    <div class="page" id="mainEdit">
      <div class="boxcenter" :style="{height:height}" ref="center" :key="Bus.key">
        <div v-for="(v,k) in children" v-if="v.type=='page'" :key="v.cardId">
          <mod :card="v" contain="card_group"></mod>
        </div>
        <div v-for="(v,k) in children" v-if="v.type=='ui'" :key="v.cardId">
          <mod :card="v" contain="card_group"></mod>
        </div>
        <div v-for="(v,k) in children" v-if="v.type=='box'" :key="v.cardId">
          <mod :card="v" contain="card_group"></mod>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

  import Bus from '../../marvel/bus';
  Bus.key=0
  export default{
    props:['children'],
    data:function () {
      return {
        Bus:Bus,
        toptext:""
      }
    },
    components: {
      'mod': require('./modDev.vue'),
    },

    computed:{

      height:function () {
        return (window.innerHeight-100)+"px"
      }
    },
    created:function () {
      Bus.mainEdit=this;
    },
    methods: {

    }
  };

</script>
<style rel="stylesheet/scss" type="text/css" lang="scss" scoped>
  .mainEdit{
    width: 575px;
    margin: 0 auto;
    background: url("../../assets/img/phone.png") top center;
    background-repeat: no-repeat;
    background-size: 407px;
    .maintop{
      height: 100px;
      color: #fff;
      text-align: center;
      font-size: 20px;
      line-height: 100px;
    }
    .page{
      position: relative;
      overflow-x: hidden;
      overflow-y: scroll;
    }
    .boxcenter{
      width: 375px;margin: 0 auto;position: relative;
      background: #f0f0f0;
    }
  }
</style>
