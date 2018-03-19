<template>
  <div class="card card33 m-panel">
    <div class="mod">
      <div class="mod_list">
        <div class="vote_block line-around">
          <div class="layout-box media-graphic">
            <div class="box-col item-list vo_tit">
              <div class="item-main txt-m mct-a txt-cut-2">{{card.title}}</div>
              <div class="item-minor txt-s mct-d txt-cut">
                <span class="v_tim_box"><a :href="card.launch_user_url" class="v_timl">{{card.launch_user}}</a><i class="begi">发起</i></span>
                <span class="v_timr" v-text="left_time_text"></span>
              </div>
            </div>
            <div class="v_hint">
              <span class="item-main txt-m mct-a hint_t">{{card.all_vote_users}}</span>
              <span class="txt-xs hint_b vot-ct">参与人数</span>
            </div>

          </div>
          <div class="layout-box v_syno">
            <div class="box-col content-text txt-s" v-text="card.desc"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="mod">
      <div class="mod_list">
        <div class="vote_block" :key="key">

          <div class="layout-box tit_box">
            <div class="box-col"><h3 class="title mct-a txt-xs">投票选项</h3></div>
            <span class="txt-xs vot-ct" v-text="max_select_text"></span>
          </div>
          <!--模板中，item-box元素之间及与line-around元素之间不留空格-->
          <div class="line-around big_img" v-if="card.is_pic==1&&card.is_vote!=1">
            <div class="item-box mod-media" v-for="item in card.items" :class="{'big_select':option_ids.indexOf(item.option_id)>-1}">
              <label>
                <div class="media-main">
                  <img  :src="item.pic">
                  <label class="big_inpu"><div class="inner_rin"></div></label>
                  <span class="lay_inpu">
                            <input type="checkbox" :value="item.option_id" @change="select">
                        </span>
                </div>
                <div class="big_txt">
                  <div class="txt-m mct-a sel_tit" v-text="item.title"></div>
                </div>
              </label>
            </div>
          </div>
          <div class="line-around vote_block" v-else-if="card.is_pic==1">
            <div class="v_res_box" v-if="card.items.length>0">
              <div class="layout-box media-graphic v_result v_res_img" v-for="item in card.items" :class="{v_sel_bac:item.is_vote}">
                <div class="mod-media">
                  <div class="media-main">
                    <img :src="item.pic" :style="{width:card.width,height:card.height}">
                  </div>
                </div>
                <div class="box-col item-list img_bg">
                  <div class="box-col item-list txt_main">
                    <div class="txt-s mct-a sel_tit" v-text="item.title"></div>
                    <div class="item-minor"><em class="mct-d txt-s" v-text="item.vote_num"></em><em class="mct-d txt-s">({{item.vote_num_rate}})</em>
                    </div>
                  </div>
                  <div class="inner-line v_prog"  :style="{width:parseFloat(item.vote_num_rate)/100*6.2+'rem'}"></div>
                </div>
              </div>

            </div>
          </div>

          <div class="line-around txt_sel" v-else-if="card.is_vote!=1">
            <ul>
              <li class="sel_li" v-for="item in card.items" :class="{'lay_bac':option_ids.indexOf(item.option_id)>-1}">
                <label class="layout-box v_lay">
                  <div class="box-col">
                    <span class="mct-a txt-s">{{item.title}}</span>
                  </div>
                  <span class="lay_inpu">
                            <input type="checkbox" :value="item.option_id" @change="select">
                        </span>
                </label>
              </li>

            </ul>
          </div>

          <div class="line-around txt_sel" v-else>
            <ul>
              <div class="layout-box media-graphic v_result v_res_txt" v-for="item in card.items" :class="{v_sel_bac:item.is_vote}">
                <div class="box-col item-list img_bg">
                  <div class="box-col item-list txt_main">
                    <div class="txt-s mct-a sel_tit txt-cut">{{item.title}}</div>
                    <div class="item-minor"><em class="mct-d txt-s" v-text="item.vote_num"></em><em class="mct-d txt-s">({{item.vote_num_rate}})</em>
                    </div>
                  </div>
                  <div class="inner-line v_prog" :style="{width:parseFloat(item.vote_num_rate)/100*7.3+'rem'}"></div>
                </div>
              </div>

            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="mod">
      <div class="mod-list">
        <div class="vote_block">
          <div class="optimi_but">
            <div class="btn_buy">
              <a href="javascript:void(0);" @click="toupiao" class="btnA" :class="{disable:option_ids.length==0||card.act_status!=1||card.is_vote==1}">
                <span class="txt_con txt-l" v-text="vote_text"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import Bus from '../../marvel/bus';
  export default {
    data() {
      return {
        key:0,
        option_ids:[],
      };
    },
    name: "card33",
    props: ['card'],
    computed:{
      //投票按钮文案
      vote_text:function () {
        if(this.card.act_status==0){
          return "投票尚未开始";
        }else if(this.card.act_status==1){
          if(this.card.is_vote==1){
            return this.card.button_have_vote_text;
          }
          return this.card.button_vote_text;
        }else{
          return "已结束";
        }
      },
      //最多可投票
      max_select_text:function () {
        if(this.card.max_select_num==1){
          return "单选";
        }else{
          return "最多选"+this.card.max_select_num+"项"
        }
      },
      left_time_text:function () {
        if(this.card.left_time>0){
          var t=this.card.left_time;
          var d = 0;
          var h = 0;
          var m = 0;
          var s = 0;
          d = Math.floor(t / 60 / 60 / 24);

          if(d>10){
            return "剩余"+d+"天";
          }else{
            h = Math.floor(t / 60 / 60 % 24);
            m = Math.floor(t / 60 % 60);
            h=h<10?"0"+h:h;
            m=m<10?"0"+m:m;
            if(d>0){
              d=d<10?"0"+d:d;
              return "剩余"+d+"天"+h+"时"+m+"分";
            }else{
              s = Math.floor(t % 60);
              s=s<10?"0"+s:s;
              return "剩余"+h+"时"+m+"分"+s+"秒";
            }
          }
        }else{
          this.card.act_status=2;
          return "";
        }

      }
    },
    mounted() {
      var setInter = setInterval(() => {
        this.card.left_time--;
        if(this.card.left_time<0){
          clearInterval(setInter);
        }
      }, 1000);

    },
    components: {},
    methods: {
      select:function ($event) {
        if(!$event.target.checked){
          var index=this.option_ids.indexOf($event.target.defaultValue);
          if(index>-1){
            this.option_ids.splice(index,1)
          }
        }else{
          if(this.option_ids.length<this.card.max_select_num){
            this.option_ids.push($event.target.defaultValue)
          }else{
            $event.target.checked=false;
          }
        }
      },
      toupiao:function () {
        if(this.option_ids.length>0&&this.card.is_vote!=1&&this.card.act_status==1){
          var the=this;
          this.$http.post("/subject/h5/callbackoperator",{
            option_ids:this.option_ids.join(","),
            theme_id:this.card.theme_id,
            sort_type:this.card.sort_type,
            callback_type:"vote",
          }).then(function (rst) {
            if (rst.data && rst.data.status==1) {
              the.card.is_vote=1;
              the.card.items=rst.data.data.items;
            }else{
              if(rst.data.data&&rst.data.data.msg){
                Toast(rst.data.data.msg);
              }else{
                Toast("投票失败，请重试！");
              }

            }
          })
        }
      }
    },
  };
