import Bus from '../../marvel/bus';
module.exports={
  "card1":{
    "help": "card1:ui类的容器",
  },
  "card2":{
    "help": "card2:宫格图文",
    "demo_url":require("../../assets/demoimg/card2.png"),
    //数据映射
    "dataMap":{
      "col":"col",
      "items":"items",
    },
    "editHelp":{
      "col":"每行展示的数量",
      "items":"图文数据",
      "items.pic":"图片地址",
      "items.scheme":"跳转地址",
      "items.desc1":"第一行文字",
      "items.desc2":"第二行文字",
    },
    //属性类型
    "propsType":{
      "col":"Selector",
      "colOptions":[
        {key: "1", value: '1'},
        {key: "2", value: '2'},
        {key: "3", value: '3'},
        {key: "4", value: '4'},
        {key: "5", value: '5'},
        {key: "6", value: '6'},
        {key: "7", value: '7'},
        {key: "8", value: '8'},
        {key: "9", value: '9'},
        {key: "10", value: '10'},
      ],
      "items.pic":"imgUrl",
      "items.scheme":"Url",
    },
  },
  "card3":{
    "help": "card3:高度可调的轮播图",
    "demo_url":require("../../assets/demoimg/card3.png"),
    //数据映射
    "dataMap":{
      // "defaultIndex":"defaultIndex",
      "height":"height",
      "pic_items":"pic_items",
    },
    //属性说明
    "editHelp":{
      // "defaultIndex":"默认显示第几张图",
      "height":"banner高度",
      "pic_items":"banner中的图片和url",
      "pic_items.src":"图片地址",
      "pic_items.openurl":"跳转url",
    },
    //属性类型
    "propsType":{
      "defaultIndex":"Number",
      "height":"Rem",
      "pic_items.src":"imgUrl",
      "pic_items.src":"imgUrl",
    },
  },
  "card8":{
    "help":"card8:图文",
    "demo_url":require("../../assets/demoimg/card8.png"),
    "dataMap":{
      "pic":"pic",
      "title_sub":"title_sub",
      "desc1":"desc1",
      "desc2":"desc2",
      "scheme":"scheme",
      "button.name":"buttonName",
      "button.pic":"buttonPic",
      "button.params.scheme":"buttonUrl",
    },
    //属性类型
    "propsType":{
      "scheme":"Url",
      "buttonUrl":"Url",
      "pic":"imgUrl",
      "buttonPic":"imgUrl",
    },
    "editHelp":{
      "pic":"左边图片",
      "title_sub":"标题",
      "desc1":"右边文字1",
      "desc2":"右边文字2",
      "scheme":"右边链接跳转",
      "buttonName":"按钮文字",
      "buttonPic":"按钮图片",
      "buttonUrl":"按钮跳转",
    }
  },
  "card9":{
    "help":"card9:表示一条微博",
    "demo_url":require("../../assets/demoimg/card9.png"),
    "dataMap":{
      "weibo_info.url":"url"
    },
    "editHelp":{
      "url":"该微博的url地址"
    }
  },
  "card10":{
    "help":"card10:一个空的容器，可以在里面放入卡片",
    "dataMap":{
      "title":"title",
    },
    "editHelp":{
      "title":"标题"
    },
  },
  "card11":{
    "help":"card11,全屏动画，默认3秒后消失",
    "demo_url":require("../../assets/demoimg/card11.png"),
    //数据映射
    "dataMap":{
      "src":"src",
      "openurl":"openurl",
      "duration":"duration",
    },
    "editHelp":{
      "src":"图片的地址",
      "openurl":"跳转地址",
      "duration":"多少毫秒消失"
    },
    //属性类型
    "propsType":{
      "src":"imgUrl",
      "duration":"Number",
      "openurl":"Url",
    },
  },

  "card13":{
    "help":"card13:可移动、可调整大小的图片",
    "demo_url":require("../../assets/demoimg/card13.png"),

    //数据映射
    "dataMap":{
      "style.position":"position",
      "src":"src",
      "openurl":"openurl",
      "width":"width",
      "height":"height",
      // "style.left":"left",
      // "style.top":"top",

    },
    "editHelp":{
      "position":"定位方式",
      "src":"图片",
      "openurl":"跳转",
      "width":"宽度",
      "height":"高度",
      // "left":"距离左边",
      // "top":"距离上面",
    },
    "watch":{
      "style.position":function(nval,oval,editVue){
        var style=JSON.parse(JSON.stringify(editVue.card.style))

        if(nval=="fixed"){
          if(parseFloat(style.top)>window.innerHeight/50){
            style.top=parseFloat(style.top)%window.innerHeight/50;
          }
          if(parseFloat(style.top)>window.innerHeight/100){
            style.bottom=window.innerHeight/50-parseFloat(style.top)-parseFloat(editVue.card.height)+"rem";
            delete style.top;
          }
        }else{
          if(style.bottom){
            style.top=window.innerHeight/50-parseFloat(style.bottom)-parseFloat(editVue.card.height)+"rem";
            delete style.bottom;
          }

        }
        editVue.card.style=style;

      }
    },
    //属性类型
    "propsType":{
      "src":"imgUrl",
      "width":"Rem",
      "height":"Rem",
      // "top":"Rem",
      // "left":"Rem",
      "openurl":"Url",
      "position":"Selector",
      "positionOptions":[{key: "absolute", value: '普通'}, {key: "fixed", value: '固定在页面'}],
    },
  },

  "card20":{
    "help":"card20:投票card",
    "demo_url":require("../../assets/demoimg/card20.png"),
    //数据映射
    "dataMap":{
      "title":"title",
      "pic_height":"pic_height",
      "sort_type":"sort_type",
      "left_themeid":"left_themeid",
      "right_themeid":"right_themeid",
      "vote_url":"vote_url",
      "vote_item_start":"vote_item_start",
      "vote_item_end":"vote_item_end",
      "left_votenum_lefttext":"left_votenum_lefttext",
      "left_votenum_righttext":"left_votenum_righttext",
      "right_votenum_lefttext":"right_votenum_lefttext",
      "right_votenum_righttext":"right_votenum_righttext",

      "left_bottom_pic_url":"left_bottom_pic_url",
      "left_bottom_text":"left_bottom_text",
      "right_bottom_pic_url":"right_bottom_pic_url",
      "right_bottom_text":"right_bottom_text",


    },
    "editHelp":{
      "title":"标题",
      "pic_height":"图片高度",
      "vote_url":"投票结果页地址",
      "left_themeid":"左边投票主题ID",
      "right_themeid":"右边投票主题ID",
      "vote_item_start":"投票项开始序号",
      "vote_item_end":"投票项结束序号",
      "sort_type":"投票展示顺序",
      "left_votenum_lefttext":"左边票数项-左边文案",
      "left_votenum_righttext":"左边票数项-右边文案",
      "right_votenum_lefttext":"右边票数项-右边文案",
      "right_votenum_righttext":"右边票数项-右边文案",

      "left_bottom_pic_url":"左边投票项底部图片",
      "left_bottom_text":"左边投票项底部文案",
      "right_bottom_pic_url":"右边投票项底部图片",
      "right_bottom_text":"右边投票项底部文案",

    },
    //异步获取完数据，然后再进行编辑
    "sync":function (next) {
      var helpItem=this;
      Bus.$http.get("/admin/mobile_page/ajax_getpolllist").then(function (rst) {
        if (rst.data) {
          helpItem.propsType.left_themeidOptions=[];
          helpItem.propsType.right_themeidOptions=[];
          for(var k in rst.data.votethemelist){
            helpItem.propsType.left_themeidOptions.push({key: k, value: rst.data.votethemelist[k]})
            helpItem.propsType.right_themeidOptions.push({key: k, value: rst.data.votethemelist[k]})
          }
          next()
        }
      })
    },
    //属性类型
    "propsType":{
      "pic_height":"Rem",
      "left_bottom_pic_url":"imgUrl",
      "right_bottom_pic_url":"imgUrl",
      "left_themeid":"Selector",
      "right_themeid":"Selector",
      "sort_type":"Selector",
      "vote_item_start":"Number",
      "vote_item_end":"Number",

      "left_themeidOptions":["异步获取的"],
      "right_themeidOptions":["异步获取的"],
      "sort_typeOptions":[
        {key: "desc", value: '票数倒序'},
        {key: "asc", value: '票数顺序'},
        {key: "rand", value: '随机'},
        {key: "default", value: '按选项顺序'},
        {key: "default_desc", value: '按选项倒序'},
      ],
    },
  },
  "card21":{
    "help":"card21:四图投票",
    "demo_url":require("../../assets/demoimg/card21.jpg"),
    //数据映射
    "dataMap":{
      "title":"title",
      "pic_height":"pic_height",
      "themeid":"themeid",
      "vote_url":"vote_url",
      "vote_item_start":"vote_item_start",
      "vote_item_end":"vote_item_end",
      "sort_type":"sort_type",
      "votenum_lefttext":"votenum_lefttext",
      "votenum_righttext":"votenum_righttext",
      // "bottom_pic_url":"bottom_pic_url",
      "bottom_text":"bottom_text",

    },
    "editHelp":{
      "title":"标题",
      "pic_height":"图片高度",
      "themeid":"投票主题ID",
      "vote_url":"投票结果页地址",
      "vote_item_start":"投票项开始序号",
      "vote_item_end":"投票项结束序号",
      "sort_type":"投票展示顺序",
      "votenum_lefttext":"票数项title_sub左边文案",
      "votenum_righttext":"票数项title_sub右边文案",
      "bottom_pic_url":"投票项底部图片",
      "bottom_text":"投票项底部文案",

    },
    //异步获取完数据，然后再进行编辑
    "sync":function (next) {
      var helpItem=this;
      Bus.$http.get("/admin/mobile_page/ajax_getpolllist").then(function (rst) {
        if (rst.data) {
          helpItem.propsType.themeidOptions=[];
          for(var k in rst.data.votethemelist){
            helpItem.propsType.themeidOptions.push({key: k, value: rst.data.votethemelist[k]})
          }
          next()
        }
      })
    },
    //属性类型
    "propsType":{
      "pic_height":"Rem",
      "vote_url":"Url",
      "sort_type":"Selector",
      "vote_item_start":"Number",
      "vote_item_end":"Number",
      "bottom_pic_url":"imgUrl",

      "themeid":"Selector",
      "themeidOptions":["异步获取的"],
      "sort_typeOptions":[
        {key: "desc", value: '票数倒序'},
        {key: "asc", value: '票数顺序'},
        {key: "rand", value: '随机'},
        {key: "default", value: '按选项顺序'},
        {key: "default_desc", value: '按选项倒序'},
      ],
    },
  },
  "card22":{
    "help":"card22:单行",
    "demo_url":require("../../assets/demoimg/card22.png"),
    "dataMap":{
      "pic":"pic",
      "desc":"desc",
      "scheme":"scheme",
    },
    "editHelp":{
      "pic":"左边图片",
      "desc":"文案",
      "scheme":"点击跳转",
    },
    //属性类型
    "propsType":{
      "pic":"imgUrl",
      "scheme":"Url",
    }
  },
  "card23":{
    "help":"card23:单行按钮",
    "demo_url":require("../../assets/demoimg/card23.png"),
    "dataMap":{
      "show_color":"show_color",
      "desc":"desc",
      "scheme":"scheme",
    },
    "editHelp":{
      "show_color":"按钮颜色",
      "desc":"文案",
      "scheme":"点击跳转",
    },
    //属性类型
    "propsType":{
      "scheme":"Url",
      "show_color":"Selector",
      "show_colorOptions":[
        {key: "m-btn-white", value: '白按钮'},
        {key: "m-btn-blue", value: '蓝按钮'},
        {key: "m-btn-ltgreen", value: '绿按钮'},
        {key: "m-btn-ltred", value: '红按钮'},
        {key: "default_desc", value: '按选项倒序'},
      ],
    }
  },
  "card24":{
    "help":"card24: 纯文本",
    "demo_url":require("../../assets/demoimg/card24.png"),
    "dataMap":{
      "title":"title",
      "desc":"desc",
      "source":"source",
      "scheme":"scheme",
    },
    "editHelp":{
      "title":"标题",
      "desc":"文案",
      "source":"来源文案",
      "scheme":"点击跳转",
    },
    //属性类型
    "propsType":{
      "scheme":"Url"
    }
  },
  "card25":{
    "help":"card25: 用户",
    "demo_url":require("../../assets/demoimg/card25.png"),
    "dataMap":{
      "uid":"uid",
    },
    "editHelp":{
      "uid":"用户uid",
    },
    //属性类型
    "propsType":{

    }
  },
  "card26":{
    "help":"card26: 宫格按钮",
    "demo_url":require("../../assets/demoimg/card26.png"),
    "dataMap":{
      "col":"col",
      "items":"items",
    },
    "editHelp":{
      "col":"每行展示的数量",
      "items":"按钮组",
      "items.title_sub":"标题",
      "items.pic":"左边图片",
      "items.scheme":"跳转地址",
    },
    //属性类型
    "propsType":{
      "col":"Selector",
      "colOptions":[
        {key: "1", value: '1'},
        {key: "2", value: '2'},
        {key: "3", value: '3'},
        {key: "4", value: '4'},
        {key: "5", value: '5'},
        {key: "6", value: '6'},
        {key: "7", value: '7'},
        {key: "8", value: '8'},
        {key: "9", value: '9'},
        {key: "10", value: '10'},
      ],
      "group.pic":"imgUrl",
      "items.scheme":"Url",
    }
  },
  "card28":{
    "help":"card28: 宫格",
    "demo_url":require("../../assets/demoimg/card28.png"),
    "dataMap":{
      "col":"col",
      "items":"items",
    },
    "editHelp":{
      "col":"每行展示的数量",
      "items":"按钮组",
      "items.title_sub":"标题",
      "items.pic":"左边图片",
      "items.scheme":"跳转地址",
    },
    //属性类型
    "propsType":{
      "col":"Selector",
      "colOptions":[
        {key: "1", value: '1'},
        {key: "2", value: '2'},
        {key: "3", value: '3'},
        {key: "4", value: '4'},
        {key: "5", value: '5'},
        {key: "6", value: '6'},
        {key: "7", value: '7'},
        {key: "8", value: '8'},
        {key: "9", value: '9'},
        {key: "10", value: '10'},
      ],
      "items.pic":"imgUrl",
      "items.scheme":"Url",
    }
  },
  "card29":{
    "help":"card29: 标题",
    "demo_url":require("../../assets/demoimg/card29.png"),
    "dataMap":{
      "pic":"pic",
      "desc":"desc",
      "title_extra_text":"title_extra_text",
      "scheme":"scheme",
    },
    "editHelp":{
      "pic":"左边图片",
      "desc":"文案",
      "scheme":"点击跳转",
      "title_extra_text":"右侧副标题",
    },
    //属性类型
    "propsType":{
      "pic":"imgUrl",
      "scheme":"Url",
    }
  },
  "card30":{
    "help":"card30: 分割线",
    "demo_url":require("../../assets/demoimg/card30.png"),
    "dataMap":{
      "name":"name",
      "scheme":"scheme",
    },
    "editHelp":{
      "name":"文案",
      "scheme":"点击跳转",
    },
    //属性类型
    "propsType":{
      "scheme":"Url"
    },
  },

 "card2008":{
    "help":"card2008:图文",
    "demo_url":require("../../assets/demoimg/card8.png"),
    "dataMap":{
      "film_id":"film_id",
      "button_type":"button_type"
    },
    //属性类型
    "propsType":{
      "button_type":"Selector",
      "button_typeOptions":[
       {key: "0", value: '不配置'},
        {key: "1", value: '点评'},
        {key: "2", value: '购票'}
      ],
    },
    "editHelp":{
    	  "film_id":"电影ID",
      "button_type":"按钮类型"
    }
  },
  "card3001":{
    "help":"card3001:话题流card",
    "demo_url":require("../../assets/demoimg/card3001.jpg"),
    "dataMap":{
      "topic_name":"topic_name",
      "sort_type":"sort_type",
      "num":"num",
    },
    //属性类型
    "propsType":{
      "num":"Number",
      "sort_type":"Selector",
      "sort_typeOptions":[
        {key: "time", value: '时间倒序'},
        {key: "social", value: '社会化排序'},
        {key: "hot", value: '热门度'},
        {key: "fwnum", value: '按转发数倒序'},
        {key: "cmtnum", value: '按评论数倒序'},
      ],
    },
    "editHelp":{
      "topic_name":"话题词",
      "sort_type":"排序类型",
      "num":"展示数量",
      "object_type":"组合类业务编号",
    }
  },
  "card100":{
    "help":"card100:任务卡片",
    "demo_url":require("../../assets/demoimg/card100.png"),
    "dataMap":{
      "user_id":"user_id",
      "task_id":"task_id",
      "desc":"desc",
      "scheme":"scheme",
    },
    //属性类型
    "propsType":{
      "scheme":"Url",
      "user_id":"Selector",
      "user_idOptions":["异步获取的"],
      "task_id":"Selector",
      "task_idOptions":["异步获取的"],
    },
    //异步获取完数据，然后再进行编辑
    "sync":function (next) {
      var helpItem=this;
      Bus.$http.get("/getuserandtask").then(function (rst) {
        if (rst.data) {
          helpItem.propsType.user_idOptions=[];
          helpItem.propsType.task_idOptions=[];
          for(var k in rst.data.user){
            helpItem.propsType.user_idOptions.push({key: k, value: rst.data.user[k]})
          }
          for(var k in rst.data.task){
            helpItem.propsType.task_idOptions.push({key: k, value: rst.data.task[k]})

          }
          next()
        }
      })
    },
    "editHelp":{
      user_id:"教师名称",
      task_id:"任务名称",
      desc:"描叙",
      scheme:"跳转",
    }
  },
  getCardData:function(name) {
    if(typeof name=="number"){
      name="card"+name;
    }
    for(var k in this){
      if(name==k){
        return this[k];
      }
    }
  }
}
