<template>
  <div callback="follow()">
    <div class="m-add-box m-add-al" v-if="curBtn.sub_type == 1">
      <i class="m-font m-font-followed"></i>
      <h4 v-html="'已关注'"></h4>
    </div>
    <div class="m-add-box" v-else>
      <i class="m-font m-font-follow"></i>
      <h4 v-html="'加关注'"></h4>
    </div>
  </div>
</template>
<script>
  export default{
    props: ['btn'],
    data() {
      return {
        curBtn: this.btn
      };
    },
    methods: {
      follow() {
        this.$http.post(this.curBtn.scheme, {
          sub_type: this.curBtn.sub_type
        }).then((res) => {
          if (res.data && res.data.ok > 0) {
            if (res.data.button) {
              this.curBtn = res.data.button;
            }
          } else {
            console.error(res);
          }
        }).catch((res) => {
          console.error(res);
        });
        return false;
      }
    },
  };
</script>