</script>
<style>
  a .mct-a,
  .mct-a {
    color: #333333;
  }
  a .mct-d,
  .mct-d {
    color: #929292;
  }
  .txt-s {
    font-size: 0.26rem;
  }
  .txt-l {
    font-size: 0.3rem;
  }
  .txt-m{
    font-size: 0.28rem
  }
  .mod-media {
    position: relative;
    text-align: center;
    margin: 10px 0 10px 8px;
  }

  .mod-media:first-child {
    margin-left: 12px;
  }
  .mod-media .media-main {
    position: relative;
  }
  .mod-media .icon {
    position: absolute;
    right: -5px;
    bottom: -5px;
    z-index: 9;
  }

  .mod-media .icon-video {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .mod-media img {
    display: block;
    vertical-align: top;
  }
  .media-graphic .item-list {
    padding: 0.16rem 0.22rem;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-direction: normal;
    -webkit-box-orient: vertical;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
  }

  .media-graphic .item-main {
    font-weight: bold;
    line-height: 0.36rem;
    overflow: hidden;
  }
  .media-graphic .item-main .btn {
    vertical-align: bottom;
    margin: 0 0 0 0.12rem;
  }
  .media-graphic .item-main .icon {
    vertical-align: -1px;
  }

  .media-graphic .item-minor,
  .media-graphic .item-other {
    padding: 0.08rem 0 0;
    line-height: 0.32rem;
  }
  .layout-box {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
  }
  .layout-box .box-col {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: 100%;
  }

  /*基础card外框*/
  .line-around, .btn-block,
  .module {
    background-color: #fefefe;
    border-top: 1px solid #e9e9e9;
    border-bottom: 1px solid #d8d8d8;
    box-sizing: border-box;
    box-shadow: 0 1px 3px -2px rgba(0, 0, 0, 0.2);
    /*For Retina*/
  }
  @media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2) {
    .line-around, .btn-block,
    .module {
      border: none;
      background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #e9e9e9), color-stop(50%, #e9e9e9), color-stop(50%, transparent)), -webkit-gradient(linear, left top, left bottom, color-stop(50%, transparent), color-stop(50%, transparent), color-stop(100%, #d8d8d8));
      background-image: -webkit-linear-gradient(top, #e9e9e9 0%, #e9e9e9 50%, transparent 50%), -webkit-linear-gradient(top, transparent 50%, #d8d8d8 50%, #d8d8d8 100%);
      background-image: linear-gradient(to bottom, #e9e9e9 0%, #e9e9e9 50%, transparent 50%), inear-gradient(to bottom, transparent 50%, #d8d8d8 50%, #d8d8d8 100%);
      -webkit-background-size: 100% 1px,100% 1px;
      background-size: 100% 1px,100% 1px;
      background-repeat: no-repeat;
      background-position: top,bottom;
    }
  }

  .line-all {
    border: 1px solid #f2f2f2;
  }
  @media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2) {
    .line-all {
      border: none;
      background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #f2f2f2), color-stop(50%, #f2f2f2), color-stop(50%, transparent)), -webkit-gradient(linear, left top, right top, color-stop(50%, transparent), color-stop(50%, #f2f2f2), color-stop(100%, #f2f2f2)), -webkit-gradient(linear, left top, left bottom, color-stop(50%, transparent), color-stop(50%, transparent), color-stop(100%, #f2f2f2)), -webkit-gradient(linear, left top, right top, color-stop(0%, #f2f2f2), color-stop(50%, #f2f2f2), color-stop(50%, transparent));
      background-image: -webkit-linear-gradient(top, #f2f2f2 0%, #f2f2f2 50%, transparent 50%), -webkit-linear-gradient(left, transparent 50%, #f2f2f2 50%, #f2f2f2 100%), -webkit-linear-gradient(top, transparent 50%, #f2f2f2 50%, #f2f2f2 100%), -webkit-linear-gradient(left, #f2f2f2 0%, #f2f2f2 50%, transparent 50%);
      background-image: linear-gradient(to bottom, #f2f2f2 0%, #f2f2f2 50%, transparent 50%), linear-gradient(to right, transparent 50%, #f2f2f2 50%, #f2f2f2 100%), inear-gradient(to bottom, transparent 50%, #f2f2f2 50%, #f2f2f2 100%), linear-gradient(to right, #f2f2f2 0%, #f2f2f2 50%, transparent 50%);
      -webkit-background-sizse: 100% 1px,1px 100%,100% 1px,1px 100%;
      background-size: 100% 1px,1px 100%,100% 1px,1px 100%;
      background-repeat: no-repeat;
      background-position: top,right,bottom,left;
    }
  }
</style>
<style type="text/css" lang="scss" scoped>
  .card33{
    background: #ededed;
    font-size: 0.24rem;
  }

  .vot-ct{
    color: #858585;
  }
  .vot-cb{
    color: #333333;
  }
  .vot-cedit{
    color: #ff8200;
  }
  .vot-cc{
    color: #555555;
  }
  .vot-cd{
    color: #999999;
  }
  .vot-day{
    color: #5386bd;
  }
  .vot-night{
    color: #4478b6;
  }
  /*block*/
  .vote_block *{
    word-break:break-all;
  }
  .line-around{
    margin-bottom: 0.12rem;
  }
  .vote_block .vote_titpic{
    font-size: 0px;
  }
  .vote_block .vote_titpic img{
    width: 100%;
  }
  .vote_block .vo_tit .item-main{
    line-height: 0.4rem;
  }
  .vote_block .vo_tit .item-minor {
    margin-bottom: 0.06rem;
  }
  .vote_block .v_hint{
    text-align: center;
    margin-top: 0.16rem;
    width: 1.2rem;
    height: 0.979rem;
    background-color: #f2f2f2;
    margin-right: 0.24rem;
    border-radius: 0.1rem;
  }
  .vote_block .v_hint .hint_t{
    display: inline-block;
    width: 1.2rem;
    margin-top: 0.1rem;
    overflow: hidden;
    white-space: nowrap;
  }
  .vote_block .v_tim_box{
    display: inline-block;
  }
  .vote_block .v_timl{
    display: inline-block;
    color: #ff8200;
    max-width: 1.76rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }
  .vote_block .v_tim_box .begi{
    vertical-align: middle;
  }
  .vote_block .v_timr{
    vertical-align: middle;
  }
  .vote_block .v_syno{
    /*line-height: 1.063em;*/
    overflow: hidden;
    -webkit-line-clamp: 7;
    text-overflow: ellipsis;
    padding: 0px 0.22rem 0.2rem;
  }
  .vote_block .tit_box{
    padding: 0px 0.22rem;
    margin: 0.2rem 0;
    /*margin-top: -6px;*/
  }
  .vote_block .tit_box .title{}
  .vote_block .txt_sel{
    background-color: #ffffff;
  }
  .vote_block .txt_sel ul{
    padding: 0.1rem 0.1rem 1px;
    margin-bottom: 0.2rem;
  }
  .vote_block .txt_sel .sel_li{
    margin-bottom: 0.1rem;
  }
  .vote_block .txt_sel .v_lay,
  .vote_block .v_sele_box{
    height: 0.54rem;
    -webkit-box-align: center;
    -moz-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 0.16rem 0 0.16rem 0.24rem;
  }
  .vote_block .txt_sel .v_lay{
    background-color: #f6f6f6;
  }
  .vote_block .txt_sel .lay_bac .v_lay{
    background-color: #ffe8d1;
  }
  .vote_block .txt_sel .lay_inpu{
    margin-right: 0.16rem;
  }
  .vote_block .v_more{
    min-height: 0.8rem;
    line-height: 0.76rem;
    text-align: center;
    margin-bottom:0.2rem;
  }
  .vote_block .show_more{
    line-height: 0.34rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 7;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    padding: 0.2rem 0.22rem;
  }
  .vote_block .v_sele_box{
    padding-top: 0px;
    padding-bottom: 0px;
  }
  .vote_block .v_sele_box .lab_inp{
    margin-right: 2px;
    color: #666666;
  }
  .vote_block .v_sele_box .lab_inp input{
    vertical-align: middle;
  }
  .vote_block .optimi_but {
    box-sizing: border-box;
    padding: 0px 0.2rem;
    width: 100%;
    margin-bottom: 0.12rem;
  }
  .vote_block .optimi_but .btn_buy .btnA {
    width: 100%;
    display: block;
    text-align: center;
    color: #fff;
    background: #ff8200;
    border-radius: 2px;
  }
  .vote_block .optimi_but .btn_buy .disable{
    background: #ffc09c;
  }
  .vote_block .optimi_but .btn_buy .txt_con{
    height: 0.72rem;
    line-height: 0.72rem;
  }
  .vote_block .icon_map{
    width: 0.4rem;
    height: 0.4rem;
    background: url("../../assets/img/icon_map.png") no-repeat;
    background-size: 0.4rem 0.4rem;
    padding-bottom: 3px;
  }

  /****鍥剧墖涓庢枃瀛楁姇绁�****/
  .vote_block .v_res_box{
    padding: 0.1rem;
    margin-bottom: 0.18rem;
  }
  .vote_block .v_result{
    margin-bottom: 0.1rem;
    height: 0.96rem;
    overflow: hidden;
  }
  .vote_block .v_res_txt .pos_inpu .lay_inpu{
    position: absolute;
    top: 16px;
    right: 8px;
    z-index: 2;
  }
  .vote_block .v_res_img{

  }
  .vote_block .v_res_img .img_bg .sel_tit{
    margin-bottom: -3px;
  }
  .vote_block .v_result .mod-media{
    margin: 0px 0.1rem 0px 0px;
  }
  .vote_block .v_result .img_bg{
    background-color: #f6f6f6;
    padding: 0px;
    position: relative;
  }
  .vote_block .v_res_img .img_bg .inner-line{
    height: 100%;
    transition: width 1s linear;
    background-color: #e5e5e8;
  }
  .vote_block .v_res_txt .img_bg .inner-line{
    height: 0.96rem;
    transition: width 1s linear;
    background-color: #e5e5e8;
  }
  .vote_block .v_sel_bac .img_bg{
    background-color: #ffe8d1;
  }
  .vote_block .v_sel_bac .img_bg .inner-line{
    background-color: #ffc09f;
    transition: width 1s linear;
  }
  .vote_block .v_result .txt_main{
    z-index: 2;
    position: absolute;
    top: 0.16rem;
  }
  .vote_block .v_result .txt_main .wid_t{
    width: 265px;
  }
  .vote_block .v_res_txt .txt_main .item-minor{
    padding: 0px;
  }
  .vote_block .v_result .img_bg .v_prog{
    position: absolute;
    top: 0px;
    z-index: 1;
  }
  .vote_block .v_result .img_bg .item-list{
    padding: 0px 5px;
  }
  .vote_block .v_result .txt_main .sel_tit{
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 0.36rem;
    max-height: 0.72rem;
    width: 96%;
    z-index: 2;
  }

  .vote_block .big_img {
    font-size: 0;
    padding: 0 0 0.1rem 0.1rem;
    box-sizing: border-box;
  }

  .vote_block .big_img .item-box {
    display: inline-block;
    vertical-align: top;
    width: 50%;
    margin: 0;
    padding: 0.1rem 0.1rem 0 0;
    box-sizing: border-box;
  }
  .vote_block .big_img .item-box img {
    width: 100%;
    /*height: 9.562rem;*/
  }
  .vote_block .big_img .big_inpu{
    position: absolute;
    top: 0.21rem;
    right: 0.1rem;
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    background-color: #000000;
    opacity: 0.4;
  }
  .vote_block .big_img  .inner_rin{
    width: 0.28rem;
    height: 0.28rem;
    display: inline-block;
    margin-top: 0.05rem;
    background: url("../../assets/img/icon_sele_ring.png");
    background-size:100%;
  }
  .vote_block .big_img  .lay_inpu {
    position: absolute;
    top: 0.25rem;
    right: 0.145rem;
  }
  .vote_block .big_img .lay_inpu input[type="checkbox"]{
    border: none;
  }
  .vote_block .big_img .big_txt{
    height: 1rem;
    padding: 0.2rem 0.1rem 0.1rem 0.12rem;
    text-align: left;
    background-color: #f2f2f2;
  }
  .vote_block .big_img .big_select .media-main{
    border: 2px solid #ff8200;
  }
  .vote_block .big_img .big_select .media-main img{
    width: 100%;
    /*height: 9.313rem;*/
  }
  .vote_block .big_img .big_select .big_txt{
    background-color: #ffe8d1;
  }
  .vote_block .big_img .item-box .big_txt .sel_tit{
    max-height: 0.72rem;
    line-height: 0.36rem;
    overflow: hidden;
    margin-bottom:0.1rem;
  }

  .lay_inpu input[type="checkbox"]{
    vertical-align:middle;
    -webkit-appearance:none;
    border-radius: 50%;
    height: 0.3rem;
    width: 0.3rem;
    box-sizing:border-box;
    border:1px solid #cacaca;
    margin: 0;
    text-align: center;
    line-height:0.3rem;
  }
  .lay_inpu input[type="checkbox"]:checked{
    border-color: #ff8200;
    background: #ff8200 url("../../assets/img/icon_rig.png") no-repeat 2px 3px;
    background-size: 80%;
    border-radius: 50%;
  }
  .lay_inpu input[type="checkbox"]:before{
    font-family: "wbfontregular";
    display: inline-block;
    color: #fff;
    visibility: hidden;
  }
  .lay_inpu input[type="checkbox"]:checked:before{
    visibility: visible;
  }
  /*寮瑰嚭灞�*/
  .jump_layer{
    width: 155px;
    height: 50px;
    margin-right: auto;
    margin-left: auto;
    background: rgba(0, 0, 0, 0.7) none repeat scroll 0 0;
    border-radius: 5px;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
  }
  .jump_layer dd {
    padding-top: 18px;
  }
  .jump_layer .txt {
    color: #fff;
    text-align: center;
  }
  /*閫夋嫨鍣�*/
  .vote_block .v_visi{
    padding: 0.24rem;
    line-height: 18px;
  }
  .vote_block .v_opti{
    margin-top: 9px;
  }
  .vote_block .v_opti .box-col{
    position: relative;
    padding: 7px 0;
    text-align: center;
    display: block;
    line-height: 30px;
  }
  /*浜岀骇椤甸潰-淇敼鏃堕棿*/
  .vote_block .dou_butt{
    padding: 8px 12px;
  }
  .vote_block .dou_butt .box-col{
    text-align: center;
  }
  .vote_block .dou_butt .optimi_but{
    padding: 0px;
    width:2.8rem;
  }
  .vote_block .dou_butt .btn_buy{
    border: 1px solid #ff8200;
    border-radius: 3px;
  }
  .vote_block .dou_butt .btn_line{
    border:1px solid #cccccc;
    border-radius: 3px;
    background-color: #ffffff;
  }
  .vote_block .dou_butt .btnB{
    background: #fdfdfd;
    color: #666666;
  }
  .vote_block .dou_butt .butm_rig{
    text-align: right;
  }
  .vote_block .dou_butt .butm_rig .optimi_but{
    display: inline-block;
  }

  /*纭涓庡彇娑堝垹闄�*/
  .pop_up {
    z-index: 100;
    /*position: absolute;*/
  }
  .pop_up .pop_content{
    position: relative;
    height: 44px;
    line-height: 44px;
    font-size: 12px;
    color: #ffffff;
    padding:0 10px;
    text-align: center;
  }
  .opacity_5,.opacity_35 {
    display: block;
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #000000;
  }
  .opacity_5 {
    opacity: .5;
    border-radius: 3px;
  }
  .opacity_35 {
    opacity: .35;
  }
  /*鍙栨秷鍙戦€佸脊灞�*/
  .cancel_sent {
    position: absolute;
    top:0;
    z-index: 999;
    height: 100%;
    width: 100%;
  }
  .cancel_sent .cancel_box {
    position: absolute;
    bottom: 0;
    width: 100%;
    /*border-top: 2px solid #ffa500;*/
    box-shadow: 0 -30px 60px rgba(100,100,100,.3);
    background-color: #e7e7e7;
  }
  .cancel_sent .cancel_box .alert_txt,
  .cancel_sent .cancel_box .btn_txt {
    text-align: center;
    height:48px;
    line-height: 48px;
    font-size: 18px;
    background-color: #f8f8f8;
  }
  .cancel_sent .cancel_box .alert_txt {
    color: #929292;
    border-bottom: 1px solid #e0e0e0;
  }
  .cancel_sent .cancel_box .col_txt{color: #333333;}
  .cancel_sent .cancel_box .btn_txt {
    display: block;
    color: #333333;
  }
  .cancel_sent .cancel_box .confirm_btn .btn_txt{
    color: #ff8200;
  }
  .cancel_sent .cancel_box .cancel_btn {
    margin-top: 4px;
  }
  .cancel_sent .cancel_box .al_custom{position: relative;}
  .cancel_sent .cancel_box .al_custom .cust_tit{position: absolute;left: 43%;top: 0rem;z-index: 9;}
  .cancel_sent .cancel_box .al_sel_time{
    color: #333333;
    border: none;
    -webkit-appearance: none;
    padding-right: 0px;
    padding-left: 0.52rem;
    border-radius: 4px;
    background: #f8f8f8;
    /*background: #ffffff;*/
    height: 0.76rem;
    width: 3.2rem;
    vertical-align: middle;
    z-index: 1;
    position: absolute;
    left: 30%;
    top: 0rem;
  }
  /*缂栬緫*/
  .vote_block .ceili_edit{
    width: 100%;
  }
  .col_edit{
    margin-top: -0.22rem;
    padding: 0.2rem 0rem 0rem 0.32rem;
    margin-bottom: -0.1rem;
  }
  /*鏌ョ湅鏇村*/
  .more-detail{
    height: 38px;
    line-height: 38px;
    text-align: center;
    margin-top: -6px;
  }
  .more-detail .icon-font-arrow-right {
    margin-left: 3px;
    vertical-align: -2px;
  }
  /*涓汉椤�*/
  .vote_block .personal{
    width: 100%;
  }
  .vote_block .personal .per_tit{
    background-color: #fff;
    padding: 10px 0px 10px 12px;
    border-bottom: 1px solid #dadada;
  }
  .vote_block .lazy{
    padding: 10px;
    text-align: center;
  }
</style>
