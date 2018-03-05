require('./check-versions')();

const config = require('../config');
if(!process.env.NODE_ENV) {
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
const cardsJSON = require("../src/components/cardsJSON");

const mockUrl = {}
mockArr.forEach(function(item) {
	Object.assign(mockUrl, item)
})
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

var formidable = require("formidable");

const compiler = webpack(webpackConfig);

const list = []
if(mockArr.length) {
	var urlMock = mockArr[0]
	Object.keys(urlMock).forEach(function(url) {
		var mock = urlMock[url];
		list.push({
			key: url,
			value: mock,
		})
	})
}

app.get("/", function(req, res) {

	res.render(__dirname + "/list.ejs", {
		list: list
	})
})


//文件上传
app.post('/upload', function(req, res, next) {
	var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = __dirname + '/../static/';
    form.maxFieldsSize = 10 * 1024 * 1024;
	 //解析
    form.parse(req, function (err, fields, files) {

        if(err) return res.json(err);
        for (var file in files) {
            //后缀名
            var extName = /\.[^\.]+/.exec(files[file].name);
            var ext = Array.isArray(extName)
                ? extName[0]
                : '';
            //重命名，以防文件重复
            var avatarName =  files[file].name;
            //移动的文件目录
            var newPath = form.uploadDir + avatarName;
            fs.renameSync(files[file].path, newPath);
            fields[file] = {
                size: files[file].size,
                url: uri+staticPath+"/"+avatarName,
                path: newPath,
                name: files[file].name,
                type: files[file].type,
                extName: ext
            };
        }
        res.json( fields);
    });
});
//保存card数据
app.post("/subject/h5/savecard", function(req, res) {
	var cards = JSON.parse(req.body.cardlist)
	cards.forEach(function(arr) {
		if(arr.card_group) {
			for(var i = 0; i < arr.card_group.length; i++) {
				var card = arr.card_group[i];
				if(typeof card.card_type=="number"){
          card.card_type="card"+card.card_type;
        }
				if(card.card_type == "card20") {
					var item = cardsJSON.getCardData(card.card_type);
          item.title=card.title;
          item.height=card.pic_height;
					arr.card_group[i] = item;
				}
        if(card.card_type == "card21") {
          var item = cardsJSON.getCardData(card.card_type);
          item.title=card.title;
          item.height=card.pic_height;
          arr.card_group[i] = item;
        }
				if(card.card_type == "card9") {
          var item = cardsJSON.getCardData(card.card_type);
					arr.card_group[i] = item;
				}
        if(card.card_type == "card100") {
          var item = cardsJSON.getCardData(card.card_type);
          if(Array.isArray(item)){
            arr.card_group[i] = item[0|Math.random()*item.length];
          }else{
            arr.card_group[i] = item
          }
        }
				if(card.card_type == "card25") {
          var item = cardsJSON.getCardData(card.card_type);
					arr.card_group[i] = item;
				}
        if(card.card_type == "card31") {
          card.diff_endtime=parseInt((new Date(card.end_time).getTime()-new Date().getTime())/1000);
          card.diff_warningtime=parseInt((new Date(card.warning_time).getTime()-new Date().getTime())/1000);
        }
        if(card.card_type == "card33") {
          var item = cardsJSON.getCardData(card.card_type);
          item.title=card.title;
          item.desc=card.desc;
          item.is_pic=card.is_pic;
          item.width=card.width;
          item.height=card.height;
          item.button_vote_text=card.button_vote_text;
          item.button_have_vote_text=card.button_have_vote_text;
          arr.card_group[i] = item;
        }
				if(card.card_type == "card2008") {
          var item = cardsJSON.getCardData(card.card_type);
					arr.card_group[i] = item;
				}
			}
		}
	})
	fs.writeFileSync(__dirname + "/../mock/subject/h5/getcardinfo", JSON.stringify({
		"status": 1,
		"message": "ok",
		"data": {
			"cards": JSON.parse(req.body.cardlist)
		}
	}, null, 2))
	fs.writeFileSync(__dirname + "/../mock/subject/h5/getpageinfo", JSON.stringify({
		"status": 1,
		"message": "ok",
		"data": {
			"cards": cards
		}
	}, null, 2))
	res.json({
		status: 1
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
		hotMiddleware.publish({
			action: 'reload'
		});
		cb();
	});
});
const fs = require("fs")
const rewrite = require("./rewrite")
Object.keys(mockUrl).forEach(function(url) {
	var mock = mockUrl[url];

	if(/^http:/.test(mock)) {

		var options = {
			target: mock.replace(/(http:\/\/[^/]+)\/.+/, "$1"),
			changeOrigin: true,
			pathRewrite: {}
		};
		options.pathRewrite[url] = mock.replace(/http:\/\/[^/]+\//, "/")
		app.use(proxyMiddleware(options.filter || url, options));
	} else {
		var filepath = path.join(__dirname, "../mock" + mock)
		if(fs.existsSync(filepath)) {
			app.use(url, function(req, res, next) {
				res.jsonp(JSON.parse(fs.readFileSync(filepath).toString()))
			});
		} else {
			app.use(rewrite(url, mock));
		}

	}

});

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// serve pure static assets
var staticPath = path.posix.join(
	config.dev.assetsPublicPath,
	config.dev.assetsSubDirectory
);
app.use(staticPath, express.static('./static'));
// app.use(express.static('./test'));
function getIPAdress() {
	var interfaces = require('os').networkInterfaces();
	for(var devName in interfaces) {
		var iface = interfaces[devName];
		for(var i = 0; i < iface.length; i++) {
			var alias = iface[i];
			if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
				return alias.address;
			}
		}
	}
}
var uri = 'http://' + getIPAdress() + ':' + port;

let _resolve;
const readyPromise = new Promise(resolve => {
	_resolve = resolve;
});

console.log('> Starting dev server...');
devMiddleware.waitUntilValid(() => {
	console.log('> Listening at ' + uri + '\n');
	// when env is testing, don't need open it
	if(autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
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
