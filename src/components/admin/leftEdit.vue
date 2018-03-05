<template>
  <div class="leftEdit">
    <div class="active" v-if="hoverE" :style="{'top':top+'px'}">
      <mv-img :needlazy="true" :src="helpJSON[hoverE].demo_url"></mv-img>
    </div>
    <div v-for="card in children" class="card10">
      <div class="card">
        <h2 class="card-title" v-if="card.title">{{card.title}}</h2>
      </div>
      <div class="card m-panel card28" :class="['m-col-'+card.col]">
        <div class="card-wrap">
          <div class="card-main">
            <div class="m-item-box" v-if="helpJSON[item]" v-for="item in card.items" @mouseover="mouseover($event,item)" @mouseleave="mouseleave" @click="addCard(item)">
              <div class="m-diy-btn m-box-col m-box-center m-box-center-a">
                <h4>{{helpJSON[item].help}} <i class="m-font m-font-plus"></i></h4>
              </div>
            </div>
            <div class="m-item-box" v-else></div>
          </div>
        </div>
      </div>
  </div>

  </div>

</template>

<script>

  import $ from 'jquery';
  import Bus from '../../marvel/bus';
  export default{
    props:['children'],
    data:function () {
      return {
        hoverE:"",
        top:0,
        left:0,
        helpJSON:require("../cardshelp")
      }
    },
    components: {

    },
    computed:{

    },
    methods:{
      addCard:function (item) {
        Bus.addCard(item)
      },
      mouseover:function (e,item) {
        this.hoverE=item;
        this.top=e.currentTarget.getBoundingClientRect().top;
        if(Bus.mActive){
          Bus.mActive.classList.remove("m-active")
        }
        Bus.mActive=e.currentTarget;
        Bus.mActive.classList.add("m-active")
//        this.left=e.currentTarget.getBoundingClientRect().right;

      },
      mouseleave:function () {
        this.hoverE="";
        if(Bus.mActive){
          Bus.mActive.classList.remove("m-active")
          Bus.mActive=null
        }
      }
    }
  };

</script>
<style rel="stylesheet/scss" type="text/css" lang="scss" scoped>
  .leftEdit{
    z-index: 10;
    overflow-x:visible;
    overflow-y:scroll;height:100vh;
    padding-bottom: 3rem;
    .active{

      z-index: 100;
      position: absolute;left: 102%;width: 375px;
      top:20px;
      img{
        max-width: 100%;
      }
    }
  }
  .card10{
    margin-bottom: 0.18rem;
    .m-font{
      color: #FF8200;
    }
  }
  .card10 .card-title{
    color: #939393;
    font-size:0.28rem;
    line-height:0.34rem;
    padding: 0.24rem 0 0.14rem 0.24rem;
    background: #f2f2f2;
  }
  .card28{
    overflow: visible;
  }
  .card28 .card-wrap .card-main {
    margin-bottom: -1px;
    /* autoprefixer: off */
    display: flex;
    flex-wrap: wrap; }

  .card28 .m-item-box {
    /*调用itembox组件,参看sasscore*/
    height: auto;
    line-height: 1;
    text-align: center;
    padding: 0.2rem 0 0.2rem;
    min-height: 1.12rem;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center; }
  .card28 .m-item-box::before {
    top: 0.32rem;
    bottom: 0.32rem; }
  .card28 .m-item-box::after {
    left: 0.32rem;
    right: 0.32rem; }
  .card28 .m-item-box .m-diy-btn img {
    width: 0.72rem;
    height: 0.72rem; }
  .card28 .m-item-box .m-diy-btn h4 {
    font-size: 0.24rem;
    margin: 0.14rem 0 0 0; }
  .card28 .m-item-box .m-diy-btn {
    cursor: pointer;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    position: relative;
    height: 100%; }
  .card28 .m-item-box .m-diy-btn h3 {
    font-size: 0.3rem;
    color: #333;
    margin-bottom: 0;
    font-weight: 700; }
  .card28 .m-item-box .m-diy-btn h3 + h4 {
    color: #939393; }

</style>
