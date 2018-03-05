<template>
	<div class="card card32" v-if="card">
		<div class="card32" @click="openUrl(card.scheme)">
			<p class="agotime">{{card.title}}(目标{{card.total}}朵)</p>
			<div class="time" :style="{'color':card.number_color }">
				<span class="t_c">{{toThousands[0]}}</span>
				<span class="t_t">,</span>
				<span class="t_c">{{toThousands[1]}}</span>
				<span class="t_t">,</span>
				<span class="t_c">{{toThousands[2]}}</span>
			</div>
			<p class="wcbl" v-if="card.isshow_rate">当前完成比例<span class="num">{{card.rate}}</span></p>
		</div>
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
			toThousands: function() {   //数字三位分割
				return (card.count || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,').split(",");
			}
		}
	};
</script>
<style rel="stylesheet/scss" type="text/css" lang="scss" scoped>
	.card32 {
		box-sizing: border-box;
		width: 100%;
		padding: 0rem 0.5rem;
		.agotime {
			font-size: 0.28rem;
			padding: 0.12rem 0rem;
			color: #565656;
			border-bottom: 2px solid #f6f6f6;
			margin: 0rem 0.22rem;
		}
		.time {
			font-size: 0.28rem;
			text-align: center;
			color: #fe8200;
			padding: 0.15rem 0rem 0.15rem;
			.t_c {
				font-size: 0.9rem;
			}
			.t_t {
				font-size: 0.44rem;
				padding: 0 0.05rem;
			}
		}
		.wcbl {
			border-top: 2px solid #f6f6f6;
			font-size: 0.28rem;
			padding: 0.12rem 0rem;
			color: #565656;
			.num {
				color: #fe8200;
			}
		}
	}
</style>
