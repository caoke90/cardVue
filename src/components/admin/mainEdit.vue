<template>
  <div class="mainEdit" id="mainEdit" >
    <div class="page" >
      <div class="boxcenter" :style="{height:height}" ref="center" :key="Bus.key">
        <div v-for="(v,k) in children" v-if="v.type=='ui'" :key="v.cardId">
          <mod :card="v" contain="card_group"></mod>
        </div>
        <div v-for="(v,k) in children" v-if="v.type!='ui'" :key="v.cardId">
          <mod :card="v" contain="card_group"></mod>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

  import $ from 'jquery';
  import Bus from '../../marvel/bus';
  Bus.key=0
  export default{
    props:['children'],
    data:function () {
      return {
        Bus:Bus
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
    methods: {}
  };

</script>
<style rel="stylesheet/scss" type="text/css" lang="scss" scoped>
  .mainEdit{
    width: 575px;
    margin: 0 auto;
    background: url("../../assets/img/phone.png") top center;
    background-repeat: no-repeat;
    background-size: 407px;
    padding-top: 100px;
    .page{
      width: 575px;
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
