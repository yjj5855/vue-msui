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
            isOpenCalendar : false,
            calendarOptions : {
                values : ['2016-01-01']
            }
        }
    },
    methods: {
        change(date){
            console.log(date)
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