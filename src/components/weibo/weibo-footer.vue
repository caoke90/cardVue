<template>
	<footer class="m-ctrl-box m-box-center-a">
		<div class="m-diy-btn m-box-col m-box-center m-box-center-a" v-if="showRt" @touchstart="touchstart($event)" @touchmove="touchmove($event)" @touchend="touchmove($event)" @click="repost($event, item)">
			<i class="m-font m-font-forward" v-if="showRt"></i>
			<h4 v-text="item.reposts_count?item.reposts_count:'转发'">转发</h4>
		</div>
		<span class="m-line-gradient"></span>
		<div class="m-diy-btn m-box-col m-box-center m-box-center-a" :class="item.comment_scheme?'':'active'" @touchstart="touchstart($event)" @touchmove="touchmove($event)" @touchend="touchmove($event)" @click="comment($event, item)">
			<i class="m-font m-font-comment"></i>
			<h4 v-text="item.comments_count?item.comments_count:'评论'">评论</h4>
		</div>
		<span class="m-line-gradient"></span>
		<div class="m-diy-btn m-box-col m-box-center m-box-center-a" @touchstart="touchstart($event)" @touchmove="touchmove($event)" @touchend="touchmove($event)" @click="like">
			<i class="m-icon" :class="{'m-icon-liked':liked,'m-icon-like':!liked}"></i>
			<h4 v-text="like_counts === 0 ? '赞': like_counts"></h4>
		</div>
	</footer>
</template>
<style lang="scss">
	@import "../../scss/_sassCore";
	@import "../../scss/_var";

	.active {
		background-color: #ebebeb;
	}


</style>
<script>
	import Bus from '../../marvel/bus';
	import qs from 'qs';
	export default {
		props: ['item'],
		data() {
			return {
				liked: false,
				like_counts: 0,
			};
		},
		created() {
			this.liked = this.item.liked;
			this.like_counts = this.item.attitudes_count;
		},
		watch: {
			'item' () {
				this.liked = this.item.liked;
				this.like_counts = this.item.attitudes_count;
			}
		},
		components: {
			weiboMedia: require('./weibo-media.vue')
		},
		computed: {
			/**
			 * 是否显示转发按钮
			 * @returns {boolean}
			 */
			showRt() {
				return !(this.item.visible && this.item.visible.type > 0);
			}
		},
		methods: {
      touchstart:function (e) {
        if(Bus.mActive){
          Bus.mActive.classList.remove("m-active")
        }
        Bus.mActive=e.currentTarget;
        Bus.mActive.classList.add("m-active")
      },
      touchmove:function (e) {
        if(Bus.mActive){
          Bus.mActive.classList.remove("m-active")
          Bus.mActive=null
        }
      },
			repost($event, item) { //分享
				const schemeH5 = 'sinaweibo://repost?' + qs.stringify({
					srcuid: item.user.id, //原博作者的uid
					srcid: item.mid, //原博的mid
					srcnickname: item.user.name, //原博作者的昵称。
					srctext: item.card_info.text, //原博内容
					srcprofileurl: item.user.avatar_large, //如果原博没图，这是原博主的头像url
				});
				Bus.$emit("openScheme", schemeH5);

			},
			comment($event, item) { //评论

				if(item.comment_scheme){
					Bus.$emit("openScheme", item.comment_scheme);
				}

			},
			like: function() {
				const url = this.liked ? 'movieapp/action/like?operator=destroy' : 'movieapp/action/like?operator=add';
				let flag = true;
				let clickLike = (url) => {
					this.$http.post(url, {
						mid: this.item.id
					}).then((response) => {
						if(response.data && response.data.status == 1) {
							this.item.attitudes_count = this.like_counts;
						}
					}, (response) => {
						if(flag) {
							flag = false;
							clickLike(url); //重试
						}
						console.log(response);
					});
				}
				if(this.liked) { //点过赞
					this.like_counts -= 1;
					this.liked = false;
				} else { //没点过赞
					this.like_counts += 1;
					this.liked = true;
				};

				clickLike(url);
			}
		}
	};
</script>
