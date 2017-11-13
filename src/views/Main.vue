<template>
  <!--http://ting.weibo.com/admin/mobile_page/edit?id=6225-->
  <div class="g-bd5 f-cb">
    <div class="g-sd51">
      <mt-navbar v-model="selected2">
        <mt-tab-item v-for="(v,k) in childrenList" :id="'l'+k" :key="'l'+k">{{v.title}}</mt-tab-item>
      </mt-navbar>
      <drag contain="children">
        <mt-tab-container style="overflow-y: scroll;height:90vh;" v-model="selected2">
          <mt-tab-container-item v-for="(item,k) in childrenList" :id="'l'+k" :key="'l'+k">
            <div v-for="(v,k) in item.children" :key="v.cardId">
              <mod :card="v" contain="children"></mod>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </drag>
    </div>
    <div class="g-mn5">
      <div class="g-mn5c">
        <drag contain="mainChild">
          <div class="main">
            <div v-for="(v,k) in mainChild" :key="v.cardId">
              <mod :card="v" contain="mainChild"></mod>
            </div>
          </div>
        </drag>
      </div>
    </div>
    <div class="g-sd52">
      <div class="right">
        <div style="margin-bottom: 10px;">
          <mt-button size="small" style="cursor: pointer" v-on:click="fabu">发布</mt-button>
          <mt-button size="small" style="cursor: pointer" v-on:click="show">预览</mt-button>
          <mt-button size="small" style="cursor: pointer" v-on:click="save">保存</mt-button>
        </div>
        <div v-if="editCardData">
          <mt-navbar v-model="selected">
            <mt-tab-item id="e1">数据</mt-tab-item>
            <mt-tab-item id="e2">页面信息</mt-tab-item>
          </mt-navbar>
          <mt-tab-container v-model="selected">
            <mt-tab-container-item id="e1">
              <div v-if="Object.prototype.toString.call(editCardData)=='[object Object]'">
                <div v-for="(v,k) in editCardData" >
                  <div v-if="Object.prototype.toString.call(v)=='[object Object]'">
                    <div v-on:click="selected3==k?selected3='':selected3=k">
                      <mt-cell :title="k+':'">
                        <a v-if="selected3!=k">{…}</a>
                        <a v-else>-</a>
                      </mt-cell>
                    </div>
                    <div v-show="selected3==k">
                      <div>{</div>
                      <div v-for="(v2,k2) in v" class="objItem" :key="k2">
                        <mt-field v-on:change="changev($event,k,k2)" :label="k2+':'" placeholder="请输入" :value="v2"></mt-field>
                      </div>
                      <div>}</div>
                    </div>
                  </div>
                  <div v-else-if="Object.prototype.toString.call(v)=='[object Array]'">
                    <div v-if="v[0]&&Object.prototype.toString.call(v[0])=='[object Object]'" v-on:click="selected3==k?selected3='':selected3=k">
                      <mt-cell :title="k+':'">
                        <a v-if="selected3!=k">{{'['+'{…},'.repeat(v.length).replace(/,$/,'')+v.length+']'}}</a>
                        <a v-else>-</a>
                      </mt-cell>
                    </div>
                    <div v-else v-on:click="selected3==k?selected3='':selected3=k">
                      <mt-cell :title="k+':'">
                        <a v-if="selected3!=k">{{'[…'+v.length+']'}}</a>
                        <a v-else>-</a>
                      </mt-cell>
                    </div>
                    <div v-show="selected3==k">

                      <div v-for="(v2,k2) in v" class="objArr" :key="k2">
                        <div class="arrIndex">{{k2}}</div>
                        <div class="objArrItem" v-if="Object.prototype.toString.call(v2)=='[object Object]'">
                          <mt-field :key="k3" v-for="(v3,k3) in v2" v-on:change="changev($event,k,k2,k3)" placeholder="请输入" :label="k3+':'" :value="v3"></mt-field>
                        </div>
                        <div class="objArrItem" v-else>
                          <mt-field placeholder="请输入" v-on:change="changev($event,k,k2)" :value="v2"></mt-field>
                        </div>
                        <div><mt-button size="small" style="cursor: pointer" v-on:click="delv(k,k2)">删除</mt-button></div>
                      </div>
                      <div><mt-button size="small" style="cursor: pointer" v-on:click="addv(k)">添加</mt-button></div>
                    </div>
                  </div>
                  <div v-else >
                    <mt-field :label="k+':'" placeholder="请输入" v-on:change="changev($event,k)" :value="v"></mt-field>
                  </div>
                </div>
              </div>
              <div v-else-if="Object.prototype.toString.call(editCardData)=='[object Array]'">
                <div v-for="(v,k) in editCardData" class="objArr">
                  <div class="arrIndex">{{k}}</div>
                  <div class="objArrItem" v-if="Object.prototype.toString.call(v)=='[object Object]'">
                    <mt-field :key="k2" v-for="(v2,k2) in v" v-on:change="changev($event,k,k2)" placeholder="请输入" :label="k2+':'" :value="v2"></mt-field>
                  </div>
                  <div class="objArrItem" v-else>
                    <mt-field placeholder="请输入" v-on:change="changev($event,k)" :value="v"></mt-field>
                  </div>
                  <div><mt-button size="small" style="cursor: pointer" v-on:click="delv(k)">删除</mt-button></div>
                </div>
                <div><mt-button size="small" style="cursor: pointer" v-on:click="addv()">添加</mt-button></div>
              </div>
              <div v-else></div>
            </mt-tab-container-item>
            <mt-tab-container-item id="e2">


            </mt-tab-container-item>
          </mt-tab-container>

        </div>
      </div>


    </div>
  </div>
