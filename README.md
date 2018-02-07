  
本地安装
------

```
npm install -g cnpm --registry=https://registry.npm.taobao.org

cnpm install

```

* `npm run dev`


启动本地 Server，开启代码热更新，访问 http://localhost:8080。


>注:暂时不支持更改端口号，因为要带 Cookie 跨域访问后端接口。



* `npm run build`


构建代码，并上传到 FTP（可选），方便与后端联调、测试。

每个人的服务器参见V8开发机配置。


* `npm run deploy`


构建生成环境代码，发布到 CDN。仅限在持续集成系统使用。


### 一、基础card结构数据
### 1.1 page属性

| 属性名 |字段说明 | 备注 | 
| :----------- | :------| :------ | 
| page_id    | 专题id      |    | 
| name       | 专题名称|  | 
| recommend       | 专题推荐语，用于专题链接解析图文card的第二栏信息|  | 
| type_id       | 专题创建部门编号|  | 

### 1.2 容器属性

后台保存的card数据，是以容器为一个基本单位，卡片放置在容器的card_group字段内

| 属性名 | 数据类型 | 是否必须 | 默认值 |字段说明 | 备注 | 
| :----------- | :------| :------------ | :----------- |:----------- | :------ | 
| card_type       | int  | 是        |  | card标识符      |    | 
| item_id       | string  | 是        |  | 这个card的标识id（用以标识唯一的card，进下一级页面时，会将该id带入下级页面做日志）     |    | 

### 1.3 card属性

| 属性名 | 数据类型 | 是否必须 | 默认值 |字段说明 | 备注 | 
| :----------- | :------| :------------ | :----------- |:----------- | :------ | 
| card_type       | int  | 是        |  | card标识符      |    | 
| item_id       | string  | 是        |  | 这个card的标识id（用以标识唯一的card，进下一级页面时，会将该id带入下级页面做日志）     |    | 

### 1.4 card数据结构

### 统一的button结构

| 字段名 | 数据类型 | 是否必须 | 默认值 |字段说明 | 备注 | 
| :----------- | :------| :------------ | :----------- |:----------- | :------ | 
| name       | string  | 否        |  | 名称      |    | 
| pic      | string  | 是        |  | icon     |    | 
| type       | string | 是       | link | button 类型 ,当前有 link,follow |  | 
| sub_type       | string | 是       | 0 | type扩展,针对link，0:没有关注，1:已关注,为1时 按钮不能点击 |  | 
| params       | object | 否       |  | type=link 时，需要传scheme字段，即点击跳转地址,type=follow时,需传callback_url|  | 
| action_log       | object | 否       |  | 用于后台统计使用，用户进行操作时会将其数据上传服务器做用户行为统计 ,第一期暂不支持|  | 

### 统一的回调上行接口callback_url
返回样例：
{'status' : 1,'message' : 'ok','data':{'msg':'关注成功'}}

status: 1,表示成功，其他表示失败

message:说明

data: 返回结果

msg:表示操作结果说明

### card2 宫格图文（卡片）
   支持的字段

| 字段名 | 数据类型 | 是否必须 | 默认值 |字段说明 | 备注 | 
| :----------- | :------| :------------ | :----------- |:----------- | :------ | 
| card_type      | int    | 是       | 2| 容器或卡片类型|  | 
| height          | string | 是       |  | 图片高度|  | 
| col          | int | 是       |  | 每行展示的数量|  | 
| items  | Array | 否       | {"pic": "","scheme": "","desc1": "","desc2": ""} | 图片地址和跳转、文字1\文字2|  | 

 样例及对应的json串

### card3 可滑动、可调高度的轮播图（卡片）
   支持的字段

| 字段名 | 数据类型 | 是否必须 | 默认值 |字段说明 | 备注 | 
| :----------- | :------| :------------ | :----------- |:----------- | :------ | 
| card_type      | int    | 是       | 3| 容器或卡片类型|  | 
| height          | string | 是       |  | 图片高度|  | 
| pic_items  | Array | 否       | {"src": "","openurl": "",} | 图片地址和跳转|  | 

 样例及对应的json串

### card8 图文card（卡片）
   支持的字段

