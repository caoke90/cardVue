<template>

     <textarea style="width: 100%;height: 100px;">
       {{JSON.stringify(card,null,2)}}
      </textarea>
</template>
<script>
  import Card from "vux/src/components/card"

  export default {
    data() {
      return {};
    },
    name: "card1",
    props: ['card'],
    components: {
      Card
    },
    methods: {

    },
  };
</script>
<style rel="stylesheet/scss" type="text/css" lang="scss" >
  .card-demo-flex {
    display: flex;
  }
  .card-demo-content01 {
    padding: 10px 0;
  }

  .card-demo-flex > div {
    flex: 1;
    text-align: center;
    font-size: 12px;
  }

</style>
