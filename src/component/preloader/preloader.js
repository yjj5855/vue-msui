import tpl from './preloader.html'
export default {
    template : tpl,
    props: {
        option: {
            type: Object,
            default: {
                title : '加载中'
            }
        }
    },
    data(){
        return {
            top : 0,
            show : false
        }
    },
    methods: {
        
    },
    init(){

    },
    ready(){
        this.top = (- Math.round($(this.$el).outerHeight() / 2) + 'px');
        this.show = true;
    }
} 
