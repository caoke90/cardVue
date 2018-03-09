<template>
  <div class="card card32"  @click="openUrl(card.scheme)">
    <p class="agotime">{{card.title}}</p>
    <div class="time" :style="{'color':card.number_color }" v-html="curcount"></div>
    <p class="wcbl" v-if="card.total&&card.isshow_rate==1">当前完成比例<span class="num">{{rate}}</span></p>
  </div>
</template>
<script>
	import Bus from '../../marvel/bus';
	export default {
		data() {
			return {};
		},
		name: "card32",
		props: ['card'],
		components: {},
		methods: {
			openUrl(url) {
				if(url) {
					Bus.$emit("openScheme", url);
				}
			}
		},
		computed: {
      rate:function () {
        return parseInt(this.card.count*10000/this.card.total)/100+"%"
      },
      curcount: function() { //数字三位分割
				return (this.card.count || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,').replace(/,/g,"<span style='font-size: 0.44rem;padding: 0 0.05rem'>,</span>");
			}
		},
		mounted() {
      this.card.count=parseInt(this.card.count)
      this.card.update_url_freq=parseInt(this.card.update_url_freq)||60;
			if(this.card.update_url) {
				var timer = setInterval(() => {
					this.$http.get(this.card.update_url).then((rst) => {
						this.card.count = rst.data.count;
					})
				}, this.card.update_url_freq*1000 );
			} else {
//        this.card.auto_add_number_freq=parseInt(this.card.auto_add_number_freq)||60;
//
//				var timer = setInterval(() => {
//					if(this.card.auto_add_number > 0) {
//						if(this.card.count > this.card.auto_max_min) {
//							clearInterval(timer);
//						}else{
//              this.card.count += parseInt(this.card.auto_add_number);
//            }
//					}else{
//						if(this.card.count < this.card.auto_max_min) {
//							clearInterval(timer);
//						}else{
//              this.card.count += parseInt(this.card.auto_add_number);
//            }
//					}
//
//				}, this.card.auto_add_number_freq * 1000)
			}
		}
	};
</script>
<style rel="stylesheet/scss" type="text/css" lang="scss" scoped>
	.card32 {
    background: #fff;
		width: 100%;
		padding: 0rem 0.5rem;
		.agotime {
			font-size: 0.28rem;
			padding: 0.12rem 0rem;
			color: #565656;
      font-weight: 400;
			border-bottom: 2px solid #f6f6f6;
			margin: 0rem 0.22rem;
		}
		.time {
			text-align: center;
			color: #fe8200;
			padding: 0.15rem 0rem 0.15rem;
      font-size: 0.9rem;
		}
		.wcbl {
			border-top: 2px solid #f6f6f6;
			font-size: 0.28rem;
			padding: 0.12rem 0rem;
			color: #565656;
			.num {
				color: #e79939;
			}
		}
	}
</style>
