<template>
	<header class="weibo-top m-box m-avatar-box">
		<div @click="jump_url" class="m-img-box">
			<mv-img :needlazy="true" :src="item.user.avatar_large"></mv-img>
			<i class="m-icon" :class='"m-icon-"+item.user.verified_color+"v"' v-if="item.user.verified_color"></i>
		</div>
		<div class="m-box-col m-box-dir">
			<div class="m-text-box" ref="msgbox">
				<a @click="openScheme('sinaweibo://userinfo?uid='+item.user.id)" class="bouser">{{item.user.name}}</a>
				<span>点评了</span>
				<br>
				<a @touchstart="touchstart($event)" @touchmove="touchmove($event)" @touchend="touchmove($event)" @click="openScheme('sinaweibo://pageinfo?containerid=100120'+item.film_id)" class="filmName">
				  {{nameSplit(item.film_name)}}
				</a>
				<span class="filmName">
              <span class="score">{{item.score}}分</span>
				</span>
			</div>
		</div>
	</header>
</template>
<style lang="scss" scoped="scoped">
	@import "../../scss/_sassCore";
	@import "../../scss/_var";
	.m-text-box>span {
		font-size: 0.9375rem;
		color: #151515;
	}
  .m-text-box>*{
    margin: 0;
  }

	.bouser {
		font-size: 0.9375rem;
		display: inline-block;
		color: #FF8200;
	}

	.filmName {
		font-size: 0.9375rem;
		display: inline-block;
	}

	.score {
		display: inline-block;
		position: relative;
		top: P2R(-1.5px);
		width: 46px;
		line-height: P2R(16px);
		font-size: 0.75rem;
		text-align: center;
		background: #FCCE17;
		border-radius: 9px;
		color: white;
	}
</style>
<script>
	import Bus from '../../marvel/bus';
	export default {
		props: ['item', 'showTriangle', 'gomore'],
		data() {
			return {
				conW: 0
			};
		},
		computed: {
			profileUrl() {
				return this.item.user.profile_url.replace(/^http(|s):\/\/m.weibo.cn/, '');
			}
		},
		methods: {
      touchstart:function (e) {
        if(Bus.mActive){
          Bus.mActive.target.classList.remove("m-active")
          Bus.mActive=null
        }
        Bus.mActive=e;
        Bus.mActive.target.classList.add("m-active")
      },
      touchmove:function (e) {
        if(Bus.mActive){
          Bus.mActive.target.classList.remove("m-active")
          Bus.mActive=null
        }
      },
			jump_url: function() {
				Bus.$emit("openScheme", 'sinaweibo://userinfo?uid=' + this.item.user.id);
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
			weiboVerified: require('./weibo-verified.vue'),
			weiboIcon: require('./weibo-icon.vue')
		},
		mounted() {
			let conW = this.$refs.msgbox.offsetWidth;
			this.conW = conW;
		}
	};
</script>
