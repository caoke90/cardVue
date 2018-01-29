<template>
	<x-dialog v-model="show2" class="dialog-demo">
		<div class="img-box">
			<a :href="card.openurl||'javascript:void(0);'">
				<img :src="card.src" ref="img">
			</a>
		</div>
		<div class="close" @click="show2=false">
			<span class="vux-close"></span>
		</div>
	</x-dialog>
</template>

<script>
	//slider
	import xDialog from 'vux/src/components/x-dialog'

	export default {
		name: "card11",
		props: ['card'],
		data: function() {
			return {
				show2: false
			}
		},
		components: {
			xDialog,
		},
		methods: {
			load: function() {
				var the = this;
				this.show2 = true;

				setTimeout(() => {
					the.show2 = false
				},the.card.duration || 3000)

			},

			jump: function() {
				this.show2 = false
			}
		},
		mounted: function() {
			var the = this;
			this.$refs.img.onload = function() {
				the.load()
			}
		}
	};
</script>
<style rel="stylesheet/scss" type="text/css" lang="scss">
	.dialog-demo {
		.weui-dialog {
			outline: none;
			padding: 0px;
			margin: 0px;
			background: none;
      border-radius: 0px;
      overflow: visible;
		}
		.dialog-title {
			line-height: 30px;
			color: #666;
		}
		.img-box {
			padding: 0px;
			margin: 0px;
			outline: none;
			a {
				display: block;
			}
			img {
				padding: 0px;
				margin: 0px;
				outline: none;
				width: 100%;
			}
		}
		.close {
			width: 24px;
			height: 24px;
			position: absolute;
			top: -3px;
			right: -3px;
      background:black ;
      border-radius: 50%;
      border: 1px solid #fff;
		}
		.vux-close {}
	}
</style>
