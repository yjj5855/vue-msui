import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './states/app'
import {picker} from '../src/index'

Vue.use(VueRouter);
Vue.component('picker',picker);

var router = new VueRouter({
    history: true, //html5模式 去掉锚点
    saveScrollPosition: true //记住页面的滚动位置 html5模式适用
})

router.map({
    '/demo/picker': {
        component: function (resolve) {
            //webpack自带功能 实现异步加载路由
            require.ensure([], function () {
                let route = require('./states/picker/route').default;
                resolve(route);
            })
        }
    },
})
router.redirect({
    '*': '/demo/picker'
})

router.start(App,'#demo');