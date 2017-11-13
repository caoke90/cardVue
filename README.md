webpck+vue2工程构建项目demo
------
为了前端学习和入职引导


> * [前端工程构建需要解决的问题](#前端工程构建需要解决的问题)
> * [文件生成树](tree2.md)
> * [目录功能介绍](#目录功能介绍)
> * [本地安装](#本地安装)
> * [flex布局](http://www.runoob.com/w3cnote/flex-grammar.html)

前端工程构建需要解决的问题
------
1、工程项目文档化

2、配置工程的开发目录、产出目录结构

3、浏览器性能测试自动任务

4、mock假数据模拟、联调过程数据代理

5、less或sass工具库

6、js公用工具库

7、md5版本号、base64图片、js|css|png合并压缩配置

8、ajax拦截，包含请求和回复的拦截

9、引入公用的弹层，如alert、conform、actionsheet、toast

10、浏览器bug修改，如解决键盘弹出后挡表单的问题

11、rem单位设置，解决浏览器兼容问题

12、区分开发环境和生产环境的资源配置

13、单页面路由配置

14、页面组件化

15、eslint代码检查（多人协作需要）

16、git、svn团队协同问题



<h2 id="h2">目录功能介绍</h2>

* build/  webpack配置、脚本

* config／ mock代理、发布目录的配置

* dist/ 资源产出目录

* src／ 开发目录

&emsp;&emsp;assets/ 存放静态资源
  
&emsp;&emsp;components/ 业务组件库
  
&emsp;&emsp;filters/ vue过滤器
  
&emsp;&emsp;marvel/ 微博主站的组件、指令、通信库
  
&emsp;&emsp;mixin／ 混合组件库（空）
  
&emsp;&emsp;router／ 前端页面路由
  
&emsp;&emsp;scss／ sass样式工具
  
&emsp;&emsp;utils／ js工具
  
&emsp;&emsp;views／ 业务页面
  

* static／ 静态资源存放目录，会发布到生产环境（空）

* test／ 浏览器性能测试、mock数据存放目录

>`$npm run e2e` 执行测试任务
  
  
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


