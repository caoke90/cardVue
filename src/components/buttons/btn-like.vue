<template>
  <div class="m-diy-btn m-box-col m-box-center m-box-center-a" callback="like()">
    <i class="m-icon m-icon-large" :class="icon"></i>
    <h4 v-if="btn.params.attitudes_count" v-html="btn.params.attitudes_count"></h4>
  </div>
</template>
<script>
  export default{
    props: ['btn'],
    data() {
      return {};
    },
    created() {
    // this.liked = this.item.liked;
    // this.like_counts = this.item.like_counts;
    },
    computed: {
      icon() {
        let cls = 'm-icon-like';
        if (this.btn.sub_type * 1 === 1) {
          cls += 'd';
        }
        return cls;
      }
    },
    methods: {
      like() {
        const that = this;
        this.$http.post(this.btn.scheme, {
          sub_type: this.btn.sub_type
        }).then(function (response) {
          if (response.data && response.data.ok > 0) {
            const c = that.btn.params.attitudes_count;
            if (response.data.button) {
              that.btn = response.data.button;
            }
            if (that.btn.sub_type) {
              that.btn.params.attitudes_count = c + 1;
            } else {
              that.btn.params.attitudes_count = c - 1;
            }
          } else {
            console.log(response);
          }
        }, function (response) {
          console.log(response);
        });
        return false;
      }
    }
  };
</script>
