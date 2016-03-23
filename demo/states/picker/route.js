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
            isOpenMalePicker : false,
            male : [{
                text : '女',
                value : 1
            }],
            maleOptions : [
                {
                    values : [
                        {
                            text : '男',
                            value : 0
                        },
                        {
                            text : '女',
                            value : 1
                        },
                        {
                            text : '中性',
                            value : 2
                        },
                        {
                            text : '变性',
                            value : 3
                        },
                        {
                            text : '双性',
                            value : 4
                        },
                        {
                            text : '无性',
                            value : 5
                        }

                    ]
                }
            ]
        }
    },
    methods: {
        
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