</template>

<script>
  //引入字体
  import '@/assets/font/font.css';
  import '@/assets/font/sprite.css';

  import Bus from '../marvel/bus';
  import Vue from 'vue';
  import Mint from 'mint-ui';
  import 'mint-ui/lib/style.css';
  Vue.use(Mint);

  //获取url参数
  function GetQueryString(name)
  {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
  }

  Bus.params={
    id:GetQueryString("id")||6225
  }
  console.log(GetQueryString("id"))
  Bus.index=0;
  const app={
    data:function () {
      return {
        selected:"e1",////右边
        selected2:"l0",//左边
        selected3:"",//右边
        childrenList:[
          {
            "title":"容器",
            "children":[
              //可移动、可调整大小的图片
              {
                "isPandent":false,
                "style":{
                  position:"absolute",
                  top:"0px",
                  left:"0px",
                  width:"4rem",
                  height:"4rem",
                  zIndex:10,
                },
                card_group:[],
                "help":"可移动、可调整大小的图片",
                "card_type": "moveimg",
                "card_id": 0,
                "src":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510294905153&di=0571b62b3d24181dbdc52da66956a1fa&imgtype=0&src=http%3A%2F%2Fpic3.16pic.com%2F00%2F15%2F02%2F16pic_1502789_b.jpg",
                "openurl": "http://www.baidu.com"
              },
              {
                card_group:[],
                "help":"一个空的容器，可以在里面放入卡片",
                "card_type": "emptybox",
                "card_id": 0,

              },
              {
                card_group:[],
                "help":"开屏动画，3秒后消失",
                "card_type": "screenimg",
                "card_id": 0,
                "src":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510294905153&di=0571b62b3d24181dbdc52da66956a1fa&imgtype=0&src=http%3A%2F%2Fpic3.16pic.com%2F00%2F15%2F02%2F16pic_1502789_b.jpg",

              },
              {
                card_group:[],
                "help":"开屏动画2，3秒后消失",
                "card_type": "screendialog",
                "card_id": 0,
                "src":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510294905153&di=0571b62b3d24181dbdc52da66956a1fa&imgtype=0&src=http%3A%2F%2Fpic3.16pic.com%2F00%2F15%2F02%2F16pic_1502789_b.jpg",

              }

            ]
          },
          {
            "title": "卡片",
            "children": [
              {
                "help": "可滑动、可调大小的轮播图",
                "card_type": "swipe",
                "interval": 3000,
                "auto": true,
                "defaultIndex": 0,
                "height": "1.68rem",
                "pic_items": [
                  {
                    "src": "https://mu1.sinaimg.cn/original/weiyinyue.music.sina.com.cn/operation/focusphoto/d113439950455a333801337c33243af5.jpg",
                    "openurl": "sinaweibo://userinfo?uid=1252397723",
                    "txt": "购票"
                  },
                  {
                    "src": "https://mu1.sinaimg.cn/original/weiyinyue.music.sina.com.cn/operation/focusphoto/4871eeb931119a827760931d2dce21d6.jpg",
                    "openurl": "sinaweibo://userinfo?uid=1252397723",
                    "txt": "榜单"
                  },
                  {
                    "src": "https://mu1.sinaimg.cn/original/weiyinyue.music.sina.com.cn/operation/focusphoto/4871eeb931119a827760931d2dce21d6.jpg",
                    "openurl": "sinaweibo://userinfo?uid=1252397723",
                    "txt": "榜单"
                  },
                  {
                    "src": "https://mu1.sinaimg.cn/original/weiyinyue.music.sina.com.cn/operation/focusphoto/4871eeb931119a827760931d2dce21d6.jpg",
                    "openurl": "sinaweibo://userinfo?uid=1252397723",
                    "txt": "榜单"
                  },
                ]
              },
              {
                "help": "4张图片和文字",
                "card_type": "img4",
                "pic_items": [
                  {
                    "src": "https://mu1.sinaimg.cn/original/weiyinyue.music.sina.com.cn/operation/focusphoto/d113439950455a333801337c33243af5.jpg",
                    "openurl": "sinaweibo://userinfo?uid=1252397723",
                    "txt": "购票"
                  },
                  {
                    "src": "https://mu1.sinaimg.cn/original/weiyinyue.music.sina.com.cn/operation/focusphoto/4871eeb931119a827760931d2dce21d6.jpg",
                    "openurl": "sinaweibo://userinfo?uid=1252397723",
                    "txt": "榜单"
                  },
                  {
                    "src": "https://mu1.sinaimg.cn/original/weiyinyue.music.sina.com.cn/operation/focusphoto/4871eeb931119a827760931d2dce21d6.jpg",
                    "openurl": "sinaweibo://userinfo?uid=1252397723",
                    "txt": "榜单"
                  },
                  {
                    "src": "https://mu1.sinaimg.cn/original/weiyinyue.music.sina.com.cn/operation/focusphoto/4871eeb931119a827760931d2dce21d6.jpg",
                    "openurl": "sinaweibo://userinfo?uid=1252397723",
                    "txt": "榜单"
                  },

                ]
              },
              {
                "help": "图标和文字",
                "card_type": "grid4",
                "pic_items": [
                  {
                    "src": "http://image2.sina.com.cn/music/web/icon/card_icon_201503231534_default.png",
                    "openurl": "sinaweibo://userinfo?uid=1252397723",
                    "txt": "购票"
                  },
                  {
                    "src": "http://image2.sina.com.cn/music/web/icon/card_icon_201503231534_default.png",
                    "openurl": "sinaweibo://userinfo?uid=1252397723",
                    "txt": "榜单"
                  },
                  {
                    "src": "http://image2.sina.com.cn/music/web/icon/card_icon_201503231534_default.png",
                    "openurl": "sinaweibo://userinfo?uid=1252397723",
                    "txt": "榜单"
                  },
                  {
                    "src": "http://image2.sina.com.cn/music/web/ting2013/page/icon/icon-start.png",
                    "openurl": "sinaweibo://userinfo?uid=1252397723",
                    "txt": "榜单"
                  },
                ]
              },
            ]
          },
          {
            "title": "微博card",
            "children": [
              {
                "card_type": "weibo",
                "help": "微博card",
                "created_at": 1510195159,
                "id": "4172123242751758_2302129312_183058_8",
                "mid": "4172123242751758",
                "text": "①初中读过小说，后来看了几个影视版本，可以很负责任地说，知道真相丝毫没有削弱这部新版的观赏乐趣。②事实上，知道真相也不会妨碍任何一部真正经典的推理作品，它们的魅力早已远远超越了找凶手的智力挑战。③除了日版之外，这应该是对原著整容最多 ​",
                "source": "微博电影",
                "appid": 783085,
                "user": {
                  "id": 2302129312,
                  "name": "方君荐电影",
                  "avatar_large": "http://tva1.sinaimg.cn/crop.0.0.534.534.180/8937b4a0ly1feoq7ihfotj20eu0euq3d.jpg",
                  "profile_image_url": "http://tva1.sinaimg.cn/crop.0.0.534.534.50/8937b4a0ly1feoq7ihfotj20eu0euq3d.jpg",
                  "verified": true,
                  "verified_type": 0,
                  "verified_type_ext": 1,
                  "mbtype": 1,
                  "mbrank": 6,
                  "allow_all_comment": true,
                  "verified_tmp": 0,
                  "verified_color": "gold"
                },
                "reposts_count": 757,
                "comments_count": 978,
                "attitudes_count": 1330,
                "pending_approval_count": 0,
                "isLongText": true,
                "text_tag_tips": [],
                "gif_ids": "8937b4a0gy1flbmq9wg5og207g046dnl|001N9ktnjx07fFmwhi6P010f110004Y90k01|1022:231128ca305db4d4f2086f08c73a87b1200bcf,8937b4a0gy1flbmqb6tmag207g04616d|003jpXcajx07fFmwhA3J010f110005fw0k01|1022:2311280e3a6e300a88f137fdc52bda5ad51f27,8937b4a0gy1flbmqdlsvrg207g047hau|0010ckxLjx07fFmwiogD010f110007B00k01|1022:231128ead746e8dd6386204303c8b2eacac460,8937b4a0gy1flbmqaztaqg207g046amd|003CbctQjx07fFmwiUpO010f110002vA0k01|1022:2311285afe7ca4ecaa5fb3b681de682e94c270,8937b4a0gy1flbmqch2xbg207g047tx2|000qc7r7jx07fFmwi9Hp010f110006WG0k01|1022:231128520a2fff5452a6c01a17eb0fd7ce7d78,8937b4a0gy1flbmqfjvhwg207g047kjl|001GBUe8jx07fFmwhSwT010f110008tT0k01|1022:23112891f566b71943b5932a33138da1893a4b,8937b4a0gy1flbmqdqq5mg207g0474qp|003DM6zCjx07fFmwi6zR010f110003Vn0k01|1022:2311280b960bf551b08465d682157e7b0810ac,8937b4a0gy1flbmqbovnyg207g046wwe|002sBCcUjx07fFmwhJWE010f110008870k01|1022:231128c969508e820b794e860c7e3a28270fab,8937b4a0gy1flbmqc2lm8g207g0467on|003LZjjhjx07fFmwhIU8010f110008uM0k01|1022:23112828c6429bffc0969d22a9f0be90859ede",
                "comment_manage_info": {
                  "comment_permission_type": -1,
                  "approval_comment_type": 0
                },
                "strid": "FugfObxRc",
                "title": "",
                "large_pics": [
                  "http://wx2.sinaimg.cn/large/8937b4a0gy1flbmqfjvhwg207g047kjl.gif",
                  "http://wx4.sinaimg.cn/large/8937b4a0gy1flbmqc2lm8g207g0467on.gif",
                  "http://wx4.sinaimg.cn/large/8937b4a0gy1flbmqch2xbg207g047tx2.gif",
                  "http://wx4.sinaimg.cn/large/8937b4a0gy1flbmqbovnyg207g046wwe.gif",
                  "http://wx1.sinaimg.cn/large/8937b4a0gy1flbmqaztaqg207g046amd.gif",
                  "http://wx2.sinaimg.cn/large/8937b4a0gy1flbmqdqq5mg207g0474qp.gif",
                  "http://wx4.sinaimg.cn/large/8937b4a0gy1flbmq9wg5og207g046dnl.gif",
                  "http://wx2.sinaimg.cn/large/8937b4a0gy1flbmqdlsvrg207g047hau.gif",
                  "http://wx4.sinaimg.cn/large/8937b4a0gy1flbmqb6tmag207g04616d.gif"
                ],
                "small_pic": [
                  "http://wx2.sinaimg.cn/bmiddle/8937b4a0gy1flbmqfjvhwg207g047kjl.gif",
                  "http://wx4.sinaimg.cn/bmiddle/8937b4a0gy1flbmqc2lm8g207g0467on.gif",
                  "http://wx4.sinaimg.cn/bmiddle/8937b4a0gy1flbmqch2xbg207g047tx2.gif",
                  "http://wx4.sinaimg.cn/bmiddle/8937b4a0gy1flbmqbovnyg207g046wwe.gif",
                  "http://wx1.sinaimg.cn/bmiddle/8937b4a0gy1flbmqaztaqg207g046amd.gif",
                  "http://wx2.sinaimg.cn/bmiddle/8937b4a0gy1flbmqdqq5mg207g0474qp.gif",
                  "http://wx4.sinaimg.cn/bmiddle/8937b4a0gy1flbmq9wg5og207g046dnl.gif",
                  "http://wx2.sinaimg.cn/bmiddle/8937b4a0gy1flbmqdlsvrg207g047hau.gif",
                  "http://wx4.sinaimg.cn/bmiddle/8937b4a0gy1flbmqb6tmag207g04616d.gif"
                ],
                "large_pic": "",
                "film_id": "183058",
                "film_name": "东方快车谋杀案(2017)",
                "score": "8",
                "card_info": {
                  "list": [
                    {
                      "text": "",
                      "long_url": "http://weibo.com/p/100120183058",
                      "type": "small_card",
                      "object": {
                        "display_name": "东方快车谋杀案(2017)",
                        "id": "1022:100120183058",
                        "image": {
                          "url": "http://mu1.sinaimg.cn/square.180/weiyinyue.music.sina.com.cn/movie_poster/183058_vertical.jpg?v=1510556400"
                        },
                        "stream": {
                          "url": "http://ask.ivideo.sina.com.cn/v_play_ipad.php?vid=143876372&tags=weibocard"
                        },
                        "actor": [
                          {
                            "object_type": "person",
                            "id": "54429",
                            "display_name": "约翰尼·德普"
                          },
                          {
                            "object_type": "person",
                            "id": "562068",
                            "display_name": "黛西·雷德利"
                          },
                          {
                            "object_type": "person",
                            "id": "35628",
                            "display_name": "米歇尔·菲佛"
                          },
                          {
                            "object_type": "person",
                            "id": "5769",
                            "display_name": "佩妮洛普·克鲁兹"
                          }
                        ]
                      },
                      "object_type": "movie",
                      "score": "7.8",
                      "grade": "[星星][星星][星星][星星][空星]",
                      "buy_url": "sinaweibo://browser?url=http%3A%2F%2Fweibo.cn%2Fsinaurl2%3Ftype%3Dmovie%26act_type%3Dbuy_ticket%26luicode%3D10000001%26lfid%3D%26u%3Dhttp%253A%252F%252Fh5.m.taobao.com%252Fapp%252Fmovie%252Fpages%252Findex%252Fcinema-list.html%253Ffrom%253Dweibo%2526showid%253D214982%2526duration%253D100%2526showname%253D%2525E4%2525B8%25259C%2525E6%252596%2525B9%2525E5%2525BF%2525AB%2525E8%2525BD%2525A6%2525E8%2525B0%25258B%2525E6%25259D%252580%2525E6%2525A1%252588%2526wext%253D10000001_0__0__0__0__0_&sinainternalbrowser=topnav&share_menu=1",
                      "url": "sinaweibo://pageinfo?containerid=100120183058"
                    },
                    {
                      "type": "text",
                      "text": "[星星][星星][星星][星星]，①初中读过小说，后来看了几个影视版本，可以很负责任地说，知道真相丝毫没有削弱这部新版的观赏乐趣。②事实上，知道真相也不会妨碍任何一部真正经典的推理作品，它们的魅力早已远远超越了找凶手的智力挑战。③除了日版之外，这应该是对原著整容最多"
                    }
                  ],
                  "big_card": {
                    "text": "",
                    "type": "big_card",
                    "object_type": "picture",
                    "object": {
                      "large_pics": [
                        {
                          "url": "http://wx2.sinaimg.cn/large/8937b4a0gy1flbmqfjvhwg207g047kjl.gif",
                          "width": 268,
                          "height": 151,
                          "pic_type": "gif"
                        },
                        {
                          "url": "http://wx2.sinaimg.cn/large/8937b4a0gy1flbmqc2lm8g207g0467on.gif",
                          "width": 268,
                          "height": 150,
                          "pic_type": "gif"
                        },
                        {
                          "url": "http://wx2.sinaimg.cn/large/8937b4a0gy1flbmqch2xbg207g047tx2.gif",
                          "width": 268,
                          "height": 151,
                          "pic_type": "gif"
                        },
                        {
                          "url": "http://wx2.sinaimg.cn/large/8937b4a0gy1flbmqbovnyg207g046wwe.gif",
                          "width": 268,
                          "height": 150,
                          "pic_type": "gif"
                        },
                        {
                          "url": "http://wx2.sinaimg.cn/large/8937b4a0gy1flbmqaztaqg207g046amd.gif",
                          "width": 268,
                          "height": 150,
                          "pic_type": "gif"
                        },
                        {
                          "url": "http://wx2.sinaimg.cn/large/8937b4a0gy1flbmqdqq5mg207g0474qp.gif",
                          "width": 268,
                          "height": 151,
                          "pic_type": "gif"
                        },
                        {
                          "url": "http://wx2.sinaimg.cn/large/8937b4a0gy1flbmq9wg5og207g046dnl.gif",
                          "width": 268,
                          "height": 150,
                          "pic_type": "gif"
                        },
                        {
                          "url": "http://wx2.sinaimg.cn/large/8937b4a0gy1flbmqdlsvrg207g047hau.gif",
                          "width": 268,
                          "height": 151,
                          "pic_type": "gif"
                        },
                        {
                          "url": "http://wx2.sinaimg.cn/large/8937b4a0gy1flbmqb6tmag207g04616d.gif",
                          "width": 268,
                          "height": 150,
                          "pic_type": "gif"
                        }
                      ],
                      "small_pics": [
                        {
                          "url": "http://wx2.sinaimg.cn/thumb180/8937b4a0gy1flbmqfjvhwg207g047kjl.gif",
                          "width": 0,
                          "height": 0,
                          "pic_type": "gif"
                        },
                        {
                          "url": "http://wx2.sinaimg.cn/thumb180/8937b4a0gy1flbmqc2lm8g207g0467on.gif",
                          "width": 0,
                          "height": 0,
                          "pic_type": "gif"
                        },
                        {
                          "url": "http://wx2.sinaimg.cn/thumb180/8937b4a0gy1flbmqch2xbg207g047tx2.gif",
                          "width": 0,
                          "height": 0,
                          "pic_type": "gif"
                        },
                        {
                          "url": "http://wx2.sinaimg.cn/thumb180/8937b4a0gy1flbmqbovnyg207g046wwe.gif",
                          "width": 0,
                          "height": 0,
                          "pic_type": "gif"
                        },
                        {
                          "url": "http://wx2.sinaimg.cn/thumb180/8937b4a0gy1flbmqaztaqg207g046amd.gif",
                          "width": 0,
                          "height": 0,
                          "pic_type": "gif"
                        },
                        {
                          "url": "http://wx2.sinaimg.cn/thumb180/8937b4a0gy1flbmqdqq5mg207g0474qp.gif",
                          "width": 0,
                          "height": 0,
                          "pic_type": "gif"
                        },
                        {
                          "url": "http://wx2.sinaimg.cn/thumb180/8937b4a0gy1flbmq9wg5og207g046dnl.gif",
                          "width": 0,
                          "height": 0,
                          "pic_type": "gif"
                        },
                        {
                          "url": "http://wx2.sinaimg.cn/thumb180/8937b4a0gy1flbmqdlsvrg207g047hau.gif",
                          "width": 0,
                          "height": 0,
                          "pic_type": "gif"
                        },
                        {
                          "url": "http://wx2.sinaimg.cn/thumb180/8937b4a0gy1flbmqdlsvrg207g047hau.gif",
                          "width": 0,
                          "height": 0,
                          "pic_type": "gif"
                        }
                      ]
                    }
                  },
                  "html": "①初中读过小说，后来看了几个影视版本，可以很负责任地说，知道真相丝毫没有削弱这部新版的观赏乐趣。<br/>②事实上，知道真相也不会妨碍任何一部真正经典的推理作品，它们的魅力早已远远超越了找凶手的智力挑战。<br/>③除了日版之外，这应该是对原著整容最多...<a href=sinaweibo://detail?mblogid=FugfObxRc class=\"movie-weibo-all\">全文</a>",
                  "text": "http://t.cn/RaZ76ev[星星][星星][星星][星星]，①初中读过小说，后来看了几个影视版本，可以很负责任地说，知道真相丝毫没有削弱这部新版的观赏乐趣。②事实上，知道真相也不会妨碍任何一部真正经典的推理作品，它们的魅力早已远远超越了找凶手的智力挑战。③除了日版之外，这应该是对原著整容最多 ​"
                },
                "comment_scheme": "sinaweibo://detail?mblogid=FugfObxRc&tab=2&need_scroll_to_tab=1",
                "key_id": "homepage_review5a094714ad7e3"
              }


            ]
          }

        ],
        mainChild:[],
        editCardData:Bus.editCardData
      };
    },
    components: {
      'drag': require('../components/drag.vue'),
      'mod': require('../components/modDev.vue')
    },
    methods:{

      //点击删除
      del:function () {
        var the=this
        the.mainChild.splice(the.mainChild.indexOf(the.editCardData),1)
        the.editCardData=null
      },
      fabu:function () {
        var the=this
        this.$http.get("/subject/h5/publishpage?page_id=6225").then(function (rst) {
          if (rst.data && rst.data.status==1) {
            the.$toast({
              message: '发布成功！'
            })
          }
        })
      },
      //点击预览
      show:function () {
        if(process.env.NODE_ENV=="development"){
          window.open("demo.html")
        }else{
          window.open("http://movie.weibo.com/subject/h5/index?page_id=6225&preview=1")
        }

      },
      //点击保存
      save:function () {
        var obj=JSON.parse(JSON.stringify(this.mainChild))
        var time=new Date().getTime().toString().substr(5,8)
        obj.map(function (item,k) {
          item.cardId="t"+time+k
          if(item.isPendant){
            var cssText="";
            for(var k in item.styleObj){
              cssText=cssText+k+":"+item.styleObj[k]+";";
            }
            item.cssText=cssText;
          }
          delete item.isPendant;
          delete item.styleObj;
          return item
        })
        console.log(obj)
        localStorage.setItem("curCardData",JSON.stringify(obj))


        var cardlist=JSON.stringify(obj)
        console.log(cardlist)
        var the=this;
        this.$http.post("/subject/h5/savecard",{
          page_id:Bus.params.id,
          cardlist:cardlist
        }).then(function (rst) {
          if (rst.data && rst.data.status==1) {
            the.$toast({
              message: '已保存！'
            })
          }
        })
      },
      //右边编辑变化
      changev:function (v,k,k2,k3) {
        var obj=this.editCardData;
        obj.cardId=obj.cardName+(Bus.index++);
        if(arguments.length==2){
          obj[k]=v;
        }else if(arguments.length==3){
          obj[k][k2]=v;
        }else if(arguments.length==4){
          obj[k][k2][k3]=v;
        }
      },
      //删除一个数组
      delv:function (k,k2) {
        var obj=this.editCardData;
        obj.cardId=obj.cardName+(Bus.index++)
        if(arguments.length==2){
          obj[k].splice(k2,1)
        }
        if(arguments.length==1){
          obj.splice(k,1)
        }
      },
      //添加一个
      addv:function (k) {
        var obj=this.editCardData;

        if(arguments.length==1){
          var arr=define(obj.cardName).cardData[k]
          if(arr[0]&&typeof arr[0]=="object"){
            var item={}
            for(var k3 in arr[0]){
              item[k3]=""
            }
            obj[k].push(item)
          }else{
            obj[k].push("")
          }
        }
        if(arguments.length==0){
          var arr=define(obj.cardName).cardData
          if(arr[0]&&typeof arr[0]=="object"){
            var item={}
            for(var k3 in arr[0]){
              item[k3]=""
            }
            obj.push(item)
          }else{
            obj.push("")
          }
        }
      },
      changev2:function (v,k) {
        var obj=this.editCardData
        obj.styleObj[k]=v;
        obj.cardId=obj.cardName+(Bus.index++)
      },
    },
    mounted:function () {
      var the=this
      Bus.root=this;

      if(process.env.NODE_ENV=="development"){
        var datastr=localStorage.getItem("curCardData")||"[]"
        this.mainChild=JSON.parse(datastr)
      }else{
        this.$http.get("/subject/h5/getpageInfo?page_id="+Bus.params.id+"&preview=1").then(function (rst) {
          the.mainChild=rst.data.data.cards;
        })
      }


      Bus.$on("edit",function (el) {
        the.selected3="";
        the.editCardData=Bus.editCardData
        Bus.editCardData=null

      })
    },
  };



  export default app;

</script>

<style rel="stylesheet/scss" type="text/css" lang="scss" >

  .g-bd5{
    width: 100%;
  }
  .g-sd51,.g-sd52{position:relative;float:left;width:375px;margin:0 -375px 0 0;}
  .g-sd52{float:right;width:300px;margin:0 0 0 -300px;}
  .g-mn5{float:left;width:100%;}
  .g-mn5c{margin:0 310px 0 375px;}

  .main{
    margin: 0 auto;
    width: 375px;
    height: 100vh;
    background: #fff;
    position: relative;
  }

  /*@media screen and (min-width: 1500px){*/
  /*.main{*/
  /*width: 750px;*/
  /*}*/
  /*}*/
  .right{

  }
  .right .mint-field-core{
    color: #0bb20c;
  }
  .right .mint-field-core::placeholder{
    color: #0bb20c;
    opacity: 0.4;
  }
  .right .objItem{
    padding-left: 20px;
  }
  .right .objArr{
    display: flex;
  }
  .right .arrIndex{
    width: 20px;
    line-height: 50px;

  }
  .right .objArrItem{
    flex:1;
  }
  .right .mint-cell-value a{
    cursor: pointer;
    color: #26a2ff;
  }


</style>
