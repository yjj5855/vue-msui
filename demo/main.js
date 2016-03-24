import './main.less'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './states/app'
import {
    picker,
    modal,
    toast,
    alert
} from '../src/index'

Vue.use(VueRouter);
Vue.prototype.goBack = function(_this){
    window.history.back();
};
Vue.component('picker',picker);
Vue.component('modal',modal);
Vue.component('toast',toast);
Vue.component('alert',alert)

var router = new VueRouter({
    history: true, //html5模式 去掉锚点
    saveScrollPosition: true //记住页面的滚动位置 html5模式适用
})

router.map({
    '/demo/index': {
        component: function (resolve) {
            //webpack自带功能 实现异步加载路由
            require.ensure([], function () {
                let route = require('./states/index/route').default;
                resolve(route);
            })
        }
    },
    '/demo/picker': {
        component: function (resolve) {
            //webpack自带功能 实现异步加载路由
            require.ensure([], function () {
                let route = require('./states/picker/route').default;
                resolve(route);
            })
        }
    },
    '/demo/toast': {
        component: function (resolve) {
            //webpack自带功能 实现异步加载路由
            require.ensure([], function () {
                let route = require('./states/toast/route').default;
                resolve(route);
            })
        }
    },
    '/demo/alert': {
        component: function (resolve) {
            //webpack自带功能 实现异步加载路由
            require.ensure([], function () {
                let route = require('./states/alert/route').default;
                resolve(route);
            })
        }
    },
})
router.redirect({
    '*': '/demo/index'
})

router.start(App,'#demo');