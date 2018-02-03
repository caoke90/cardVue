  
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

