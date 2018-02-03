<template>
  <footer class="m-ctrl-box">
    <div class="box-center" @click="uplodClick" @touchstart="touchstart($event)" @touchmove="touchmove($event)" @touchend="touchmove($event)">
      上传文件
    </div>
    <span class="m-line-gradient"></span>
    <div class="box-center" @click="uplodimgClick" @touchstart="touchstart($event)" @touchmove="touchmove($event)" @touchend="touchmove($event)">
      上传图片
    </div>
    <span class="m-line-gradient" @touchstart="touchstart($event)" @touchmove="touchmove($event)" @touchend="touchmove($event)"></span>
    <div class="box-center">
      提交
    </div>
  </footer>
</template>

<script>
  import Bus from '../../marvel/bus';
  import qs from 'qs';
  import image from '@/utils/image';

  export default {
    props: ['card'],
    data() {
      return {

      };
    },
    created() {

    },
    watch: {
    },
    components: {
    },
    computed: {

    },
    methods: {

      uplodClick:function () {
        var self=this;
        //获取一个文件
       Bus.$emit("getFile",function (file) {
         var formData = new FormData();
         formData.append("file", file)
         let config = {
           headers: {
             'Content-Type': 'multipart/form-data'
           }
         }
         Bus.$http.post("/upload",formData,config).then(function (rst) {
           self.card.card_info.big_card.object.small_pics.push(rst.data.file)
           self.card.card_info.big_card.object.large_pics.push(rst.data.file)
         })
       })
      },
      uplodimgClick:function () {
        var self=this;
        //获取一个文件
        Bus.$emit("getFile",function (imgfile) {

          var options={
            //图片的最大宽高
            compress:{
              width: 1600,
              height: 1600,
              quality: 1,
            }
          }

          image.compress(imgfile, options, function(file){
            if(file){
              var formData = new FormData();
              formData.append("file", file)
              let config = {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }
              Bus.$http.post("/upload",formData,config).then(function (rst) {
                self.card.card_info.big_card.object.small_pics.push(rst.data.file)
                self.card.card_info.big_card.object.large_pics.push(rst.data.file)
              })
            }
          });
//          var formData = new FormData();
//          formData.append("file", file)
//          let config = {
//            headers: {
//              'Content-Type': 'multipart/form-data'
//            }
//          }
//          Bus.$http.post("/upload",formData,config).then(function (rst) {
//            self.card.card_info.big_card.object.small_pics.push(rst.data.file)
//            self.card.card_info.big_card.object.large_pics.push(rst.data.file)
//          })
        })
      },
      touchstart: function(e) {
        if(Bus.mActive) {
          Bus.mActive.classList.remove("m-active")
        }
        Bus.mActive = e.currentTarget;
        Bus.mActive.classList.add("m-active")
      },
      touchmove: function(e) {
        if(Bus.mActive) {
          Bus.mActive.classList.remove("m-active")
          Bus.mActive = null
        }
      },

    }
  };
</script>
<style lang="scss" scoped="scoped">
  @import "../../scss/_sassCore";
  @import "../../scss/_var";
  .active {
    background-color: #ebebeb;
  }

  .m-ctrl-box {
    border-top-width: 1px;
    border-right-width: 0;
    border-bottom-width: 0;
    border-left-width: 0;
    border-color: #e6e6e6;
    border-style: solid;
    height: 0.69rem;
    line-height: 0.68rem;
    color: #939393;
    overflow: hidden;
    font-size: 0.26rem;
    .box-center {
      width: 33%;
      float: left;
      text-align: center;
    }
    .m-line-gradient {
      position: relative;
      float: left;
      top: 0.1rem;
      width: 0.01rem;
      min-width: 0.5px;
      background-color: #e6e6e6;
      height: 0.48rem;
      -webkit-mask: -webkit-linear-gradient(top,transparent,#000 30%,#000 70%,transparent);
    }
    .font {
      font-size: 0.34rem;
      vertical-align: -10%;
      margin-right: 0.04rem;
    }
    .m-icon{
      vertical-align: -7%;
      font-size: 0.32rem;
    }

  }
</style>
