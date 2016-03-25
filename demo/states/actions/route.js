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
        actions(){
            let buttons1 = [
                {
                    text: '请选择',
                    label: true
                },
                {
                    text: '卖出',
                    className : 'actions-modal-button-bold color-danger',
                    onClick: function() {
                        console.log('卖出')
                    }
                },
                {
                    text: '买入',
                    onClick: function() {
                        console.log('买入')
                    }
                }
            ];
            let buttons2 = [
                {
                    text: '取消',
                    className: 'bg-danger'
                }
            ];

            this.$refs.modal.add({
                type : 'actions',
                option : [ buttons1 , buttons2 ],
                overlay : true //显示遮罩层
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