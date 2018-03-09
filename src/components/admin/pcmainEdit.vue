<template>
  <div class="mainEdit" >
    <div class="page" id="mainEdit">
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
        return (window.innerHeight)+"px"
      }
    },
    methods: {}
  };

</script>
<style rel="stylesheet/scss" type="text/css" lang="scss" scoped>
  .mainEdit{
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
