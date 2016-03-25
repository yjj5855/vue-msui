'use strict';
import Vue from 'vue'
import Tpl from './template.html'

let Index = Vue.extend({
    //replace : true, //必须注释掉 不然动画失效
    template : Tpl,
    ready : function(){
        
    },
    data : ()=>{
        return {
            title : '加载中'
        }
    },
    methods: {
        preloader(){
            this.$refs.modal.add({
                type : 'preloader',
                option : {
                    title : this.title,
                },
                overlay : true //显示遮罩层
            })
            setTimeout(()=>{
                this.$refs.modal.hidePreloader()
            },2e3)
        },
    },
    computed : {
        
    },
    route : {
        data : function(transition){
            transition.next()
        }
    }
})

export default Index