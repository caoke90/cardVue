<template>
  <div class="card11" v-show="show2" >
    <div class="m-mask" @touchstart.stop.prevent></div>

      <div class="dialog">
        <div class="img-box">
          <a :href="card.openurl">
            <img :src="card.src" ref="img">
          </a>
        </div>
        <div class="close" @click="show2=false">
          X
        </div>
      </div>
  </div>

</template>

<script>


	export default {
		name: "card11",
		props: ['card'],
		data: function() {
			return {
				show2: false
			}
		},
		components: {

		},
		methods: {
			load: function() {
				var the = this;
				this.show2 = true;
        document.body.style.overflowY="hidden";
				setTimeout(() => {
					the.show2 = false;
          document.body.style.overflowY="scroll";
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
  /*遮罩层*/
  .m-mask { position: fixed; z-index: 996; top: 0; right: 0; bottom: 0; left: 0; background: rgba(0, 0, 0, 0.6); }

  .card11 {
    .m-mask{
      z-index: 1000;
    }
		.dialog {
      transform: translate(-50%,-50%);
      z-index: 1001;
      position: fixed;
      top:50vh;
      left:50vw;
      width:6rem;
      max-height:80vh;
		}
		.img-box {
			a {
				display: block;
			}
			img {
				width: 100%;
			}
		}
		.close {
			width: 24px;
			height: 24px;
			position: absolute;
			top: -8px;
			right: -10px;
      background:black ;
      border-radius: 50%;
      border: 1px solid #fff;
      color: #fff;
      text-align: center;
      line-height: 22px;
      font-size: 14px;
      display: block;
		}
	}
</style>
