<template>
  <div class="m-diy-btn m-box-col m-box-center m-box-center-a" callback="callback()">
    <img v-if="btn.pic" :src="btn.pic" height="24" width="24">
    <h4 v-html="btn.name"></h4>
  </div>
</template>
<script>
  import Bus from '@/marvel/bus';
  export default {
    props: ['btn'],
    data() {
      return {};
    },
    methods: {
      callback() {
        this.$http.post(this.btn.scheme, {
          sub_type: this.btn.sub_type
        }).then((response) => {
          const data = response.data;
          if (data && data.ok > 0) {
            if (data.msg) {
              Bus.$emit('mvToast', {
                text: data.msg
              });
            }
            if (data.button) {
              this.btn = data.button;
            }
            if (data.scheme) {
              location.href = data.scheme;
            }
          } else {
            if (data.msg) {
              Bus.$emit('mvToast', {
                type: 'error',
                text: data.msg
              });
            }
          }
        }, () => {
          Bus.$emit('mvToast', {
            type: 'error',
            text: '请求接口失败'
          });
        });

        return false;
      }
    }
  };
</script>
