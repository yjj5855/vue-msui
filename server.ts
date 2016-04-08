'use strict'
import * as express from "express";
import * as bodyParser from "body-parser";
import * as errorHandler from "errorhandler";
import * as methodOverride from "method-override";
import * as cookieParser from "cookie-parser";
import * as queryString from 'querystring';
import {config} from './env'

//webapp
import * as index from './server/webapp/routes/index'



var app = express();
app.use(errorHandler());
// Configuration
var env = config.NODE_ENV || 'development';
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
    app.set('views',__dirname + '/server/views/dev');
}else{
    app.set('views',__dirname + '/public/demo');
}

app.set('view engine', 'html');
app.engine('.html', require('ejs').__express)


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(__dirname+'/public'));

// Routes
app.get('/demo/index',index.index);
app.get('/demo/picker',index.index);
app.get('/demo/toast',index.index);
app.get('/demo/alert',index.index);
app.get('/demo/preloader',index.index);
app.get('/demo/indicator',index.index);
app.get('/demo/actions',index.index);
app.get('/demo/pullToRefresh',index.index);
app.get('/demo/infiniteScroll',index.index);
app.get('/demo/popup',index.index);
app.get('/demo/calendar',index.index);
app.get('/demo/datetime',index.index);

//错误处理
app.get('/*',function(req,res){
   res.writeHead(301,{
       'Location':'/demo/index'
   });
   res.end();
});


app.listen(config.PORT, function(){
    console.log("Demo Express server listening on port %d in %s mode", config.PORT, config.NODE_ENV || '');
});

export var App = app;