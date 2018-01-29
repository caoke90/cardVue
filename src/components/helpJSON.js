
module.exports={
  "card1":{
    "help": "card1:ui类的容器",
  },
  "card2":{
    "help": "card2:宫格图文",
    "demo_url":require("../assets/demoimg/card2.png"),
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
    "demo_url":require("../assets/demoimg/card3.png"),
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
    },
  },
  "card8":{
    "help":"card8:图文",
    "demo_url":require("../assets/demoimg/card8.png"),
    "dataMap":{
      "pic":"pic",
      "title_sub":"title_sub",
      "desc1":"desc1",
      "desc2":"desc2",
      "scheme":"scheme",
      "button.name":"buttonName",
      "button.pic":"buttonPic",
      "button.params":"buttonUrl",
    },
    //属性类型
    "propsType":{
      "scheme":"Url",
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
    "demo_url":require("../assets/demoimg/card9.png"),
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
    "demo_url":require("../assets/demoimg/card11.png"),
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
    "demo_url":require("../assets/demoimg/card13.png"),

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
      "left":"距离左边",
      "top":"距离上面",
    },
    //属性类型
    "propsType":{
      "src":"imgUrl",
      "width":"Rem",
      "height":"Rem",
      "openurl":"Url",
      "position":"Selector",
      "positionOptions":[{key: "absolute", value: '普通'}, {key: "fixed", value: '固定在页面'}],
    },
  },

  "card20":{
    "help":"card20:投票card",
    "demo_url":require("../assets/demoimg/card20.png"),
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
  "card22":{
    "help":"card22:单行",
    "demo_url":require("../assets/demoimg/card22.png"),
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
    "demo_url":require("../assets/demoimg/card23.png"),
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
    "demo_url":require("../assets/demoimg/card24.png"),
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
    "demo_url":require("../assets/demoimg/card25.png"),
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
    "demo_url":require("../assets/demoimg/card26.png"),
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
    "demo_url":require("../assets/demoimg/card28.png"),
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
    "demo_url":require("../assets/demoimg/card29.png"),
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
    "demo_url":require("../assets/demoimg/card30.png"),
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
    }
  },
  getCardData:function(name) {
    var num=(""+name).replace(/\D+/g,"")
    for(var k in this){
      if(num==k.replace(/\D+/g,"")){
        return JSON.parse(JSON.stringify(this[k]));
      }
    }
  }
}