| 字段名 | 数据类型 | 是否必须 | 默认值 |字段说明 | 备注 | 
| :----------- | :------| :------------ | :----------- |:----------- | :------ |
| card_type      | int    | 是       | 8| 卡片类型|  | 
| pic     | string  | 否       |  |  左边图片      |    |
| title_sub     | string  | 否       |  |  三行文本中的第一行      |    |
| desc1     | string  | 否       |  |  三行文本中的第二行      |    |
| desc2     | string  | 否       |  |  三行文本中的第三行     |    |
| scheme     | string  | 否       |  |  点击card跳转地址      |    |
| button     | object | 否       |  |  统一的button结构    |    |

后台编辑保存时的数据结构 同 上面的结构

样式如下：
![6C1846A2-6BD6-491A-BA88-A2DF2FA65875](/uploads/e62c129990927858c27878b3c636a581/6C1846A2-6BD6-491A-BA88-A2DF2FA65875.png)

### card9 微博card（卡片）
   支持的字段

| 字段名 | 数据类型 | 是否必须 | 默认值 |字段说明 | 备注 | 
| :----------- | :------| :------------ | :----------- |:----------- | :------ |
| card_type      | int    | 是       | 9| 容器或卡片类型|  | 
| weibo_info     | object  | 否       | {} | 和首页微博卡片一样的数据类型      |    |

后台编辑保存时的数据结构

