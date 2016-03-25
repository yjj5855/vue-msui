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
            
        }
    },
    methods: {
        refresh(){
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    resolve('刷新了')
                },3e3)
            })
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