<template>
  <div class="card card58">
    <div class="card-wrap">
      <div class="card-main">
        <fieldset>
          <legend @click="openUrl(card.scheme)">{{card.name}}</legend>
        </fieldset>
      </div>
    </div>
  </div>
</template>
<script>
  import Bus from '../../marvel/bus';
  export default {
    data() {
      return {};
    },
    name: "card30",
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

  .card58 fieldset {
    border-top-width: 1px;
    border-right-width: 0;
    border-bottom-width: 0;
    border-left-width: 0;
    border-color: #e6e6e6;
    border-style: solid;
    text-align: center;
    font-size: 0.24rem; }

  .card58 legend {
    color:#507DAF;
    padding: 0 0.4rem; }

</style>
