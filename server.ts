'use strict'
import * as express from "express";
import * as bodyParser from "body-parser";
import * as errorHandler from "errorhandler";
import * as methodOverride from "method-override";
import * as cookieParser from "cookie-parser";
import * as queryString from 'querystring';
import {config} from './env'

import initAccessToken from './server/middleware/initAccessToken'
import checkUserLogin from './server/middleware/checkUserLogin'

//webapp
import * as _article from './server/webapp/routes/_article';
import * as _qa from './server/webapp/routes/_qa';
import * as login from './server/webapp/routes/login';
import * as index from './server/webapp/routes/index'
import * as member from './server/webapp/routes/member';
import * as myComment from './server/webapp/routes/my-comment';
import * as myQa from './server/webapp/routes/my-qa';
import * as myStar from './server/webapp/routes/my-star';
import * as search from './server/webapp/routes/search';
import * as chat from './server/webapp/routes/chat';


var app = express();
app.use(errorHandler());
// Configuration
var env = config.NODE_ENV || 'development';
if (env === 'development') {
    var webpack = require('webpack');
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var WebpackConfig = require('./webpack.dev.config');
    app.use(webpackDevMiddleware(webpack(WebpackConfig), {
        publicPath: '/webapp/',
        stats: {
            colors: true
        }
    }));
    app.set('views',__dirname + '/server/views/dev');
}else{
    app.set('views',__dirname + '/public/webapp');
}

app.set('view engine', 'html');
app.engine('.html', require('ejs').__express)


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(__dirname+'/public'));


app.use(initAccessToken);
app.use(checkUserLogin);

// Routes

app.get('/webapp/content/:id',index.index);
app.get('/webapp/article/:id',_article.index);
app.get('/webapp/qa/:id',_qa.index);
app.get('/webapp/login', login.index);
app.get('/webapp/member', member.index)
app.get('/webapp/member/qa', myQa.index)
app.get('/webapp/member/star', myStar.index)
app.get('/webapp/member/comment', myComment.index)
app.get('/webapp/search', search.index)
app.get('/webapp/chat',chat.index)

//错误处理
//app.get('/webapp/*',function(req,res){
//    res.writeHead(301,{
//        'Location':'/webapp/content/g0'
//    });
//    res.end();
//});


app.listen(config.PORT, function(){
    console.log("Demo Express server listening on port %d in %s mode", config.PORT, config.NODE_ENV || '');
});

export var App = app;