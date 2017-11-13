<template>
  <div class="m-add-box" v-else callback="follow()">
    <span class="m-add-box">
      <i class="m-font"
        :class="{'m-font-check': userInfo && userInfo.follow_me, 'm-font-plus': !userInfo || (userInfo && !userInfo.follow_me)}"></i>
      <h4>加关注</h4>
    </span>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Bus from '@/marvel/bus';
import wordsCount from '@/filters/wordsCount';
export default{
  props: ['btn'],
  name: 'FollowUser',
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  methods: {
    ...mapActions([
      'setFriendGroup',
    ]),
    /**
     * 加关注
     */
    follow(inputCode, captchaId) {
      this.$http.post('api/friendships/create', Object.assign({
        code: inputCode,
        capId: captchaId
      }, this.btn.params)).then((response) => {
        const resData = response.data;
        if (resData && resData.ok > 0) {
          this.$emit('changeSubType');
          this.setFriendGroup(this.btn.params);
        } else {
          // 处理错误类型和错误码
          if (resData.error_type === 'alert') {
            if (resData.msg && wordsCount(resData.msg) > 10) {
              Bus.$emit('mvMsgbox', {
                type: 'alert',
                text: resData.msg
              });
            } else {
              Bus.$emit('mvToast', {
                type: 'error',
                text: resData.msg || '加关注失败'
              });
            }
          } else if (resData.error_type === 'captcha' || resData.errno === '20031') {
            const validate = function (str) {
              return str.length > 0 && str.length < 10;
            };
            const capId = resData.captId || resData.extra;
            const picUrl = `${this.$http.defaults.baseURL}/api/captcha/show?captchaId=${capId}`;
            Bus.$emit('mvMsgbox', {
              title: resData.msg,
              type: 'prompt',
              pic: picUrl,
              validate: validate
            }, (inputStr) => {
              if (inputStr) {
                Bus.$emit('mvMsgbox', false);
                this.follow(inputStr, capId);
              }
            });
          }
        }
      });
    },
  },
};
</script>
