<template>
  <div style="margin:0 auto;max-width: 750px;position: relative;">
    <div v-for="(v,k) in mainChild" :key="k">
      <mod :card="v"></mod>
    </div>
  </div>
</template>

<script>
  require("../common/marvel.css");
  const app={
    data:function () {
      return {
        mainChild:[
          {
            "card_type": "card3",
            "defaultIndex": 0,
            "height": "1.68rem",
            "pic_items": [
              {
                "src": "https://mu1.sinaimg.cn/original/weiyinyue.music.sina.com.cn/operation/focusphoto/d113439950455a333801337c33243af5.jpg",
                "openurl": "sinaweibo://userinfo?uid=1252397723",

              },
              {
                "src": "https://mu1.sinaimg.cn/original/weiyinyue.music.sina.com.cn/operation/focusphoto/4871eeb931119a827760931d2dce21d6.jpg",
                "openurl": "sinaweibo://userinfo?uid=1252397723",

              },
              {
                "src": "https://mu1.sinaimg.cn/original/weiyinyue.music.sina.com.cn/operation/focusphoto/4871eeb931119a827760931d2dce21d6.jpg",
                "openurl": "sinaweibo://userinfo?uid=1252397723",

              },
              {
                "src": "https://mu1.sinaimg.cn/original/weiyinyue.music.sina.com.cn/operation/focusphoto/4871eeb931119a827760931d2dce21d6.jpg",
                "openurl": "sinaweibo://userinfo?uid=1252397723",

              },
            ]
          },
          {
            "card_type":"card8",
            "card_id": 0,
            "pic":"http://ww1.sinaimg.cn/bmiddle/621ff2c2jw1euszju29puj20b40b4myi.jpg",
            "title_sub":"",
            "desc1":"苹果",
            "desc2":"详情",
            "scheme":"",
            "button":[{
              name:"点评",
              pic:"",
              type:"link",
              params:"",
            }],

          },
        ]
      };
    },
    components: {
      'mod': require('../components/mod.vue')
    },
    mounted:function () {

    }
  };

  export default app;
</script>

<style rel="stylesheet/scss" type="text/css" lang="scss">


</style>