| 字段名 | 数据类型 | 是否必须 | 默认值 |字段说明 | 备注 | 
| :----------- | :------| :------------ | :----------- |:----------- | :------ |
| card_type      | int    | 是       | 9| 容器或卡片类型|  | 
| weibo_info     | object  | 是       | {} | 里面传需要渲染的微博url，形如{'url':https://weibo.com/1826017320/FAHkneKEx}      |    |

### card10 一个空的容器，可以在里面放入卡片（容器）
   支持的字段

| 字段名 | 数据类型 | 是否必须 | 默认值 |字段说明 | 备注 | 
| :----------- | :------| :------------ | :----------- |:----------- | :------ |
| card_type      | int    | 是       | 10| 容器或卡片类型|  | 
| card_group     | array  | 是       | [] | 数组，元素是每个card      |    | 


   样例及对应的json串

### card11 可移动、可调整大小的图片（容器
   支持的字段

| 字段名 | 数据类型 | 是否必须 | 默认值 |字段说明 | 备注 | 
| :----------- | :------| :------------ | :----------- |:----------- | :------ | 
| card_type      | int    | 是       | 11| 容器或卡片类型|  | 
| card_group     | array  | 是       |  []| 数组，元素是每个card      |    | 
| src  | string | 否       |  | 图片地址|  | 


### card13 可移动、可调整大小的图片（容器
   支持的字段

| 字段名 | 数据类型 | 是否必须 | 默认值 |字段说明 | 备注 | 
| :----------- | :------| :------------ | :----------- |:----------- | :------ | 
| card_type      | int    | 是       | 13| 容器或卡片类型|  | 
| card_group     | array  | 是       |  []| 数组，元素是每个card      |    | 
| width      | string    | 是       | 0| 图片宽度| | 
| height          | string | 是       |  | 图片高度|  | 
| openurl        | string | 否       |  | 跳转链接|  | 
| src  | string | 否       |  | 图片地址|  | 
| style  | Object | 是       | {position:"absolute",top:"0rem",left:"0rem",zIndex:10,} | 位置信息|  | 

### card20 双图投票card（卡片）
   支持的字段:

| 字段名 | 数据类型 | 是否必须 | 默认值 |字段说明 | 备注 | 
| :----------- | :------| :------------ | :----------- |:----------- | :------ |
| card_type      | int    | 是       | 20| 容器或卡片类型|  | 
| width     | int  | 是       | 100 | 图片宽度,单位:px     |    |
| height     | int  | 是       | 100 | 图片高度,单位:px     |    |
| items     | array  | 是       |  | 投票项详情    |    |

items 字段说明

| 字段名 | 数据类型 | 是否必须 | 默认值 |字段说明 | 备注 | 
| :----------- | :------| :------------ | :----------- |:----------- | :------ |
| pic      | string    | 是       | | 图片url|  | 
| pic_scheme     | string  | 否       |  | 图片点击跳转地址     |    |
| scheme     | string  | 否       |  | 点击投票项区域跳转地址    |    |
| title     | string  | 是       |  | 投票项标题    |    |
| title_sub     | string  | 是       |  | 投票项副标题    |    |
| media_info     | object  | 否       |  | 投票项视频信息    |    |
| bottom_info     | object  | 否       |  | 投票项底部栏信息   |    |

media_info 字段说明

| 字段名 | 数据类型 | 是否必须 | 默认值 |字段说明 | 备注 | 
| :----------- | :------| :------------ | :----------- |:----------- | :------ |
| object_id      | string    | 是       | | 视频对象ID|  | 
| h5_url     | string  | 是       |  | 视频h5地址     |    |
| stream_url     | string  | 是       |  | 视频播放源地址    |    |
| object_type     | string  | 是       |  | 视频类型    |    |
| duration     | int  | 否       |  | 视频播放时长    |    |

bottom_info 字段说明

| 字段名 | 数据类型 | 是否必须 | 默认值 |字段说明 | 备注 | 
| :----------- | :------| :------------ | :----------- |:----------- | :------ |
| text      | string    | 是       | | 底部文案|  | 
| pic     | string  | 否       |  | 底部图片url     |    |
| scheme     | string  | 否       |  | 底部点击跳转地址    |    |

后台编辑保存时的数据结构:

| 字段名 | 数据类型 | 是否必须 | 默认值 |字段说明 | 备注 | 
| :----------- | :------| :------------ | :----------- |:----------- | :------ |
| card_type      | int    | 是       | 9| 容器或卡片类型|  | 
| pic_width     | int  | 是       | 100 | 投票项图片宽度,单位:px     |    |
| pic_height     | int  | 是       | 100 | 投票项图片高度,单位:px     |    |
| left_themeid     | int  | 是       |  | 左边投票主题ID，服务端提供接口返回数据    |    |
| right_themeid     | int  | 是       |  | 右边投票主题ID，服务端提供接口返回数据    |    |
| vote_url     | string  | 是       |  | 投票结果页地址    |    |
| vote_item_start     | int  | 是       | 1 | 投票项开始序号    |    |
| vote_item_end     | int  | 是       | 3 | 投票项结束序号    |    |
| sort_type     | string  | 是       | 'desc' |  投票项展示顺序，当前一共五种   |    |
| left_votenum_lefttext     | string  | 否       |  |  左边票数项title_sub左边文案   |    |
| left_votenum_righttext     | string  | 否      |  |  左边票数项title_sub右边文案  |    |
| right_votenum_lefttext     | string  | 否       |  |  右边票数项title_sub左边文案   |    |
| right_votenum_righttext     | string  | 否      |  |  右边票数项title_sub右边文案  |    |
| left_bottom_pic_url     | string  | 否       |  |  左边投票项底部图片   |    |
| left_bottom_text     | string  | 是       | '立即投票' |  左边投票项底部文案   |    |
| right_bottom_pic_url     | string  | 否       |  |  右边投票项底部图片   |    |
| right_bottom_text     | string  | 是       | '立即投票' |  右边投票项底部文案   |    |

sort_type:1、desc：票数倒序，2、asc：票数顺序，3、rand：随机，4、default：按选项顺序，5、default_desc：按选项倒序

theme_id:服务端提供的接口 http://ting.weibo.com/admin/mobile_page/ajax_getpolllist 

ue样例：

图片地址:http://wx3.sinaimg.cn/mw690/7f54c80fly1fh1vdv6cxqj208j06yacf.jpg

![双图投票card](/uploads/b21845b864697d970cbcca9a1aff66cb/双图投票card.jpg)

### card21 四图投票card（卡片）
   支持的字段:

   同双图投票card

后台编辑保存时的数据结构:

| 字段名 | 数据类型 | 是否必须 | 默认值 |字段说明 | 备注 | 
| :----------- | :------| :------------ | :----------- |:----------- | :------ |
| card_type      | int    | 是       | 9| 容器或卡片类型|  | 
| pic_width     | int  | 是       | 100 | 投票项图片宽度,单位:px     |    |
| pic_height     | int  | 是       | 100 | 投票项图片高度,单位:px     |    |
| themeid     | int  | 是       |  | 投票主题ID，服务端提供接口返回数据,同双图投票card    |    |
| vote_url     | string  | 是       |  | 投票结果页地址    |    |
| vote_item_start     | int  | 是       | 1 | 投票项开始序号    |    |
| vote_item_end     | int  | 是       | 3 | 投票项结束序号    |    |
| sort_type     | string  | 是       | 'desc' |  投票项展示顺序，当前一共五种,同双图投票card   |    |
| votenum_lefttext     | string  | 否       |  |  票数项title_sub左边文案   |    |
| votenum_righttext     | string  | 否      |  |  票数项title_sub右边文案  |    |
| bottom_pic_url     | string  | 否       |  |  投票项底部图片   |    |
| bottom_text     | string  | 是       | '立即投票' |  投票项底部文案   |    |
  
ue样例:

图片地址:http://wx3.sinaimg.cn/mw690/7f54c80fly1fh1vo3dqmrj208j04vjss.jpg

![四图投票card](/uploads/5e885a1b657f421e7f570016107df689/四图投票card.jpg)

### card22 单行（卡片）
   支持的字段

| 字段名 | 数据类型 | 是否必须 | 默认值 |字段说明 | 备注 | 
| :----------- | :------| :------------ | :----------- |:----------- | :------ | 
| card_type      | int    | 是       | 22| 容器或卡片类型|  | 
| pic          | string | 是       |  | 左边图片url|  | 
| desc          | string | 是       |  |文案 |  | 
| scheme          | string | 否       |  | 点击card跳转地址|  | 

ue样例:http://image2.sina.com.cn/music/web/ting2013/backend/4.png

### card23 单行按钮（卡片）
   支持的字段

| 字段名 | 数据类型 | 是否必须 | 默认值 |字段说明 | 备注 | 
| :----------- | :------| :------------ | :----------- |:----------- | :------ | 
| card_type      | int    | 是       | 23| 容器或卡片类型|  | 
| show_color          | string | 否       | '' | 按钮颜色,为空即白色|  | 
| desc          | string | 是       |  |文案 |  | 
| scheme          | string | 否       |  | 跳转地址|  | 

ue样例:http://image2.sina.com.cn/music/web/ting2013/backend/6.png

### card24 纯文本（卡片）
   支持的字段

| 字段名 | 数据类型 | 是否必须 | 默认值 |字段说明 | 备注 | 
| :----------- | :------| :------------ | :----------- |:----------- | :------ | 
| card_type      | int    | 是       | 24| 容器或卡片类型|  | 
| source          | string | 否       | '' | 来源文案|  | 
| desc          | string | 是       |  |文案 |  | 
| scheme          | string | 否       |  | 跳转地址|  | 

ue样例:http://image2.sina.com.cn/music/web/ting2013/backend/7.png

### card25 用户（卡片）
   支持的字段

| 字段名 | 数据类型 | 是否必须 | 默认值 |字段说明 | 备注 | 
| :----------- | :------| :------------ | :----------- |:----------- | :------ | 
| card_type      | int    | 是       | 25| 容器或卡片类型|  | 
| user_name          | string | 是       |  | 用户名|  | 
| scheme          | string | 否       |  |点击用户跳转地址 |  | 
| desc1          | string | 是       |  |第一行文案 |  | 
| desc2          | string | 否       |  |第二行文案 |  | 
| user_verified_color          | string | 否       |  |用户V认证：蓝V，橙V，金V |  |
| user_profile_pic          | string | 否       |  | 用户头像|  | 
| button          | object | 否       |  | 右侧关注按钮|  | 

 专题后台需要填写的字段

| 字段名 | 数据类型 | 是否必须 | 默认值 |字段说明 | 备注 | 
| :----------- | :------| :------------ | :----------- |:----------- | :------ | 
| card_type      | int    | 是       | 25| 容器或卡片类型|  | 
| uid          | string | 是       |  | 用户uid|  | 

ue样例:http://image2.sina.com.cn/music/web/ting2013/backend/10.png


### card26 宫格按钮（卡片）
   支持的字段

| 字段名 | 数据类型 | 是否必须 | 默认值 |字段说明 | 备注 | 
| :----------- | :------| :------------ | :----------- |:----------- | :------ | 
| card_type      | int    | 是       | 27| 容器或卡片类型|  | 
| col          | int | 是       | 2 | 每行展示的数量|  | 
| items          | array | 是       |  | 组|  | 

items 每个数组字段

| 字段名 | 数据类型 | 是否必须 | 默认值 |字段说明 | 备注 | 
| :----------- | :------| :------------ | :----------- |:----------- | :------ | 
| title_sub          | string | 否       |  |标题 |  | 
| pic          | string | 是       |  |上面图片 |  | 
| scheme          | string | 否       |  |跳转地址 |  | 

ue样例:http://image2.sina.com.cn/music/web/ting2013/backend/17.png

### card28 宫格（卡片）
   支持的字段

| 字段名 | 数据类型 | 是否必须 | 默认值 |字段说明 | 备注 | 
| :----------- | :------| :------------ | :----------- |:----------- | :------ | 
| card_type      | int    | 是       | 28| 容器或卡片类型|  | 
| col          | int | 是       | 2 | 每行展示的数量|  | 
| items          | array | 是       |  | 组|  | 

items 每个数组字段

| 字段名 | 数据类型 | 是否必须 | 默认值 |字段说明 | 备注 | 
| :----------- | :------| :------------ | :----------- |:----------- | :------ | 
| title_sub          | string | 否       |  |标题 |  | 
| pic          | string | 是       |  |上面图片 |  | 
| scheme          | string | 否       |  |跳转地址 |  | 

ue样例:http://image2.sina.com.cn/music/web/ting2013/backend/19B.jpg

### card29 标题（卡片）
   支持的字段

| 字段名 | 数据类型 | 是否必须 | 默认值 |字段说明 | 备注 | 
| :----------- | :------| :------------ | :----------- |:----------- | :------ | 
| card_type      | int    | 是       | 29| 容器或卡片类型|  | 
| pic          | string | 是       |  | 左边图片|  | 
| scheme          | string | 否       |  |跳转地址 |  | 
| desc          | string | 是       |  |标题 |  | 
| title_extra_text          | string | 否       |  | 右侧副标题|  | 


ue样例:http://image2.sina.com.cn/music/web/ting2013/backend/img93.jpg

### card30 分割线（卡片）
   支持的字段

| 字段名 | 数据类型 | 是否必须 | 默认值 |字段说明 | 备注 | 
| :----------- | :------| :------------ | :----------- |:----------- | :------ | 
| card_type      | int    | 是       | 30| 容器或卡片类型|  | 
| name          | string | 是       |  | 文案|  | 
| scheme          | string | 否       |  |跳转地址 |  | 

ue样例:http://image2.sina.com.cn/music/web/ting2013/backend/img100.jpg

### 二、电影类业务card

业务类card，必须传 object_type,相应业务的object_type如下：

| 业务名 | value |
| :----------- | :------| 
| 音乐     | 1  | 
| 电影      | 2    | 
| 组合类      | 3    | 

### card8 图文card

后台编辑保存时的数据结构:

| 字段名 | 数据类型 | 是否必须 | 默认值 |字段说明 | 备注 | 
| :----------- | :------| :------------ | :----------- |:----------- | :------ |
| card_type      | int    | 是       | 8| 卡片类型|  | 
| film_id     | int  | 是       | |  电影ID   |    |
| object_type     | int  | 是       | |  h5专题电影业务编号：2  |    |
| button_type     | int  | 是       | |  按钮类型:0,不配置,1:点评,2:购票   |    |

### 三、组合类card

### 话题流card

后台编辑保存时的数据结构:

| 字段名 | 数据类型 | 是否必须 | 默认值 |字段说明 | 备注 | 
| :----------- | :------| :------------ | :----------- |:----------- | :------ |
| card_type      | int    | 是       | 1| 卡片类型|  | 
| topic_name     | string| 是       | |  话题词   |    |
| sort_type     | string| 是       | time|  排序类型   |    |
| num    | int| 是       | | 展示数量    |    |
| object_type     | int  | 是       | |  组合类业务编号：3  |    |

 sort_type类型:

| 名称 | 排序值|
| :----------- | :------| 
| 时间倒序      | time    | 
| 社会化排序      | social   | 
| 热门度    | hot    | 
| 按转发数倒序      | fwnum  | 
| 按评论数倒序      | cmtnum    | 
