require('./check-versions')();

const config = require('../config');
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
}

const opn = require('opn');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const proxyMiddleware = require('http-proxy-middleware');
const webpackConfig = require('./webpack.dev.conf');

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port;
// automatically open browser, if not set will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser;
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable;
const mockArr = require("../mock/index.js");

const mockUrl={}
mockArr.forEach(function (item) {
  Object.assign(mockUrl,item)
})
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const compiler = webpack(webpackConfig);

const list=[]
if(mockArr.length){
  var urlMock=mockArr[0]
  Object.keys(urlMock).forEach(function(url) {
    var mock = urlMock[url];
    list.push({
      key:url,
      value:mock,
    })
  })
}

app.get("/",function (req,res) {

  res.render(__dirname+"/list.ejs",{
    list:list
  })
})

app.post("/subject/h5/savecard",function (req,res) {
  var cards=JSON.parse(req.body.cardlist)

  cards.forEach(function (arr) {
    if(arr.card_group){
      for(var i=0;i<arr.card_group.length;i++){
        var card=arr.card_group[i];
        if(card.card_type==20) {
          var item = {
            "card_type": 20,
            "itemid": "",
            "title": card.title,
            "openurl": "",
            "is_asyn": 0,
            "asyn_url": "",
            "actionlog": [],
            "height": card.pic_height,
            "items": [
              {
                "pic": "http://mu1.sinaimg.cn/original/weiyinyue.music.sina.com.cn/vote_option/1515721904_90ba68.png",
                "pic_scheme": "https://weibo.com/dapengpeng?refer_flag=1001030101_",
                "scheme": "https://weibo.com/dapengpeng?refer_flag=1001030101_",
                "title": "大鹏董成鹏 ",
                "title_sub": "77</span>票",
                "bottom_info": {
                  "text": "立即投票",
                  "pic": "http://wx1.sinaimg.cn/mw690/e99802b4ly1fff12jd6edj201c01ajr8.jpg",
                  "scheme": "http://movie.weibo.com?theme_id=55&option_id=305&sig="
                }
              },
              {
                "pic": "http://mu1.sinaimg.cn/original/weiyinyue.music.sina.com.cn/vote_option/1516170945_90ba68.jpg",
                "pic_scheme": "https://weibo.com/huangxuan8533?topnav=1&wvr=6&topsug=1&is_hot=1",
                "scheme": "https://weibo.com/huangxuan8533?topnav=1&wvr=6&topsug=1&is_hot=1",
                "title": "黄轩的微博",
                "title_sub": "16</span>票数",
                "bottom_info": {
                  "text": "立即投票",
                  "pic": "https://ww3.sinaimg.cn/mw690/0068AIkzgw1ex5lt7iovej30rs15ok1v.jpg",
                  "scheme": "http://movie.weibo.com?theme_id=55&option_id=355&sig="
                }
              },
              {
                "pic": "http://mu1.sinaimg.cn/original/weiyinyue.music.sina.com.cn/vote_option/1515671188.png",
                "pic_scheme": "http://weibo.com/u/1844477730/home",
                "scheme": "http://weibo.com/u/1844477730/home",
                "title": "欧豪",
                "title_sub": "6</span>票",
                "bottom_info": {
                  "text": "立即投票",
                  "pic": "http://wx1.sinaimg.cn/mw690/e99802b4ly1fff12jd6edj201c01ajr8.jpg",
                  "scheme": "http://movie.weibo.com?theme_id=55&option_id=479&sig="
                }
              },
              {
                "pic": "http://mu1.sinaimg.cn/original/weiyinyue.music.sina.com.cn/vote_option/1515669911.png",
                "pic_scheme": "http://weibo.com/u/2554404125?topnav=1&wvr=6",
                "scheme": "http://weibo.com/u/2554404125?topnav=1&wvr=6",
                "title": "倪妮V",
                "title_sub": "4</span>票数",
                "bottom_info": {
                  "text": "立即投票",
                  "pic": "https://ww3.sinaimg.cn/mw690/0068AIkzgw1ex5lt7iovej30rs15ok1v.jpg",
                  "scheme": "http://movie.weibo.com?theme_id=55&option_id=463&sig="
                }
              },
              {
                "pic": "",
                "pic_scheme": "http://weibo.com/u/2945931603/home",
                "scheme": "http://weibo.com/u/2945931603/home",
                "title": "李治廷",
                "title_sub": "1</span>票",
                "bottom_info": {
                  "text": "立即投票",
                  "pic": "http://wx1.sinaimg.cn/mw690/e99802b4ly1fff12jd6edj201c01ajr8.jpg",
                  "scheme": "http://movie.weibo.com?theme_id=55&option_id=475&sig="
                }
              },
              {
                "pic": "http://mu1.sinaimg.cn/original/weiyinyue.music.sina.com.cn/vote_option/55_1516070705_3c85de.png",
                "pic_scheme": "",
                "scheme": "",
                "title": "yanni",
                "title_sub": "0</span>票数",
                "bottom_info": {
                  "text": "立即投票",
                  "pic": "https://ww3.sinaimg.cn/mw690/0068AIkzgw1ex5lt7iovej30rs15ok1v.jpg",
                  "scheme": "http://movie.weibo.com?theme_id=55&option_id=734&sig="
                }
              },
              {
                "pic": "http://mu1.sinaimg.cn/original/weiyinyue.music.sina.com.cn/vote_option/1516170974_3c85de.jpg",
                "pic_scheme": "",
                "scheme": "",
                "title": "yani1",
                "title_sub": "0</span>票",
                "bottom_info": {
                  "text": "立即投票",
                  "pic": "http://wx1.sinaimg.cn/mw690/e99802b4ly1fff12jd6edj201c01ajr8.jpg",
                  "scheme": "http://movie.weibo.com?theme_id=55&option_id=735&sig="
                }
              },
              {
                "pic": "http://mu1.sinaimg.cn/original/weiyinyue.music.sina.com.cn/vote_option/55_1516188871_a34b19.png",
                "pic_scheme": "",
                "scheme": "",
                "title": "澄明new",
                "title_sub": "0</span>票数",
                "bottom_info": {
                  "text": "立即投票",
                  "pic": "https://ww3.sinaimg.cn/mw690/0068AIkzgw1ex5lt7iovej30rs15ok1v.jpg",
                  "scheme": "http://movie.weibo.com?theme_id=55&option_id=764&sig="
                }
              }
            ]
          }
          arr.card_group[i] = item;
        }
        if(card.card_type==9){
          var item= {
            "card_type":9,
            "itemid":"",
            "title":"",
            "openurl":"",
            "is_asyn":0,
            "asyn_url":"",
            "actionlog":[

            ],
            "weibo_info":{
              "created_at":1515121454,
              "id":4192785621429785,
              "mid":"4192785621429785",
              "can_edit":false,
              "text":"http://t.cn/R08utuT[星星][星星][星星][星星][星星]，#0112勇敢者游戏#看完首映，表示非常值得去电影院观看。画面和场景给人强烈的视觉冲击，故事既有笑点又有泪点，观影过程全场爆笑N次，但笑完之后又有让你觉得特别温暖和感动的瞬间。每个人物的性格突出，一小队现实人类进入游戏空间之后变身成为与 ​",
              "source":"",
              "appid":2031531,
              "user":{
                "id":2089004187,
                "name":"全球最电影",
                "avatar_large":"http://tva1.sinaimg.cn/crop.0.0.1242.1242.180/7c83ac9bly8fn99i81va5j20yi0yi40b.jpg",
                "profile_image_url":"http://tva1.sinaimg.cn/crop.0.0.1242.1242.50/7c83ac9bly8fn99i81va5j20yi0yi40b.jpg",
                "verified":true,
                "verified_type":0,
                "verified_type_ext":1,
                "mbtype":1,
                "mbrank":6,
                "allow_all_comment":true,
                "verified_tmp":0,
                "verified_color":"gold"
              },
              "reposts_count":287,
              "comments_count":205,
              "attitudes_count":501,
              "pending_approval_count":0,
              "isLongText":false,
              "text_tag_tips":[

              ],
              "content_auth":0,
              "gif_ids":"",
              "comment_manage_info":{
                "comment_permission_type":-1,
                "approval_comment_type":0
              },
              "strid":"FCVMe5ZX3",
              "title":"",
              "large_pics":[
                "http://wx1.sinaimg.cn/large/7c83ac9bgy1fn5jvvww4bj20xc0m9n3s.jpg",
                "http://wx4.sinaimg.cn/large/7c83ac9bgy1fn5jvwidlaj20xc0m847a.jpg",
                "http://wx1.sinaimg.cn/large/7c83ac9bgy1fn5jvx560wj20xc0m9gv5.jpg",
                "http://wx3.sinaimg.cn/large/7c83ac9bgy1fn5jvxs2d9j20xc0m9wm8.jpg",
                "http://wx3.sinaimg.cn/large/7c83ac9bgy1fn5jvyah8jj20xc0oy0yk.jpg",
                "http://wx2.sinaimg.cn/large/7c83ac9bgy1fn5jvyrbguj20m80xcjy1.jpg",
                "http://wx2.sinaimg.cn/large/7c83ac9bgy1fn5jvzd77dj20xc0m9wls.jpg",
                "http://wx4.sinaimg.cn/large/7c83ac9bgy1fn5jvvf99pj20xc0m9wiw.jpg",
                "http://wx4.sinaimg.cn/large/7c83ac9bgy1fn5jw07ok8j20xc0m9n4t.jpg"
              ],
              "small_pic":[
                "http://wx1.sinaimg.cn/bmiddle/7c83ac9bgy1fn5jvvww4bj20xc0m9n3s.jpg",
                "http://wx4.sinaimg.cn/bmiddle/7c83ac9bgy1fn5jvwidlaj20xc0m847a.jpg",
                "http://wx1.sinaimg.cn/bmiddle/7c83ac9bgy1fn5jvx560wj20xc0m9gv5.jpg",
                "http://wx3.sinaimg.cn/bmiddle/7c83ac9bgy1fn5jvxs2d9j20xc0m9wm8.jpg",
                "http://wx3.sinaimg.cn/bmiddle/7c83ac9bgy1fn5jvyah8jj20xc0oy0yk.jpg",
                "http://wx2.sinaimg.cn/bmiddle/7c83ac9bgy1fn5jvyrbguj20m80xcjy1.jpg",
                "http://wx2.sinaimg.cn/bmiddle/7c83ac9bgy1fn5jvzd77dj20xc0m9wls.jpg",
                "http://wx4.sinaimg.cn/bmiddle/7c83ac9bgy1fn5jvvf99pj20xc0m9wiw.jpg",
                "http://wx4.sinaimg.cn/bmiddle/7c83ac9bgy1fn5jw07ok8j20xc0m9n4t.jpg"
              ],
              "large_pic":"",
              "film_id":"183380",
              "film_name":"勇敢者游戏：决战丛林",
              "score":"10",
              "card_info":{
                "big_card":{
                  "text":"",
                  "type":"big_card",
                  "object_type":"picture",
                  "object":{
                    "large_pics":[
                      {
                        "url":"http://wx1.sinaimg.cn/large/7c83ac9bgy1fn5jvvww4bj20xc0m9n3s.jpg",
                        "width":1200,
                        "height":801
                      },
                      {
                        "url":"http://wx4.sinaimg.cn/large/7c83ac9bgy1fn5jvwidlaj20xc0m847a.jpg",
                        "width":1200,
                        "height":800
                      },
                      {
                        "url":"http://wx1.sinaimg.cn/large/7c83ac9bgy1fn5jvx560wj20xc0m9gv5.jpg",
                        "width":1200,
                        "height":801
                      },
                      {
                        "url":"http://wx3.sinaimg.cn/large/7c83ac9bgy1fn5jvxs2d9j20xc0m9wm8.jpg",
                        "width":1200,
                        "height":801
                      },
                      {
                        "url":"http://wx3.sinaimg.cn/large/7c83ac9bgy1fn5jvyah8jj20xc0oy0yk.jpg",
                        "width":1200,
                        "height":898
                      },
                      {
                        "url":"http://wx2.sinaimg.cn/large/7c83ac9bgy1fn5jvyrbguj20m80xcjy1.jpg",
                        "width":800,
                        "height":1200
                      },
                      {
                        "url":"http://wx2.sinaimg.cn/large/7c83ac9bgy1fn5jvzd77dj20xc0m9wls.jpg",
                        "width":1200,
                        "height":801
                      },
                      {
                        "url":"http://wx4.sinaimg.cn/large/7c83ac9bgy1fn5jvvf99pj20xc0m9wiw.jpg",
                        "width":1200,
                        "height":801
                      },
                      {
                        "url":"http://wx4.sinaimg.cn/large/7c83ac9bgy1fn5jw07ok8j20xc0m9n4t.jpg",
                        "width":1200,
                        "height":801
                      }
                    ],
                    "small_pics":[
                      {
                        "url":"http://wx1.sinaimg.cn/bmiddle/7c83ac9bgy1fn5jvvww4bj20xc0m9n3s.jpg",
                        "width":0,
                        "height":0
                      },
                      {
                        "url":"http://wx4.sinaimg.cn/bmiddle/7c83ac9bgy1fn5jvwidlaj20xc0m847a.jpg",
                        "width":0,
                        "height":0
                      },
                      {
                        "url":"http://wx1.sinaimg.cn/bmiddle/7c83ac9bgy1fn5jvx560wj20xc0m9gv5.jpg",
                        "width":0,
                        "height":0
                      },
                      {
                        "url":"http://wx3.sinaimg.cn/bmiddle/7c83ac9bgy1fn5jvxs2d9j20xc0m9wm8.jpg",
                        "width":0,
                        "height":0
                      },
                      {
                        "url":"http://wx3.sinaimg.cn/bmiddle/7c83ac9bgy1fn5jvyah8jj20xc0oy0yk.jpg",
                        "width":0,
                        "height":0
                      },
                      {
                        "url":"http://wx2.sinaimg.cn/bmiddle/7c83ac9bgy1fn5jvyrbguj20m80xcjy1.jpg",
                        "width":0,
                        "height":0
                      },
                      {
                        "url":"http://wx2.sinaimg.cn/bmiddle/7c83ac9bgy1fn5jvzd77dj20xc0m9wls.jpg",
                        "width":0,
                        "height":0
                      },
                      {
                        "url":"http://wx4.sinaimg.cn/bmiddle/7c83ac9bgy1fn5jvvf99pj20xc0m9wiw.jpg",
                        "width":0,
                        "height":0
                      },
                      {
                        "url":"http://wx4.sinaimg.cn/bmiddle/7c83ac9bgy1fn5jw07ok8j20xc0m9n4t.jpg",
                        "width":0,
                        "height":0
                      }
                    ]
                  }
                },
                "html":"#0112勇敢者游戏#</a>看完首映，表示非常值得去电影院观看。画面和场景给人强烈的视觉冲击，故事既有笑点又有泪点，观影过程全场爆笑N次，但笑完之后又有让你觉得特别温暖和感动的瞬间。每个人物的性格突出，一小队现实人类进入游戏空间之后变身成为与原本现实世界性格外貌反差很大的游戏角色，成长是推动故事前进的主导。巨石强森一改硬汉形象，在险象环生的勇敢者游戏中扮演弱鸡形象，杰克·布莱克“反串”成高中校花这波操作，简直是太萌太好玩了！虽然桥段并不是十分新颖，但表演搞笑又不尴尬，节奏张弛有度，是一部老少皆宜的影片。...全文</a>",
                "text":"http://t.cn/R08utuT[星星][星星][星星][星星][星星]，#0112勇敢者游戏#看完首映，表示非常值得去电影院观看。画面和场景给人强烈的视觉冲击，故事既有笑点又有泪点，观影过程全场爆笑N次，但笑完之后又有让你觉得特别温暖和感动的瞬间。每个人物的性格突出，一小队现实人类进入游戏空间之后变身成为与原本现实世界性格外貌反差很大的游戏角色，成长是推动故事前进的主导。巨石强森一改硬汉形象，在险象环生的勇敢者游戏中扮演弱鸡形象，杰克·布莱克“反串”成高中校花这波操作，简直是太萌太好玩了！虽然桥段并不是十分新颖，但表演搞笑又不尴尬，节奏张弛有度，是一部老少皆宜的影片。"
              },
              "comment_scheme":"sinaweibo://detail?mblogid=FCVMe5ZX3&tab=2&need_scroll_to_tab=1"
            }
          }
          arr.card_group[i] = item;
        }
        if(card.card_type==25){
          var item= {
            "card_type":25,
            "itemid":"",
            "title":"",
            "openurl":"",
            "is_asyn":0,
            "asyn_url":"",
            "user_verified_color":"yellow",
            "user_name":"华庆_松山照",
            "scheme":"https://m.weibo.cn/u/3919053492?uid=3919053492&luicode=10000011&lfid=1059030002_6486_42",
            "desc1":"#最强贺岁档#之我给@TFBOYS-王俊凯 送出#爱豆电影大表白#星星卡！大家快来为爱豆表白啦，有可能会被爱豆看到哦！http://t.cn/RYd1dN0",
            "desc2":"粉丝：97",
            "user_profile_pic":"https://tva4.sinaimg.cn/crop.303.4.758.758.180/e99802b4jw8eqwtfhm7gvj211y0lc0ya.jpg",
            "button":{
              "sub_type":0,
              "params":"/addfollow"
            },
            "actionlog":[

            ],

          }
          arr.card_group[i] = item;
        }
      }
    }

  })
  fs.writeFileSync(__dirname+"/../mock/subject/h5/getcardinfo",JSON.stringify({
    "status":1,"message":"ok",
    "data":{
      "cards":JSON.parse(req.body.cardlist)
    }
  },null,2))
  fs.writeFileSync(__dirname+"/../mock/subject/h5/getpageinfo",JSON.stringify({
    "status":1,"message":"ok",
    "data":{
      "cards":cards
    }
  },null,2))
  res.json({
    status:1
  })
})

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
});
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
    hotMiddleware.publish({ action: 'reload' });
    cb();
  });
});
const fs=require("fs")
const rewrite=require("./rewrite")
Object.keys(mockUrl).forEach(function(url) {
  var mock = mockUrl[url];

  if(/^http:/.test(mock)){

    var options = {
      target: mock.replace(/(http:\/\/[^/]+)\/.+/,"$1")
      ,changeOrigin: true,
      pathRewrite:{}
    };
    options.pathRewrite[url]=mock.replace(/http:\/\/[^/]+\//,"/")
    app.use(proxyMiddleware(options.filter || url, options));
  }else{
    var filepath=path.join(__dirname,"../mock"+mock)
    if(fs.existsSync(filepath)){
      app.use(url,function (req,res,next) {
        res.jsonp(JSON.parse(fs.readFileSync(filepath).toString()))
      });
    }else{
      app.use(rewrite(url,mock));
    }

  }

});
// proxy api requests
// Object.keys(proxyTable).forEach(function(context) {
//   var options = proxyTable[context];
//   if (typeof options === 'string') {
//     options = { target: options };
//   }
//   app.use(proxyMiddleware(options.filter || context, options));
// });

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// serve pure static assets
const staticPath = path.posix.join(
  config.dev.assetsPublicPath,
  config.dev.assetsSubDirectory
);
app.use(staticPath, express.static('./static'));
// app.use(express.static('./test'));
function getIPAdress(){
  var interfaces = require('os').networkInterfaces();
  for(var devName in interfaces){
    var iface = interfaces[devName];
    for(var i=0;i<iface.length;i++){
      var alias = iface[i];
      if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
        return alias.address;
      }
    }
  }
}
const uri = 'http://'+getIPAdress()+':' + port;

let _resolve;
const readyPromise = new Promise(resolve => {
  _resolve = resolve;
});

console.log('> Starting dev server...');
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n');
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri);
  }
  _resolve();
});

var server = app.listen(port);

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close();
  }
};
