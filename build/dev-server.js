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
const app = express();
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
