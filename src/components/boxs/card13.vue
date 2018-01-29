<!--可移动、可调整大小的图片-->
<template>
  <a :href="card.openurl||'javascript:void(0);'"><img :style="{width:card.width,height:card.height}" :src="card.src"></a>
</template>

<script>
  export default{
    name:"card13",
    props:['card']
  };

</script>
<style rel="stylesheet/scss" type="text/css" lang="scss" scoped>

</style>
