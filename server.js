'use strict';
var express = require("express");
var bodyParser = require("body-parser");
var errorHandler = require("errorhandler");
var methodOverride = require("method-override");
var cookieParser = require("cookie-parser");
var env_1 = require('./env');
//webapp
var picker = require('./server/webapp/routes/picker');
var index = require('./server/webapp/routes/index');
var app = express();
app.use(errorHandler());
// Configuration
var env = env_1.config.NODE_ENV || 'development';
if (env === 'development') {
    var webpack = require('webpack');
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var WebpackConfig = require('./webpack.dev.config');
    app.use(webpackDevMiddleware(webpack(WebpackConfig), {
        publicPath: '/demo/',
        stats: {
            colors: true
        }
    }));
    app.set('views', __dirname + '/server/views/dev');
}
else {
    app.set('views', __dirname + '/public/demo');
}
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
// Routes
app.get('/demo/index', index.index);
app.get('/demo/picker', picker.index);
//错误处理
app.get('/*', function (req, res) {
    res.writeHead(301, {
        'Location': '/demo/index'
    });
    res.end();
});
app.listen(env_1.config.PORT, function () {
    console.log("Demo Express server listening on port %d in %s mode", env_1.config.PORT, env_1.config.NODE_ENV || '');
});
exports.App = app;
//# sourceMappingURL=server.js.map