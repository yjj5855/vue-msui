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
            title : '',
            content : ''
        }
    },
    methods: {
        alert(){
            this.$refs.modal.add({
                type : 'alert',
                option : {
                    title : this.title,
                    content: this.content,
                    ok : this.ok
                },
                overlay : true //显示遮罩层
            })
        },
        ok(){
            this.$refs.modal.add({
                type : 'toast',
                option : {
                    content: 'alert回调成功',
                },
                duration : 3e3
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