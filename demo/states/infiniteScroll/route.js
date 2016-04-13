'use strict';
import Vue from 'vue'
import Tpl from './template.html'

let Index = Vue.extend({
    //replace : true, //必须注释掉 不然动画失效
    template : Tpl,
    ready : function(){
       this.loadData();
    },
    data : ()=>{
        return {
            list : [],
            updateTime : new Date().getTime(),
            isShowLoad : true
        }
    },
    methods: {
        loadMore(page){
            console.log('page => ',page);
            
            //需要的是一个生成promise的函数
            return (page)=>{
                return new Promise((resolve,reject)=>{
                    setTimeout(()=>{
                        this.loadData();
                        resolve('加载了')
                    },3e3)
                })
            }
            
        },
        loadData(){
            let len = this.list.length;
            for(let i=0;i<20;i++){
                this.list.push(len+i);
            }
        },
        refresh(){
            return ()=>{
                return new Promise((resolve,reject)=>{
                    setTimeout(()=>{
                        this.updateTime = new Date().getTime()
                        resolve('刷新了')
                    },3e3)
                }) 
            }
        }
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