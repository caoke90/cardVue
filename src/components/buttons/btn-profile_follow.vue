<template>
  <component :is="btnType" :btn="btn" @changeSubType="changeSubType"></component>
</template>
<script>
  export default{
    props: ['btn'],
    computed: {
      btnType() {
        if (+this.sub_type) {
          return 'btn-followed_user';
        }
        return 'btn-follow_user';
      }
    },
    data() {
      return {
        sub_type: this.btn.sub_type,
      };
    },
    methods: {
      changeSubType() {
        this.sub_type = +!this.sub_type;
      },
    },
    components: {
      'btn-followed_user'(resolve) {
        require(['./btn-followed_user.vue'], resolve);
      },
      'btn-follow_user'(resolve) {
        require(['./btn-follow_user.vue'], resolve);
      },
    }
  };
</script>
