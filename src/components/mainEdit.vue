<template>
  <div class="mainEdit" id="mainEdit" >
    <div class="boxcenter" :key="Bus.key">
      <div v-for="(v,k) in children" v-if="v.type=='ui'" :key="v.cardId">
        <mod :card="v" contain="card_group"></mod>
      </div>
      <div v-for="(v,k) in children" v-if="v.type!='ui'" :key="v.cardId">
        <mod :card="v" contain="card_group"></mod>
      </div>
    </div>
  </div>

</template>

<script>

  import $ from 'jquery';
  import Bus from '../marvel/bus';
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

    },
    methods: {}
  };

</script>
<style rel="stylesheet/scss" type="text/css" lang="scss" scoped>
  .mainEdit{
    margin: 0 auto;
    width: 575px;
    height: 100vh;
    position: relative;
    overflow-x: hidden;
    overflow-y: scroll;
    .boxcenter{
      width: 375px;height:100vh; border:1px solid rgb(221, 221, 221);margin: 0 auto;position: relative;
    }
  }
</style>
