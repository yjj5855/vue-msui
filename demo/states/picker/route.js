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
            male : [{
                text : '男',
                value : 0
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