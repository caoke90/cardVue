<template>
	<header class="weibo-title">
		<div @click="jump_url" class="m-img-box">
			<mv-img :needlazy="true" :src="card.user.avatar_large"></mv-img>
			<i class="m-icon" :class='"m-icon-"+card.user.verified_color+"v"' v-if="card.user.verified_color"></i>
		</div>
		<div class="m-box-col">
			<div class="m-text-box" ref="msgbox">
				<a @click="openScheme('sinaweibo://userinfo?uid='+card.user.id)" class="bouser">{{card.user.name}}</a>
				<span>被指派了任务</span>
				<br>
				<a @touchstart="touchstart($event)" @touchmove="touchmove($event)" @touchend="touchmove($event)" @click="openScheme('sinaweibo://pageinfo?containerid=100120'+card.film_id)" class="filmName">
				  {{nameSplit(card.film_name)}}
				</a>
        <span class="score">{{card.score}}</span>
			</div>
		</div>

	</header>
</template>
<style lang="scss" scoped="scoped">
	@import "../../scss/_sassCore";
	@import "../../scss/_var";

  .weibo-title {
    padding: 0 0.24rem;
    overflow: hidden;
    position: relative;
    //左边定宽，右边自适应
    .m-img-box{
      float:left;
      margin-right:-0.8rem;

      position: relative;
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
      img{
        border-radius: 50%;
        width: 100%;
        height: 100%;
        vertical-align: top;
        object-fit: cover;
      }
      .m-icon{
        position: absolute;
        z-index: 3;
        right: -1px;
        bottom: -1px;
      }
    }

    .m-box-col{
      float:right;width:100%;

      .m-text-box{
        font-size: 0.3rem;
        margin-left:1.06rem;

        .bouser{
          color: #ff8200;
        }
        .score{
         position: relative;
         top: -.03rem;
          display: inline-block;
          height:0.3rem;
          line-height: 0.35rem;
          font-size: 0.24rem;
          background: #fcce17;
          text-align: center;
          width: 0.92rem;
          color: #fff;
          border-radius: 0.18rem;
        }
      }
    }
    aside{
      position: absolute;
      right: 0.26rem;
      top:0.02rem;
      .m-add-box{
        display: inline-block;
        .m-font{
          vertical-align: top
        }
        color: #FF8200;
        padding: 0 0.14rem;
        font-size: 0.24rem;
        height: 0.56rem;
        line-height: 0.56rem;
        border: 1px solid #FF8200;
        vertical-align:top;
        border-radius: 0.04rem;
      }
      .m-add-box.m-add-al{
        color: #636363;
        border: 1px solid #939393;
      }
    }
  }
</style>
<script>
	import Bus from '../../marvel/bus';
	export default {
		props: ['card', 'showTriangle', 'gomore'],
		data() {
			return {
			  isfollowed:false,
				conW: 0
			};
		},
		computed: {
			profileUrl() {
				return this.card.user.profile_url.replace(/^http(|s):\/\/m.weibo.cn/, '');
			}
		},
		methods: {
      touchstart:function (e) {
        if(Bus.mActive){
          Bus.mActive.classList.remove("m-active")
        }
        Bus.mActive = e.currentTarget;
        Bus.mActive.classList.add("m-active")
      },
      touchmove:function (e) {
        if(Bus.mActive){
          Bus.mActive.classList.remove("m-active")
          Bus.mActive=null
        }
      },
      guanzhu:function () {
        this.isfollowed=true;
        const mid=this.card.mid
        const uid=this.card.user.id
        this.$http.post("/movieapp/action/follow",{
          operate:"follow",
          sinaid:uid
        }).then((resp) =>{
          if(resp.data && resp.data.status == 1) {

          }else{
            this.isfollowed=false;
          }
        })
        //关注统计
        Bus.$emit("movieActionLog", {
          "luicode": Bus.movieConfig.luicode,
          "lfid": Bus.movieConfig.lfid,
          "uicode": 40000078,
          "act_code": 1383,
          "ext": 'type:movie_follow|mid:'+mid+'|touid:'+uid,
          "fid": '10100310001_-_homepage'
        });
      },
      jumpgunz:function (card) {
        const schemeClient = 'sinaweibo://detail?mblogid=' + card.strid;
        Bus.$emit("openScheme",schemeClient);
      },
			jump_url: function() {
				Bus.$emit("openScheme", 'sinaweibo://userinfo?uid=' + this.card.user.id);
			},
			openScheme: function(url) {
				Bus.$emit("openScheme", url);
			},
			nameSplit(val) {
				let L = (val + "").trim().length;
				let W = 16;
				let H = 0;
				let clientW = document.documentElement.offsetWidth;
				if(clientW >= 320 && clientW < 375) {
					H = 12;
				} else if(clientW >= 375 && clientW < 414) {
					H = 14;
				} else if(clientW >= 414 && clientW < 768) {
					H = 16;
				}
				if(L<14){
					return val.trim();
				}
				return val.trim().substr(0, H) + "..."
			}
		},
		components: {
		},
		mounted() {
			let conW = this.$refs.msgbox.offsetWidth;
			this.conW = conW;
		}
	};
</script>
