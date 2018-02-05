<template>
<div>
  <component v-for="name in modalcomponent" :is="'mv-'+name" :key="name"></component>
</div>
</template>
<script>
  import Bus from '../bus';

  export default{
    name: 'modal',
    data:function () {
      return {
        "modalcomponent":Bus.modalComponent
      }
    },

    props: {
    },
  };
</script>
