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
            text : '请输入'
        }
    },
    methods: {
        addToast(){
            let text = this.text;
            this.$refs.modal.add({
                type : 'toast',
                option : {
                    content: text,
                }
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