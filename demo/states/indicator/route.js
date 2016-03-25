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
        indicator(){
            this.$refs.modal.add({
                type : 'indicator',
                // option : {
                //
                // },
                // overlay : true //显示遮罩层
            })
            setTimeout(()=>{
                this.$refs.modal.hideIndicator()
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